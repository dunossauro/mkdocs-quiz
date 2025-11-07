# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-07

### Added

- Modernized codebase with Python 3.8+ support
- Migrated from deprecated `distutils` to modern `pyproject.toml` (PEP 517/518)
- Added comprehensive type hints throughout the codebase
- Improved error handling and logging
- Added proper package structure with `__init__.py` files
- Switched to Ruff for Python formatting and linting (faster than Black + Flake8)
- Added Prettier for JavaScript and CSS formatting
- Added comprehensive test suite with pytest (8 tests)
- Added pre-commit hooks for automatic code quality checks
- Automated PyPI publishing via GitHub Actions with trusted publishing
- Added GitHub Actions CI for testing on Python 3.8-3.12
- Created dedicated CHANGELOG.md file
- Created comprehensive CONTRIBUTING.md guide

### Changed

- Better code organization and documentation
- Refactored quiz processing into separate methods for clarity
- Improved README.md to be more user-focused
- Updated all dependencies to latest versions

### Removed

- Removed deprecated `setup.py` (no backwards compatibility needed)
- Removed `Makefile` (pre-commit handles everything)
- Removed `distutils` dependency

## Historical Releases

### Pre-1.0.0

Previous versions by original author [Sebastian Jörz](https://github.com/skyface753).
See original repository history for details.

[1.0.0]: https://github.com/ewels/mkdocs-quiz/releases/tag/v1.0.0
