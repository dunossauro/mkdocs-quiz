# MkDocs Quiz - Code Review TODO List

## STATUS: All Critical Issues Addressed ✅

**Completed in 5 commits:**
1. Security: XSS vulnerabilities and exception handling
2. Security: Bundled confetti locally, improved localStorage validation
3. Quality: Type hints and thread-safe markdown converter
4. Performance: Optimized quiz replacement (O(n²) → O(n))
5. JavaScript: Fixed memory leaks and race conditions

---

## ✅ COMPLETED: Global Markdown Converter (plugin.py:40)
```python
markdown_converter = md.Markdown(extensions=["extra", "codehilite", "toc"])
```
**Issue**: Shared global instance isn't thread-safe if MkDocs builds in parallel.
**Fix**: Create per-page instances or add thread-local storage:
```python
import threading
_markdown_converter_local = threading.local()
```

## ✅ COMPLETED: Broad Exception Handling (plugin.py:34-37)
```python
except Exception as e:
    log.error(f"Failed to load CSS/JS resources: {e}")
```
**Issue**: Catches all exceptions including KeyboardInterrupt, SystemExit
**Fix**: Catch specific exceptions: `except (IOError, OSError) as e:`

## ✅ COMPLETED: Type Hints Missing Return Types
```python
def on_env(self, env, config, files):  # plugin.py:99
```
**Fix**: Add return type annotation for better IDE support


## ✅ COMPLETED: XSS Vulnerability in Input Values (plugin.py:254-258)
```python
answer_html = (
    f'<div><input type="{input_type}" name="answer" value="{i}" '  # ← No escaping!
    f'id="{input_id}" {correct_attr}>'
    f'<label for="{input_id}">{answer}</label></div>'
)
```
**Issue**: If `i` contains quotes or special chars, it could break HTML/enable XSS
**Likelihood**: Low (i is numeric), but risky pattern
**Fix**: Use `html.escape()` or ensure `i` is cast to int

## ✅ COMPLETED: Unsafe String Slicing for Quiz Replacement (plugin.py:385-387)
```python
masked_markdown = (
    masked_markdown[: match.start()] + placeholder + masked_markdown[match.end() :]
)
```
**Issue**: Processing in reverse, but if matches overlap or regex behavior changes, this could corrupt text
**Fix**: Build list of replacements and apply in single pass, or use `re.sub()` with callback

## ✅ COMPLETED: Memory Leak Risk with Material Instant Navigation (quiz.js:1-690)
**Issue**: Event listeners are attached but never cleaned up when Material's instant loading replaces page
**Impact**: Memory leak on multi-page browsing sessions
**Fix**: Store listener refs and clean up on Material's `location$` change event:
```javascript
document$.subscribe(() => {
  // Cleanup old listeners
  // Re-initialize quizzes
})
```

## ✅ COMPLETED: Silent localStorage Failures (quiz.js:152-157, 161-181)
- Silently catches all errors when quota exceeded or localStorage disabled
- Users get no feedback when their progress isn't saved
**Fix**: Show a warning banner message under the progress tracker

## ✅ COMPLETED: No Validation of Input Structure
- `_parse_quiz_question_and_answers` doesn't validate that question exists before answers
- Empty question with just answers will create malformed HTML

## ✅ COMPLETED: Race Condition in Progress Sidebar (quiz.js:19-35)
- `repositionSidebar()` runs immediately, but DOM might not be ready
- Could fail on slow page loads

## ✅ COMPLETED: Inefficient String Building for Multiple Quizzes (plugin.py:369-391)
```python
for idx, match in enumerate(reversed(matches)):  # Reverse to maintain positions
    masked_markdown = (
        masked_markdown[: match.start()] + placeholder + masked_markdown[match.end() :]
    )
```
**Issue**: O(n²) complexity - each replacement recreates entire string
**Impact**: Noticeable on pages with 10+ quizzes
**Fix**: Use list of segments or `re.sub()` with callback (single pass)

## ⚠️ DEFERRED: Multiple Markdown Conversions (plugin.py:216, 433-434, 453-454)
- Converts question, each answer, and content section separately
- Each creates new parser state
**Fix**: Could batch convert related content

