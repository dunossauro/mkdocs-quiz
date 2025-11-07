# Examples

This page demonstrates all the different types of quizzes and options available in mkdocs-quiz. Each example shows a working quiz in the "Example" tab and the markdown source code in the "Syntax" tab.

## Basic Examples

### Single Choice Quiz

A quiz with one correct answer displays as radio buttons:

=== "Example"

    <?quiz?>
    What is 2 + 2?
    - [ ] 3
    - [x] 4
    - [ ] 5

    Correct! Basic arithmetic is important.
    <?/quiz?>

=== "Syntax"

    ```markdown
    <?quiz?>
    What is 2 + 2?
    - [ ] 3
    - [x] 4
    - [ ] 5

    Correct! Basic arithmetic is important.
    <?/quiz?>
    ```

    **Syntax breakdown:**

    - `<?quiz?>` - Opening tag
    - Question text (can include markdown formatting)
    - `- [ ]` - Incorrect answer (empty checkbox)
    - `- [x]` - Correct answer (checked checkbox)
    - Content section (optional, shown after correct answer)
    - `<?/quiz?>` - Closing tag

### Multiple Choice Quiz

A quiz with multiple correct answers displays as checkboxes:

=== "Example"

    <?quiz?>
    Which of these are even numbers?
    - [x] 2
    - [ ] 3
    - [x] 4
    - [ ] 5

    Great! 2 and 4 are both even numbers.
    <?/quiz?>

=== "Syntax"

    ```markdown
    <?quiz?>
    Which of these are even numbers?
    - [x] 2
    - [ ] 3
    - [x] 4
    - [ ] 5

    Great! 2 and 4 are both even numbers.
    <?/quiz?>
    ```

    **Key difference:** When there are multiple `- [x]` correct answers, checkboxes are displayed instead of radio buttons, and users must select all correct answers.

### Quiz Without Content

The content section is optional:

=== "Example"

    <?quiz?>
    Is Python a programming language?
    - [x] Yes
    - [ ] No
    <?/quiz?>

=== "Syntax"

    ```markdown
    <?quiz?>
    Is Python a programming language?
    - [x] Yes
    - [ ] No
    <?/quiz?>
    ```

## Answer Syntax Variations

All of these checkbox formats are supported:

- `- [x]` - Correct answer (with lowercase x)
- `- [X]` - Correct answer (uppercase X also works)
- `- [ ]` - Incorrect answer (with space)
- `- []` - Incorrect answer (without space)

## Markdown in Questions and Answers

### Markdown in Questions

Questions can include markdown formatting like bold, italics, and code:

=== "Example"

    <?quiz?>
    What is the result of `2 ** 3` in **Python**?
    - [ ] 6
    - [x] 8
    - [ ] 9

    The `**` operator is exponentiation: 2<sup>3</sup> = 8
    <?/quiz?>

=== "Syntax"

    ```markdown
    <?quiz?>
    What is the result of `2 ** 3` in **Python**?
    - [ ] 6
    - [x] 8
    - [ ] 9

    The `**` operator is exponentiation: 2<sup>3</sup> = 8
    <?/quiz?>
    ```

### Markdown in Answers

Answers can also include markdown:

=== "Example"

    <?quiz?>
    Which is the correct Python syntax?
    - [ ] `print "Hello"`
    - [x] `print("Hello")`
    - [ ] `echo "Hello"`

    In Python 3, `print()` is a function, not a statement.
    <?/quiz?>

=== "Syntax"

    ```markdown
    <?quiz?>
    Which is the correct Python syntax?
    - [ ] `print "Hello"`
    - [x] `print("Hello")`
    - [ ] `echo "Hello"`

    In Python 3, `print()` is a function, not a statement.
    <?/quiz?>
    ```

## Rich Content Section

The content section supports full markdown formatting including headers, bold/italic text, lists, links, code blocks, images, and tables.

### Example with Rich Content

