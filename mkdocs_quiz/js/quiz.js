// Global quiz tracker
const quizTracker = {
  quizzes: {},
  totalQuizzes: 0,
  answeredQuizzes: 0,
  correctQuizzes: 0,

  init: function () {
    this.totalQuizzes = document.querySelectorAll(".quiz").length;
    this.loadFromStorage();
    this.updateDisplay();
  },

  markQuiz: function (quizId, isCorrect) {
    if (!this.quizzes[quizId]) {
      this.answeredQuizzes++;
    }
    this.quizzes[quizId] = {
      answered: true,
      correct: isCorrect,
    };
    if (isCorrect && !this.wasPreviouslyCorrect(quizId)) {
      this.correctQuizzes++;
    }
    this.saveToStorage();
    this.updateDisplay();
  },

  wasPreviouslyCorrect: function (quizId) {
    return this.quizzes[quizId] && this.quizzes[quizId].correct;
  },

  resetQuiz: function (quizId) {
    if (this.quizzes[quizId]) {
      if (this.quizzes[quizId].correct) {
        this.correctQuizzes--;
      }
      this.answeredQuizzes--;
      delete this.quizzes[quizId];
      this.saveToStorage();
      this.updateDisplay();
    }
  },

  getProgress: function () {
    return {
      total: this.totalQuizzes,
      answered: this.answeredQuizzes,
      correct: this.correctQuizzes,
      percentage: this.totalQuizzes > 0 ? Math.round((this.answeredQuizzes / this.totalQuizzes) * 100) : 0,
      score: this.totalQuizzes > 0 ? Math.round((this.correctQuizzes / this.totalQuizzes) * 100) : 0,
    };
  },

  saveToStorage: function () {
    try {
      const pageKey = "quiz_progress_" + window.location.pathname;
      localStorage.setItem(pageKey, JSON.stringify(this.quizzes));
    } catch (e) {
      // Silently fail if localStorage is not available
    }
  },

  loadFromStorage: function () {
    try {
      const pageKey = "quiz_progress_" + window.location.pathname;
      const stored = localStorage.getItem(pageKey);
      if (stored) {
        this.quizzes = JSON.parse(stored);
        // Recalculate counts
        this.answeredQuizzes = 0;
        this.correctQuizzes = 0;
        for (let key in this.quizzes) {
          if (this.quizzes[key].answered) {
            this.answeredQuizzes++;
          }
          if (this.quizzes[key].correct) {
            this.correctQuizzes++;
          }
        }
      }
    } catch (e) {
      // Silently fail if localStorage is not available
    }
  },

  updateDisplay: function () {
    // Dispatch custom event for sidebar/other UI components
    window.dispatchEvent(
      new CustomEvent("quizProgressUpdate", {
        detail: this.getProgress(),
      })
    );
    // Update sidebar if it exists
    this.updateSidebar();
  },

  updateSidebar: function () {
    const sidebar = document.getElementById("quiz-progress-sidebar");
    if (sidebar) {
      const progress = this.getProgress();
      sidebar.querySelector(".quiz-progress-answered").textContent = progress.answered;
      sidebar.querySelector(".quiz-progress-total").textContent = progress.total;
      sidebar.querySelector(".quiz-progress-percentage").textContent = progress.percentage + "%";
      sidebar.querySelector(".quiz-progress-score").textContent = progress.correct;
      sidebar.querySelector(".quiz-progress-score-percentage").textContent = progress.score + "%";

      // Update progress bar
      const progressBar = sidebar.querySelector(".quiz-progress-bar-fill");
      if (progressBar) {
        progressBar.style.width = progress.percentage + "%";
      }
    }
  },

  createSidebar: function () {
    // Only create sidebar if there are multiple quizzes
    if (this.totalQuizzes <= 1) {
      return;
    }

    const progress = this.getProgress();
    const sidebar = document.createElement("div");
    sidebar.id = "quiz-progress-sidebar";
    sidebar.className = "quiz-progress-sidebar";
    sidebar.innerHTML = `
      <div class="quiz-progress-header">Quiz Progress</div>
      <div class="quiz-progress-stats">
        <div class="quiz-progress-stat">
          <div class="quiz-progress-label">Answered</div>
          <div class="quiz-progress-value">
            <span class="quiz-progress-answered">${progress.answered}</span> /
            <span class="quiz-progress-total">${progress.total}</span>
          </div>
        </div>
        <div class="quiz-progress-bar">
          <div class="quiz-progress-bar-fill" style="width: ${progress.percentage}%"></div>
        </div>
        <div class="quiz-progress-percentage-text">
          <span class="quiz-progress-percentage">${progress.percentage}%</span> Complete
        </div>
        <div class="quiz-progress-stat">
          <div class="quiz-progress-label">Correct</div>
          <div class="quiz-progress-value">
            <span class="quiz-progress-score">${progress.correct}</span> /
            <span class="quiz-progress-total">${progress.total}</span>
            (<span class="quiz-progress-score-percentage">${progress.score}%</span>)
          </div>
        </div>
      </div>
    `;

    // Try to find the best place to insert the sidebar
    const article = document.querySelector("article") || document.querySelector("main");
    if (article) {
      article.appendChild(sidebar);
    } else {
      document.body.appendChild(sidebar);
    }
  },
};

