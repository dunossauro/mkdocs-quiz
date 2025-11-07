# Advanced Features

## Progress Tracking

When using the Material theme, mkdocs-quiz automatically adds a progress sidebar showing:

- Number of quizzes answered / total quizzes
- Number of correct answers / total quizzes
- Visual progress bar
- Reset button

Progress is saved in browser localStorage and persists across page reloads.

## Deep Linking to Quizzes

Each quiz automatically gets a unique ID that can be linked to:

```markdown
See [Quiz 1](#quiz-0) for more information.
```

Quizzes are numbered starting from 0: `#quiz-0`, `#quiz-1`, `#quiz-2`, etc.

## Auto-Numbering

Enable auto-numbering to prefix each question:

```yaml
# mkdocs.yml
plugins:
  - mkdocs-quiz:
      auto_number: true
```

This adds "Question 1:", "Question 2:", etc. before each quiz question.

You can also enable it per-page:

```yaml
---
quiz:
  auto_number: true
---
```

## Custom Question Tags

Change the HTML tag used for quiz questions:

```yaml
# mkdocs.yml
plugins:
  - mkdocs-quiz:
      question_tag: h3  # Makes questions larger
```

Valid options: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `div`, `p`

## Theming Integration

The plugin works with any MkDocs theme, but has special integration with Material theme:

- Progress sidebar in TOC
- Uses theme color variables
- Responsive design
- Dark mode support

## Browser Compatibility

The plugin uses modern JavaScript features and works in:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

Features used:
- `localStorage` for progress tracking
- ES6+ JavaScript
- CSS custom properties

## Migration from Old Syntax

If you have quizzes using the old syntax (`question:`, `answer-correct:`, etc.), use the migration CLI tool:

```bash
# Preview changes
mkdocs-quiz migrate docs/ --dry-run

# Apply changes
mkdocs-quiz migrate docs/
```

This converts:

```markdown
<?quiz?>
question: What is 2+2?
answer-correct: 4
answer: 3
answer: 5
content:
Correct!
<?/quiz?>
```

To:

```markdown
<?quiz?>
What is 2+2?
- [x] 4
- [ ] 3
- [ ] 5

Correct!
<?/quiz?>
```

## Performance

The plugin is designed to be fast:

- CSS/JS injected inline (no external requests)
- Minimal JavaScript (< 20KB)
- No jQuery or heavy dependencies
- Quiz processing happens during build (not runtime)

## Security

- All user input is validated
- No eval() or dangerous JavaScript
- Content is properly escaped
- LocalStorage is scoped per-page

## Accessibility

- Proper ARIA labels
- Keyboard navigation support
- Screen reader compatible
- Semantic HTML structure
- Focus management

## Best Practices

### Content Organization

- Group related quizzes together
- Use headings to separate quiz sections
- Provide context before quizzes

### Question Writing

- Keep questions concise and clear
- Avoid trick questions
- Provide meaningful feedback in content sections
- Test your quizzes!

### Configuration

- Start with defaults
- Only override when needed
- Document page-level overrides
- Be consistent across your site

### Performance

- Don't put too many quizzes on one page (< 20 recommended)
- Optimize images in content sections
- Use lazy loading for heavy content

## Troubleshooting

### Quizzes not appearing

1. Check plugin is enabled in `mkdocs.yml`
2. Verify quiz syntax is correct
3. Check browser console for errors
4. Ensure page isn't disabled with `quiz: {enabled: false}`

### Progress not saving

- Check localStorage is enabled in browser
- Verify browser compatibility
- Check for localStorage quota exceeded

### Styling issues

- Check for CSS conflicts with your theme
- Inspect element to see applied styles
- Try a different theme to isolate issue

### Build errors

- Run `mkdocs build --verbose` for details
- Check quiz syntax carefully
- Verify all required dependencies installed

## See Also

- [Configuration](configuration.md)
- [Examples](examples/index.md)
- [GitHub Issues](https://github.com/ewels/mkdocs-quiz/issues)
