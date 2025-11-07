# Installation

## Requirements

- Python 3.8 or higher
- MkDocs 1.0.0 or higher

## Install from PyPI

The easiest way to install mkdocs-quiz is using pip:

```bash
pip install mkdocs-quiz
```

## Install from source

For development or to get the latest unreleased features:

```bash
git clone https://github.com/ewels/mkdocs-quiz.git
cd mkdocs-quiz
pip install -e ".[dev]"
```

## Enabling the Plugin

Add the plugin to your `mkdocs.yml` configuration file:

```yaml
plugins:
  - mkdocs-quiz
```

That's it! The plugin is now active and will process all quiz blocks in your markdown files.

## Configuration

See the [Configuration](configuration.md) page for all available options.
