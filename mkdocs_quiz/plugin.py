"""MkDocs Quiz Plugin - Main plugin module."""

from __future__ import annotations

import logging
import re
from importlib import resources as impresources
from typing import Any

from mkdocs.config.defaults import MkDocsConfig
from mkdocs.plugins import BasePlugin
from mkdocs.structure.files import Files
from mkdocs.structure.pages import Page

from . import css, js

log = logging.getLogger("mkdocs.plugins.mkdocs_quiz")

# Load CSS and JS resources at module level
try:
    inp_file = impresources.files(css) / "quiz.css"
    with inp_file.open("rt") as f:
        style = f.read()
    style = f'<style type="text/css">{style}</style>'

    js_file = impresources.files(js) / "quiz.js"
    with js_file.open("rt") as f:
        js_content = f.read()
    js_script = f'<script type="text/javascript" defer>{js_content}</script>'
except Exception as e:
    log.error(f"Failed to load CSS/JS resources: {e}")
    style = ""
    js_script = ""

# Quiz tag format:
# <?quiz?>
# question: Are you ready?
# answer-correct: Yes!
# answer: No!
# answer: Maybe!
# content:
# <h2>Provide some additional content</h2>
# <?/quiz?>

QUIZ_START_TAG = "<?quiz?>"
QUIZ_END_TAG = "<?/quiz?>"
QUIZ_REGEX = r"<\?quiz\?>(.*?)<\?/quiz\?>"


class MkDocsQuizPlugin(BasePlugin):
    """MkDocs plugin to create interactive quizzes in markdown documents."""

    def __init__(self) -> None:
        """Initialize the plugin."""
        super().__init__()
        self.enabled = True
        self.dirty = False

    def on_startup(self, *, command: str, dirty: bool) -> None:
        """Configure the plugin on startup.

        Args:
            command: The MkDocs command being run.
            dirty: Whether this is a dirty build.
        """
        self.dirty = dirty

    def on_page_markdown(
        self, markdown: str, page: Page, config: MkDocsConfig, **kwargs: Any
    ) -> str:
        """Process markdown to convert quiz tags to HTML.

        Args:
            markdown: The markdown content of the page.
            page: The current page object.
            config: The MkDocs config object.
            **kwargs: Additional keyword arguments.

        Returns:
            The processed markdown with quiz HTML.
        """
        # Check if quizzes are disabled for this page
        if "quiz" in page.meta and page.meta["quiz"] == "disable":
            return markdown

        matches = re.findall(QUIZ_REGEX, markdown, re.DOTALL)
        quiz_id = 0

        for match in matches:
            try:
                quiz_html = self._process_quiz(match, quiz_id)
                old_quiz = QUIZ_START_TAG + match + QUIZ_END_TAG
                markdown = markdown.replace(old_quiz, quiz_html)
                quiz_id += 1
            except Exception as e:
                log.error(f"Failed to process quiz {quiz_id}: {e}")
                continue

        return markdown

    def _process_quiz(self, quiz_content: str, quiz_id: int) -> str:
        """Process a single quiz and convert it to HTML.

        Args:
            quiz_content: The content inside the quiz tags.
            quiz_id: The unique ID for this quiz.

        Returns:
            The HTML representation of the quiz.

        Raises:
            ValueError: If the quiz format is invalid.
        """
        quiz_lines = quiz_content.splitlines()

        # Remove empty lines at start and end
        while quiz_lines and quiz_lines[0] == "":
            quiz_lines = quiz_lines[1:]
        while quiz_lines and quiz_lines[-1] == "":
            quiz_lines = quiz_lines[:-1]

        if not quiz_lines:
            raise ValueError("Quiz content is empty")

        # Parse question
        if not quiz_lines[0].startswith("question: "):
            raise ValueError("Quiz must start with 'question: '")
        question = quiz_lines[0].split("question: ", 1)[1]

        # Find content separator
        if "content:" not in quiz_lines:
            raise ValueError("Quiz must include 'content:' section")
        content_index = quiz_lines.index("content:")

        # Parse answers
        answer_lines = quiz_lines[1:content_index]
        correct_answers = [
            line.split("answer-correct: ", 1)[1]
            for line in answer_lines
            if line.startswith("answer-correct: ")
        ]

        # Determine if multiple choice (checkboxes) or single choice (radio)
        as_checkboxes = len(correct_answers) > 1

        # Parse all answers
        all_answers = []
        for line in answer_lines:
            if line.startswith("answer-correct: "):
                all_answers.append(line.split("answer-correct: ", 1)[1])
            elif line.startswith("answer: "):
                all_answers.append(line.split("answer: ", 1)[1])

        # Generate answer HTML
        answer_html_list = []
        for i, answer in enumerate(all_answers):
            is_correct = answer in correct_answers
            input_id = f"quiz-{quiz_id}-{i}"
            input_type = "checkbox" if as_checkboxes else "radio"
            correct_attr = "correct" if is_correct else ""

            answer_html = (
                f'<div><input type="{input_type}" name="answer" value="{i}" '
                f'id="{input_id}" {correct_attr}>'
                f'<label for="{input_id}">{answer}</label></div>'
            )
            answer_html_list.append(answer_html)

        # Get quiz content
        content_lines = quiz_lines[content_index + 1 :]
        content_html = "\n".join(content_lines)

        # Build final quiz HTML
        quiz_html = (
            f'<div class="quiz">'
            f"<h3>{question}</h3>"
            f"<form>"
            f"<fieldset>{''.join(answer_html_list)}</fieldset>"
            f'<button type="submit" class="quiz-button">Submit</button>'
            f"</form>"
            f'<section class="content hidden">{content_html}</section>'
            f"</div>"
        )

        return quiz_html

    def on_page_content(
        self, html: str, *, page: Page, config: MkDocsConfig, files: Files
    ) -> str | None:
        """Add CSS and JS to the page content.

        Args:
            html: The HTML content of the page.
            page: The current page object.
            config: The MkDocs config object.
            files: The files object.

        Returns:
            The HTML with added styles and scripts.
        """
        # Check if quizzes are disabled for this page
        if "quiz" in page.meta and page.meta["quiz"] == "disable":
            return html

        return html + style + js_script