=== "Example"

    <?quiz?>
    What is MkDocs?
    - [x] A static site generator
    - [ ] A database
    - [ ] A web server
    - [ ] A framework

    ## About MkDocs

    MkDocs is a **fast**, **simple** and **downright gorgeous** static site generator.

    Key features:

    - Written in Python
    - Uses Markdown for content
    - Includes live preview server
    - Themeable with many themes available

    [Learn more at mkdocs.org](https://www.mkdocs.org)
    <?/quiz?>

=== "Syntax"

    ````markdown
    <?quiz?>
    What is MkDocs?
    - [x] A static site generator
    - [ ] A database
    - [ ] A web server
    - [ ] A framework

    ## About MkDocs

    MkDocs is a **fast**, **simple** and **downright gorgeous** static site generator.

    Key features:

    - Written in Python
    - Uses Markdown for content
    - Includes live preview server
    - Themeable with many themes available

    [Learn more at mkdocs.org](https://www.mkdocs.org)
    <?/quiz?>
    ````

### Example with Code Blocks

You can include code examples in the content section:

=== "Example"

    <?quiz?>
    Which loop syntax is correct in Python?
    - [x] `for item in items:`
    - [ ] `for (item in items)`
    - [ ] `foreach item in items`

    Here's a complete example:

    ```python
    fruits = ["apple", "banana", "cherry"]
    for fruit in fruits:
        print(fruit)
    ```

    This will print each fruit on a new line.
    <?/quiz?>

=== "Syntax"

    `````markdown
    <?quiz?>
    Which loop syntax is correct in Python?
    - [x] `for item in items:`
    - [ ] `for (item in items)`
    - [ ] `foreach item in items`

    Here's a complete example:

    ```python
    fruits = ["apple", "banana", "cherry"]
    for fruit in fruits:
        print(fruit)
    ```

    This will print each fruit on a new line.
    <?/quiz?>
    `````

### Example with Images

=== "Example"

    <?quiz?>
    Which programming language has this logo? 🐍
    - [x] Python
    - [ ] JavaScript
    - [ ] Ruby

    ![Quiz Example](images/quiz.png)

    Python's logo features two intertwined snakes!
    <?/quiz?>

=== "Syntax"

    ```markdown
    <?quiz?>
    Which programming language has this logo? 🐍
    - [x] Python
    - [ ] JavaScript
    - [ ] Ruby

    ![Quiz Example](images/quiz.png)

    Python's logo features two intertwined snakes!
    <?/quiz?>
    ```

### Example with Tables

=== "Example"

    <?quiz?>
    What's special about this formula: E = mc²?
    - [ ] It calculates electricity
    - [x] It relates mass and energy
    - [ ] It describes gravity

    Einstein's famous equation shows:

    | Symbol | Meaning |
    |--------|---------|
    | E | Energy |
    | m | Mass |
    | c | Speed of light |

    The equation reveals that mass and energy are interchangeable!
    <?/quiz?>

=== "Syntax"

    ```markdown
    <?quiz?>
    What's special about this formula: E = mc²?
    - [ ] It calculates electricity
    - [x] It relates mass and energy
    - [ ] It describes gravity

    Einstein's famous equation shows:

    | Symbol | Meaning |
    |--------|---------|
    | E | Energy |
    | m | Mass |
    | c | Speed of light |

    The equation reveals that mass and energy are interchangeable!
    <?/quiz?>
    ```

## Multiple Quizzes

You can have multiple quizzes on the same page. They are automatically tracked independently:

=== "Example"

    <?quiz?>
    Question 1: What is 1 + 1?
    - [ ] 1
    - [x] 2
    - [ ] 3
    <?/quiz?>

    <?quiz?>
    Question 2: What is 2 × 2?
    - [ ] 2
    - [x] 4
    - [ ] 6
    <?/quiz?>

    <?quiz?>
    Question 3: What is 10 - 5?
    - [ ] 3
    - [x] 5
    - [ ] 7
    <?/quiz?>

=== "Syntax"

    ```markdown
    <?quiz?>
    Question 1: What is 1 + 1?
    - [ ] 1
    - [x] 2
    - [ ] 3
    <?/quiz?>

    <?quiz?>
    Question 2: What is 2 × 2?
    - [ ] 2
    - [x] 4
    - [ ] 6
    <?/quiz?>

    <?quiz?>
    Question 3: What is 10 - 5?
    - [ ] 3
    - [x] 5
    - [ ] 7
    <?/quiz?>
    ```

## Edge Cases

### Long Questions

=== "Example"

    <?quiz?>
    According to the theory of relativity, what would happen to time for an observer traveling at speeds approaching the speed of light, relative to an observer at rest?
    - [ ] Time would speed up
    - [x] Time would slow down (time dilation)
    - [ ] Time would remain the same
    - [ ] Time would stop completely

    This is known as **time dilation**, one of the key predictions of Einstein's special relativity. The faster you move, the slower time passes for you relative to stationary observers.
    <?/quiz?>

=== "Syntax"

    ```markdown
    <?quiz?>
    According to the theory of relativity, what would happen to time for an observer traveling at speeds approaching the speed of light, relative to an observer at rest?
    - [ ] Time would speed up
    - [x] Time would slow down (time dilation)
    - [ ] Time would remain the same
    - [ ] Time would stop completely

    This is known as **time dilation**, one of the key predictions of Einstein's special relativity.
    <?/quiz?>
    ```

### Many Answer Options

=== "Example"

    <?quiz?>
    Which of these is a valid HTTP status code?
    - [x] 200
    - [ ] 299
    - [ ] 150
    - [x] 404
    - [ ] 405
    - [x] 500
    - [ ] 600
    - [ ] 700

    Common HTTP status codes:
    - **200**: OK
    - **404**: Not Found
    - **500**: Internal Server Error
    <?/quiz?>

=== "Syntax"

    ```markdown
    <?quiz?>
    Which of these is a valid HTTP status code?
    - [x] 200
    - [ ] 299
    - [ ] 150
    - [x] 404
    - [ ] 405
    - [x] 500
    - [ ] 600
    - [ ] 700

    Common HTTP status codes:
    - **200**: OK
    - **404**: Not Found
    - **500**: Internal Server Error
    <?/quiz?>
    ```

## Important Notes

1. **Content must be valid markdown/HTML**: The content section is processed as markdown and must be valid
2. **Checkbox syntax is recognized**: Use `- [x]`, `- [X]`, `- [ ]`, or `- []`
3. **At least one correct answer required**: Every quiz must have at least one `- [x]` answer
4. **Empty lines are ignored**: Blank lines between answers are okay
5. **Question comes first**: The first line after `<?quiz?>` is always the question

## See Also

- [Configuration Options](../configuration.md) - Customize quiz behavior globally
- [Page-Level Options](page-options.md) - Examples of per-page configuration
- [Disabled Page](disable.md) - How to disable quizzes on a page
