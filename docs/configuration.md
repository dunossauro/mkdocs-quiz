# Configuration

The mkdocs-quiz plugin can be configured at three levels: plugin-wide, page-level, and per-quiz behavior.

## Plugin Configuration

Add configuration options to your `mkdocs.yml` file:

```yaml
plugins:
  - mkdocs-quiz:
      enabled_by_default: true       # Enable quizzes by default on all pages
      auto_number: false              # Auto-number questions (Question 1:, Question 2:, etc.)
      question_tag: h4                # HTML tag for question text (h1-h6, div, span, etc.)
      show_correct: true              # Show correct answers when user gets it wrong
      auto_submit: true               # Auto-submit single-choice quizzes on selection
      disable_after_submit: true      # Disable quiz after first submission
```

### Configuration Options

#### `enabled_by_default`
**Type:** `bool`
**Default:** `true`

Controls whether quizzes are processed by default on all pages.

- `true`: Quizzes work everywhere (opt-out mode)
- `false`: Quizzes only work on pages that explicitly enable them (opt-in mode)

**Example:**
```yaml
plugins:
  - mkdocs-quiz:
      enabled_by_default: false  # Opt-in mode
```

#### `auto_number`
**Type:** `bool`
**Default:** `false`

Automatically adds "Question 1:", "Question 2:", etc. before each quiz question.

**Example:**
```yaml
plugins:
  - mkdocs-quiz:
      auto_number: true
```

#### `question_tag`
**Type:** `str`
**Default:** `"h4"`

The HTML tag used for quiz questions. Common values: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `div`, `p`.

**Example:**
```yaml
plugins:
  - mkdocs-quiz:
      question_tag: h3  # Make questions larger
```

#### `show_correct`
**Type:** `bool`
**Default:** `true`

Whether to highlight correct answers when the user selects an incorrect answer.

- `true`: Shows correct answers in green when user is wrong
- `false`: Only shows what the user selected as wrong (red)

**Example:**
```yaml
plugins:
  - mkdocs-quiz:
      show_correct: false  # Don't show answers
```

#### `auto_submit`
**Type:** `bool`
**Default:** `true`

For single-choice quizzes only: automatically submit when user selects an answer.

- `true`: Clicking a radio button immediately checks the answer
- `false`: User must click a "Submit" button

**Note:** Multiple-choice quizzes always show a submit button regardless of this setting.

**Example:**
```yaml
plugins:
  - mkdocs-quiz:
      auto_submit: false  # Always show submit button
```

#### `disable_after_submit`
**Type:** `bool`
**Default:** `true`

Whether to disable the quiz after the first submission.

- `true`: Quiz locks after submission (no "Try Again" button)
- `false`: Shows "Try Again" button, allows multiple attempts

**Example:**
```yaml
plugins:
  - mkdocs-quiz:
      disable_after_submit: false  # Allow retries
```

## Page-Level Configuration

Override plugin settings for individual pages using frontmatter:

```yaml
---
quiz:
  enabled: false              # Disable/enable quizzes on this page
  auto_number: true           # Override auto_number for this page
  question_tag: h2            # Override question_tag for this page
  show_correct: false         # Override show_correct for this page
  auto_submit: false          # Override auto_submit for this page
  disable_after_submit: false # Override disable_after_submit for this page
---

# Your Page Content

<?quiz?>
...
<?/quiz?>
```

### Common Use Cases

#### Disable quizzes on a specific page

Useful for showing raw quiz syntax as documentation:

```yaml
---
quiz:
  enabled: false
---
```

#### Enable quizzes in opt-in mode

When `enabled_by_default: false` in plugin config:

```yaml
---
quiz:
  enabled: true
---
```

#### Allow multiple attempts on a test page

```yaml
---
quiz:
  disable_after_submit: false
  show_correct: false  # Don't give away answers
---
```

#### Auto-number questions on a specific page

```yaml
---
quiz:
  auto_number: true
---
```

## Configuration Priority

Settings are applied in this order (later overrides earlier):

1. **Plugin defaults** (hardcoded in plugin)
2. **Plugin configuration** (in `mkdocs.yml`)
3. **Page frontmatter** (in individual markdown files)

**Example:**

```yaml
# mkdocs.yml
plugins:
  - mkdocs-quiz:
      show_correct: true  # Default for all pages
```

```yaml
# individual-page.md
---
quiz:
  show_correct: false  # Override for this page only
---
```

## Complete Example

```yaml
# mkdocs.yml
site_name: My Documentation
theme:
  name: material

plugins:
  - search
  - mkdocs-quiz:
      enabled_by_default: true
      auto_number: false
      question_tag: h4
      show_correct: true
      auto_submit: true
      disable_after_submit: true

nav:
  - Home: index.md
  - Tutorials:
    - Quiz Tutorial: tutorial.md
  - Tests:
    - Final Exam: exam.md  # Uses page frontmatter to customize
```

```yaml
# exam.md
---
quiz:
  auto_number: true
  disable_after_submit: false  # Allow retries
  show_correct: false          # Don't show answers
---

# Final Exam

Take this exam to test your knowledge!

<?quiz?>
...
<?/quiz?>
```
