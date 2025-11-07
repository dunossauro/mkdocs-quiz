# MkDocs Quiz Plugin

[![PyPI version](https://badge.fury.io/py/mkdocs-quiz.svg)](https://badge.fury.io/py/mkdocs-quiz)
[![Python versions](https://img.shields.io/pypi/pyversions/mkdocs-quiz.svg)](https://pypi.org/project/mkdocs-quiz/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

A modern MkDocs plugin to create interactive quizzes directly in your markdown documentation. Perfect for educational content, tutorials, and documentation that requires user engagement.

## Features

- ✨ Create single-choice (radio button) and multiple-choice (checkbox) quizzes
- 📝 Simple markdown-based syntax
- ⚡ Instant feedback with visual indicators
- 🎯 Reveal additional content upon correct answers
- 🎨 HTML support in questions, answers, and content
- 🔧 Easy to disable per-page
- 🚀 No external dependencies beyond MkDocs

## Installation

Install the package with pip:

```bash
pip install mkdocs-quiz
```

## Quick Start

### 1. Enable the plugin

Add the plugin to your `mkdocs.yml`:

```yaml
plugins:
  - mkdocs-quiz
```

### 2. Create your first quiz

#### Single choice quiz

Create a quiz with radio buttons (only one correct answer):

```markdown
<?quiz?>

question: What is 2+2?
answer-correct: 4
answer: 3
answer: 5
content:

<p>Correct! Basic math is important.</p>
<?/quiz?>
```

#### Multiple choice quiz

Create a quiz with checkboxes (multiple correct answers):

```markdown
<?quiz?>

question: Which are even numbers?
answer-correct: 2
answer: 3
answer-correct: 4
answer: 5
content:

<p>Great! 2 and 4 are both even numbers.</p>
<?/quiz?>
```

> **Note:** Answers can include HTML formatting (e.g., `<code>Yes!</code>` or `<strong>Maybe!</strong>`)

> **Important:** The content section must contain valid HTML.

## Demo & Screenshots

Check out the [live demo](https://skyface753.github.io/mkdocs-quiz/) to see the plugin in action.

### Single choice

<img src="example/docs/images/quiz.png" width="400rem">

### Multiple choice

<img src="example/docs/images/quiz-multi.png" width="400rem">

## Advanced Usage

### Disable quizzes for a specific page

To disable quiz processing on a specific page, add this to the page metadata:

```yaml
---
quiz: disable
---
```

This is useful for pages where you want to show the raw quiz syntax as documentation.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.

## Credits

- Original author: [Sebastian Jörz](https://github.com/skyface753)
- Co-maintained by: [Phil Ewels](https://github.com/ewels)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and changes.
