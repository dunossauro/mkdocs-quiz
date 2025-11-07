---
quiz:
  auto_number: true
  disable_after_submit: false
  show_correct: false
---

# Page-Level Options Example

This page demonstrates how to override plugin configuration on a per-page basis using frontmatter.

## Frontmatter Used

```yaml
---
quiz:
  auto_number: true            # Auto-number questions on this page
  disable_after_submit: false  # Allow multiple attempts
  show_correct: false          # Don't reveal correct answers
---
```

## Effect

Notice that:

1. **Questions are auto-numbered** (Question 1:, Question 2:, etc.)
2. **You can retry** each quiz multiple times (Try Again button appears)
3. **Correct answers are NOT shown** when you get it wrong

## Try It!

<?quiz?>
What is the capital of France?
- [ ] London
- [x] Paris
- [ ] Berlin

Paris is correct!
<?/quiz?>

<?quiz?>
Which of these are programming languages?
- [x] Python
- [ ] HTML
- [x] JavaScript
- [ ] CSS

Python and JavaScript are programming languages!
<?/quiz?>

<?quiz?>
Is water wet?
- [x] Yes
- [ ] No

This is a philosophical question!
<?/quiz?>

## How This Works

The frontmatter at the top of this markdown file overrides the plugin-level settings from `mkdocs.yml` **only for this page**.

Other pages will still use the default plugin configuration.

## See Also

- [Configuration](../configuration.md) - All available options
- [All Examples](index.md) - Back to examples index
