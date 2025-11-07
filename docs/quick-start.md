# Quick Start

This guide will help you create your first quiz in just a few minutes.

## Basic Quiz Syntax

Quizzes are created using special `<?quiz?>` tags in your markdown files. The basic structure is:

```markdown
<?quiz?>
Question text goes here
- [x] Correct answer
- [ ] Incorrect answer
- [ ] Another incorrect answer

Optional content revealed after correct answer
<?/quiz?>
```

## Your First Quiz

Let's create a simple single-choice quiz:

````markdown
<?quiz?>
What is the capital of France?
- [ ] London
- [x] Paris
- [ ] Berlin
- [ ] Madrid

Paris has been the capital of France since 508 AD!
<?/quiz?>
````

**Result:**

<?quiz?>
What is the capital of France?
- [ ] London
- [x] Paris
- [ ] Berlin
- [ ] Madrid

Paris has been the capital of France since 508 AD!
<?/quiz?>

## Quiz Types

### Single Choice (Radio Buttons)

When there's **one correct answer**, radio buttons are displayed:

```markdown
<?quiz?>
Is the sky blue?
- [x] Yes
- [ ] No

The sky appears blue due to Rayleigh scattering!
<?/quiz?>
```

### Multiple Choice (Checkboxes)

When there are **multiple correct answers**, checkboxes are displayed:

```markdown
<?quiz?>
Which of these are programming languages?
- [x] Python
- [ ] HTML
- [x] JavaScript
- [ ] CSS

Python and JavaScript are programming languages, while HTML and CSS are markup/styling languages.
<?/quiz?>
```

## Content Section

The content section (everything after the answers) is optional but useful for providing:

- Explanations
- Additional context
- Links to more information
- Images or videos

The content can include full markdown formatting:

```markdown
<?quiz?>
What is MkDocs?
- [x] A static site generator
- [ ] A database
- [ ] A web server

## Learn More About MkDocs

MkDocs is a **fast**, **simple** static site generator built with Python.

- [Official Documentation](https://www.mkdocs.org)
- [GitHub Repository](https://github.com/mkdocs/mkdocs)
<?/quiz?>
```

## Next Steps

- Check out [all examples](examples/index.md) to see more quiz variations
- Learn about [configuration options](configuration.md)
- Explore [advanced features](advanced.md)