## ⚠️ DEFERRED: DOTALL Regex on Large Documents (plugin.py:280, 366)
```python
for match in re.finditer(QUIZ_REGEX, markdown, re.DOTALL):
```
**Issue**: Can be slow on 100+ KB documents
**Fix**: Use an iterative parser

## ⚠️ DEFERRED: No Caching of Generated HTML
- Quizzes regenerated on every build even if unchanged
- Could cache based on content hash

## ✅ COMPLETED: XSS Prevention - HTML Escaping

Multiple locations insert user-controlled content without escaping:

```python
# plugin.py:254-258 - input value (numeric, but bad pattern)
value="{i}"  # Should use html.escape()

# plugin.py:489 - question HTML (from markdown converter, probably safe)
{question}  # Markdown already escapes, but document this assumption

# plugin.py:475 - answer HTML
{answers_html}  # From markdown converter
```

**Recommendation**: Import `html` module and escape all interpolated values as defense-in-depth:
```python
import html
answer_html = f'<div><input ... value="{html.escape(str(i))}" ...'
```

## ✅ COMPLETED: External CDN Dependency (plugin.py:612)
```python
confetti_script = '<script src="https://cdn.jsdelivr.net/npm/js-confetti@latest/dist/js-confetti.browser.js"></script>'
```
**Issues:**
- Using `@latest` tag - no version pinning (supply chain attack risk)
- External CDN could be compromised or go down
- Breaks Content Security Policy (CSP)
- No Subresource Integrity (SRI) hash

**Fixes:**
- Bundle confetti locally in the package

## ✅ COMPLETED: localStorage Security
- No size limit checking (could DoS browser)
- No data validation when loading from storage
- Persists forever (no expiry)

**Recommendation**: Add validation when restoring:
```javascript
const stored = localStorage.getItem(pageKey);
if (stored && stored.length < 50000) {  // Sanity check
  try {
    this.quizzes = JSON.parse(stored);
    // Validate structure here
  } catch (e) {
    localStorage.removeItem(pageKey);  // Clear corrupted data
  }
}
```


## ⚠️ FUTURE ENHANCEMENT: Test Coverage

### 📊 Current Coverage: 59% Overall, 87% for plugin.py

### ❌ Missing Coverage

**Critical Gaps:**

1. **CLI Module: 0% Coverage** (cli.py)
   - No tests for migrate command
   - No tests for file conversion logic
   - No tests for error handling

2. **JavaScript: No Tests**
   - No unit tests for quiz.js
   - No integration tests for form submission
   - No tests for localStorage persistence
   - Consider: Jest or Playwright for JS testing

3. **Uncovered Plugin Features:**
   - Material theme integration (`on_env`) - lines 113-127
   - Results div generation - lines 508-532
   - Intro generation - lines 540-548
   - Confetti configuration injection
   - Auto-numbering script generation

4. **Edge Cases:**
   - Empty quiz content
   - Quiz with no correct answers
   - Quiz with all correct answers
   - Special characters in questions/answers (", ', <, >, &)
   - Very long quiz content (stress test)
   - Malformed checkboxes: `- [y]`, `- [X]` (capital X is handled, but not tested)
   - Multiple quizzes with same question text
   - Nested markdown (code inside answers, etc.)

### 📝 Recommended Test Additions

```python
# test_plugin.py additions needed:

def test_quiz_with_special_html_characters():
    """Test XSS prevention with <script>, quotes, etc."""

def test_results_div_generation():
    """Test <!-- mkdocs-quiz results --> replacement"""

def test_intro_generation():
    """Test <!-- mkdocs-quiz intro --> replacement"""

def test_code_block_with_indentation():
    """Test that indented code blocks are handled"""

def test_material_theme_integration():
    """Test on_env with Material theme"""

def test_confetti_config_injection():
    """Test confetti script and config are added correctly"""

def test_quiz_with_empty_content():
    """Test quiz with empty question or no answers"""

# test_cli.py - NEW FILE
def test_migrate_converts_old_syntax():
def test_migrate_dry_run():
def test_migrate_handles_missing_directory():
def test_convert_quiz_block_preserves_content():
```
