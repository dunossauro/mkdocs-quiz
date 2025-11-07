# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MkDocs Quiz is a plugin for MkDocs that creates interactive quizzes directly in markdown documentation. It processes custom `<?quiz?>` tags in markdown files and converts them to interactive HTML/JS quiz elements.

## Architecture

### Plugin System Integration

This is a MkDocs plugin that hooks into the MkDocs build pipeline:

- **Entry point**: `mkdocs_quiz.plugin:MkDocsQuizPlugin` (registered in `pyproject.toml`)
- **Plugin class**: Extends `mkdocs.plugins.BasePlugin`
- **Hook lifecycle**:
  1. `on_startup()` - Plugin initialization
  2. `on_page_markdown()` - Processes markdown to convert quiz tags to HTML
  3. `on_page_content()` - Injects CSS/JS assets into the final HTML

### Quiz Processing Flow

1. **Markdown parsing** (`on_page_markdown`):
   - Regex pattern `<\?quiz\?>(.*?)<\?/quiz\?>` finds quiz blocks
   - Each quiz is passed to `_process_quiz()` method
   - Quiz syntax requires: `question:`, multiple `answer:` or `answer-correct:`, and `content:` section
   - Single correct answer = radio buttons; multiple correct = checkboxes

2. **HTML generation** (`_process_quiz`):
   - Parses quiz lines to extract question, answers, and content
   - Generates form HTML with proper input types (radio/checkbox)
   - Adds `correct` attribute to correct answers (used by JS)
   - Content section is hidden until quiz is answered correctly

3. **Asset injection** (`on_page_content`):
   - CSS and JS loaded at module level from `mkdocs_quiz/css/` and `mkdocs_quiz/js/`
   - Injected as inline `<style>` and `<script>` tags (not external files)
   - JS handles form submission, answer validation, visual feedback

### JavaScript Behavior

The quiz.js file:

- Attaches submit handlers to all `.quiz` forms on page load
- Validates selected answers against `[correct]` attribute
- Shows/hides content section based on correctness
- Adds `.correct` and `.wrong` classes for visual feedback
- `resetFieldset()` clears previous styling before re-validation

### Page-Level Control

Quizzes can be disabled per-page via front matter:

```yaml
---
quiz: disable
---
```

Both `on_page_markdown` and `on_page_content` check `page.meta["quiz"]` to skip processing.

## Development Commands

### Setup

```bash
pip install -e ".[dev]"
pre-commit install  # Auto-formats and lints on commit
```

### Testing

```bash
# Run all tests
pytest tests/

# With coverage
pytest tests/ --cov=mkdocs_quiz --cov-report=html

# Single test
pytest tests/test_plugin.py::test_single_choice_quiz

# Test with live example
cd example && mkdocs serve
```

### Code Quality

Pre-commit hooks run automatically on `git commit`. To run manually:

```bash
# All checks
pre-commit run --all-files

# Individual tools
ruff format mkdocs_quiz tests  # Format Python
ruff check mkdocs_quiz tests   # Lint Python
npx prettier --write "mkdocs_quiz/**/*.{js,css}"  # Format JS/CSS
mypy mkdocs_quiz               # Type check
```

### Building

```bash
python -m build  # Creates dist/mkdocs_quiz-*.whl and .tar.gz
```

## Code Style

- **Python**: Ruff (formatter + linter), 100 char line length, Python 3.8+ compatible
- **JavaScript/CSS**: Prettier with 100 char print width
- **Type hints**: Required for all Python function signatures
- **Imports**: `from __future__ import annotations` for forward compatibility

## Testing Considerations

When writing tests:

- Mock pages need proper initialization: `Page(None, file, config)` with valid `File` object
- Page metadata accessed via `page.meta` dictionary
- Quiz processing errors are logged but don't raise exceptions (graceful degradation)
- Test both single-choice (one correct) and multiple-choice (2+ correct) scenarios

## Publishing

PyPI publishing is fully automated via GitHub Actions:

1. Update version in `pyproject.toml`
2. Update `CHANGELOG.md`
3. Create GitHub release
4. Workflow automatically builds and publishes to PyPI

See `.github/workflows/publish.yml` for setup instructions (requires PyPI trusted publishing configuration).