// Initialize tracker
quizTracker.init();

// Create sidebar after page loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    quizTracker.createSidebar();
  });
} else {
  quizTracker.createSidebar();
}

document.querySelectorAll(".quiz").forEach((quiz) => {
  let form = quiz.querySelector("form");
  let fieldset = form.querySelector("fieldset");
  let submitButton = form.querySelector('button[type="submit"]');

  // Get quiz ID from header
  const header = quiz.querySelector("h1, h2, h3, h4, h5, h6");
  const quizId = header ? header.id : null;

  // Create reset button (initially hidden)
  let resetButton = document.createElement("button");
  resetButton.type = "button";
  resetButton.className = "quiz-button quiz-reset-button hidden";
  resetButton.textContent = "Try Again";
  if (submitButton) {
    submitButton.parentNode.insertBefore(resetButton, submitButton.nextSibling);
  } else {
    form.appendChild(resetButton);
  }

  // Auto-submit on radio button change if enabled
  if (quiz.hasAttribute("data-auto-submit")) {
    let radioButtons = fieldset.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((radio) => {
      radio.addEventListener("change", () => {
        // Trigger form submission
        form.dispatchEvent(new Event("submit"));
      });
    });
  }

  // Reset button handler
  resetButton.addEventListener("click", () => {
    // Clear all selections
    const allInputs = fieldset.querySelectorAll('input[name="answer"]');
    for (let i = 0; i < allInputs.length; i++) {
      allInputs[i].checked = false;
      allInputs[i].disabled = false;
    }
    // Reset colors
    resetFieldset(fieldset);
    // Hide content section
    let section = quiz.querySelector("section");
    section.classList.add("hidden");
    // Show submit button, hide reset button
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.classList.remove("hidden");
    }
    resetButton.classList.add("hidden");
    // Update tracker
    if (quizId) {
      quizTracker.resetQuiz(quizId);
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let selectedAnswers = form.querySelectorAll('input[name="answer"]:checked');
    let correctAnswers = fieldset.querySelectorAll('input[name="answer"][correct]');
    // Check if all correct answers are selected
    let is_correct = selectedAnswers.length === correctAnswers.length;
    for (let i = 0; i < selectedAnswers.length; i++) {
      if (!selectedAnswers[i].hasAttribute("correct")) {
        is_correct = false;
        break;
      }
    }
    let section = quiz.querySelector("section");
    if (is_correct) {
      section.classList.remove("hidden");
      resetFieldset(fieldset);
      // Mark all fields with colors
      const allAnswers = fieldset.querySelectorAll('input[name="answer"]');
      for (let i = 0; i < allAnswers.length; i++) {
        if (allAnswers[i].hasAttribute("correct")) {
          allAnswers[i].parentElement.classList.add("correct");
        } else {
          allAnswers[i].parentElement.classList.add("wrong");
        }
      }
    } else {
      section.classList.add("hidden");
      resetFieldset(fieldset);
      // Mark wrong fields with colors
      for (let i = 0; i < selectedAnswers.length; i++) {
        if (!selectedAnswers[i].hasAttribute("correct")) {
          selectedAnswers[i].parentElement.classList.add("wrong");
        } else {
          selectedAnswers[i].parentElement.classList.add("correct");
        }
      }
      // If show-correct is enabled, also show all correct answers
      if (quiz.hasAttribute("data-show-correct")) {
        for (let i = 0; i < correctAnswers.length; i++) {
          correctAnswers[i].parentElement.classList.add("correct");
        }
      }
    }

    // Update tracker
    if (quizId) {
      quizTracker.markQuiz(quizId, is_correct);
    }

    // Disable quiz after submission if option is enabled
    if (quiz.hasAttribute("data-disable-after-submit")) {
      const allInputs = fieldset.querySelectorAll('input[name="answer"]');
      for (let i = 0; i < allInputs.length; i++) {
        allInputs[i].disabled = true;
      }
      if (submitButton) {
        submitButton.disabled = true;
      }
      // Hide reset button if disable-after-submit is enabled
      resetButton.classList.add("hidden");
    } else {
      // Show reset button and hide submit button
      resetButton.classList.remove("hidden");
      if (submitButton) {
        submitButton.classList.add("hidden");
      }
    }
  });
});

function resetFieldset(fieldset) {
  const fieldsetChildren = fieldset.children;
  for (let i = 0; i < fieldsetChildren.length; i++) {
    fieldsetChildren[i].classList.remove("wrong");
    fieldsetChildren[i].classList.remove("correct");
  }
}
