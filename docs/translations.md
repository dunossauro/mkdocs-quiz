# Translations

MkDocs Quiz supports multiple languages for all user-facing text (buttons, messages, progress tracking, etc.). The plugin includes built-in translations and allows you to add custom translations or override existing ones.

## Built-in Languages

The following languages are included with the plugin:

- **English** (`en_US`) - Default
- **French** (`fr_FR`)

!!! note "Contributing Translations"
We welcome contributions of additional languages! See the [Contributing Translations](#contributing-translations) section below.

## Configuration

### Global Language Setting

Set the default language for all pages:

```yaml
plugins:
  - mkdocs_quiz:
      language: fr_FR
```

### Per-Page Language

Override the language for specific pages using frontmatter:

```yaml
---
quiz:
  language: fr_FR
---
# Ma Page de Quiz

<quiz>
Quelle est la capitale de la France?
- [x] Paris
- [ ] Londres
- [ ] Berlin
</quiz>
```

### Pattern-Based Language Detection

Automatically set the language based on file paths:

```yaml
plugins:
  - mkdocs_quiz:
      language: en_US # Default
      language_patterns:
        - pattern: "fr/**/*"
          language: fr_FR
        - pattern: "es/**/*"
          language: es_ES
        - pattern: "de/**/*"
          language: de_DE
```

This is useful for multilingual sites organized by directory:

```
docs/
  en/
    index.md          # Uses en_US
  fr/
    index.md          # Uses fr_FR
  es/
    index.md          # Uses es_ES
```

### Language Resolution Order

When determining which language to use, the plugin checks in this order:

1. **Page frontmatter** - `quiz.language` in page metadata
2. **Pattern matching** - First matching pattern from `language_patterns`
3. **Global config** - `language` setting in plugin config
4. **Default fallback** - `en_US`

## Custom Translations

You can override built-in translations or add completely new languages.

### Creating a Custom Translation

#### Step 1: Create a Translation File

Initialize a new language file from the built-in template:

```bash
mkdocs-quiz init-translation ja_JP
```

This creates `ja_JP.po` in your current directory with all translatable strings ready to be translated.

#### Step 2: Translate the Strings

Edit the `.po` file with your translations. You can use:

- A text editor
- [Poedit](https://poedit.net/) - Free GUI application
- Online tools like [POEditor](https://poeditor.com/)

Example `.po` file structure:

```po
msgid "Submit"
msgstr "送信"

msgid "Correct answer!"
msgstr "正解！"

msgid "Try Again"
msgstr "もう一度"
```

#### Step 3: Configure the Custom Translation

Add the custom translation to your `mkdocs.yml`:

```yaml
plugins:
  - mkdocs_quiz:
      language: ja_JP
      custom_translations:
        ja_JP: translations/ja_JP.po
```

### Overriding Built-in Translations

You can override specific strings in built-in languages:

```yaml
plugins:
  - mkdocs_quiz:
      language: en_US
      custom_translations:
        en_US: translations/en_custom.po
```

Create `translations/en_custom.po` with only the strings you want to change:

```po
# translations/en_custom.po
msgid "Submit"
msgstr "Check Answer"

msgid "Try Again"
msgstr "Retry Quiz"

msgid "Outstanding! You aced it!"
msgstr "Perfect score! You're a quiz master!"
```

The custom translations will be merged with the built-in ones, overriding only the specified strings.

## Translatable Strings

The plugin translates the following UI elements:

### Buttons

- Submit
- Try Again
- Reset quiz
- Reset

### Feedback Messages

- Correct answer!
- Incorrect answer.
- Incorrect answer. Please try again.

### Progress Tracking

- Quiz Progress
- Answered:
- Correct:
- questions answered
- correct

### Question Numbering

- Question {n}

### Results Screen

- Quiz Complete!
- Outstanding! You aced it!
- Great job! You really know your stuff!
- Good effort! Keep learning!
- Not bad, but there's room for improvement!
- Better luck next time! Keep trying!

### Prompts

- Are you sure you want to reset the quiz? This will clear your progress.

### Intro Text

- Quiz results are saved to your browser's local storage and will persist between sessions.

## CLI Tools

The plugin includes command-line tools for managing translations:

### Check Translation Completeness

Verify that all strings are translated:

```bash
mkdocs-quiz check-translations
```

Output example:

```
Checking translation files...

Language: en_US
  File: en_US.po
  Total strings: 21
  Translated: 21 (100.0%)
  Untranslated: 0
  Fuzzy: 0
  Status: ✓ Complete

Language: fr_FR
  File: fr_FR.po
  Total strings: 21
  Translated: 21 (100.0%)
  Untranslated: 0
  Fuzzy: 0
  Status: ✓ Complete
```

This command is also run automatically in pre-commit hooks to ensure translation quality.

### Initialize New Translation

Create a new translation file from the template:

```bash
mkdocs-quiz init-translation <language>

# Examples:
mkdocs-quiz init-translation es_ES
mkdocs-quiz init-translation de_DE
```

By default, this creates `{language}.po` in your current directory. You can specify a custom output path with `-o` if needed.

## Contributing Translations

We welcome community translations! To contribute a new language:

1. **Fork the repository** on GitHub

2. **Create a new translation file:**

   ```bash
   cd mkdocs-quiz
   mkdocs-quiz init-translation <your_language> -o mkdocs_quiz/locales/<your_language>.po
   ```

   Note: The `-o` flag is needed here to place the file in the plugin's locales directory.

3. **Translate all strings** using Poedit or a text editor

4. **Verify completeness:**

   ```bash
   mkdocs-quiz check-translations
   ```

5. **Submit a pull request** with your translation

### Translation Guidelines

- Use the formal/informal tone appropriate for your language and educational contexts
- Keep translations concise to fit UI elements
- Preserve any `{n}` placeholders for dynamic values (e.g., "Question {n}")
- Test your translations by configuring them locally and viewing quiz pages

## Examples

### Multilingual Documentation Site

```yaml
plugins:
  - mkdocs_quiz:
      language: en_US
      language_patterns:
        - pattern: "en/**/*"
          language: en_US
        - pattern: "fr/**/*"
          language: fr_FR
        - pattern: "es/**/*"
          language: es_ES
```

Directory structure:

```
docs/
  en/
    getting-started.md
  fr/
    demarrage.md
  es/
    comenzar.md
```

### Custom Branding

Override default messages to match your brand voice:

```yaml
# mkdocs.yml
plugins:
  - mkdocs_quiz:
      custom_translations:
        en_US: translations/brand_en.po
```

```po
# translations/brand_en.po
msgid "Outstanding! You aced it!"
msgstr "Excellent work! You're ready for the next level!"

msgid "Try Again"
msgstr "Give it another shot"
```

### Mixed Languages on Single Page

Use page frontmatter to override for specific quizzes:

```yaml
---
title: Bilingual Quiz Page
quiz:
  language: fr_FR
---
# English Introduction

This page contains a French quiz.

<quiz>
Quelle est la capitale de la France?
- [x] Paris
- [ ] Londres
</quiz>
```

## Troubleshooting

### Translation Not Loading

If your custom translation isn't loading:

1. **Check the file path** - Ensure the path in `custom_translations` is relative to `mkdocs.yml`
2. **Verify the file format** - Make sure it's a valid `.po` file
3. **Check for syntax errors** - Run `mkdocs-quiz check-translations`
4. **Install polib** - The `polib` library is required: `pip install polib`

### Missing Translations

If you see English text when expecting another language:

1. **Check language code** - Ensure you're using the correct code (e.g., `fr_FR` not `fr`)
2. **Verify configuration** - Check your `language` setting in `mkdocs.yml`
3. **Check pattern matching** - If using patterns, ensure your file path matches
4. **View logs** - Run `mkdocs serve -v` for verbose output showing language resolution

### Special Characters Not Displaying

Ensure your `.po` file has the correct encoding:

```po
"Content-Type: text/plain; charset=UTF-8\n"
"Content-Transfer-Encoding: 8bit\n"
```

## Technical Details

### Translation File Format

Translations use the standard **gettext `.po` format**, which is widely supported by translation tools and platforms like:

- [Poedit](https://poedit.net/)
- [Weblate](https://weblate.org/)
- [Crowdin](https://crowdin.com/)
- [POEditor](https://poeditor.com/)

### How It Works

1. **Build Time**: The plugin loads translations when processing each page
2. **Resolution**: Language is determined based on configuration and page context
3. **Fallback Chain**: Hardcoded English → Built-in `.po` → Custom `.po`
4. **JavaScript Delivery**: Translations are passed to the browser as a JSON object
5. **Dynamic Updates**: JavaScript applies translations to interactive elements

### Performance

- Translations are loaded once per page build
- No runtime overhead - translations are embedded in the generated HTML
- Translation files are small (~2KB per language)
