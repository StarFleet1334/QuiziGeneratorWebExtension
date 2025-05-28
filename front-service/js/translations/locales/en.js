export default {
    title: "Active Reading Quiz",
    buttons: {
        startQuiz: "Start Quiz",
        chooseCategory: "Choose Category",
        settings: "Settings",
        goBack: "Go Back",
        generateAgain: "Generate Again",
        finish: "Finish",
        tryAgain: "Try Again"
    },
    settings: {
        title: "Settings",
        language: "Language",
        defaultQuestions: "Default Questions",
        trueFalseQuestions: "True/False Questions",
        typeAnswerQuestions: "Type answer Questions",
        timeLimit: "Time Limit of Question",
        minutes: "Minutes",
        seconds: "Seconds",
        difficulty: {
            easy: "Easy",
            medium: "Medium",
            hard: "Hard"
        }
    },
    quiz: {
        title: "Quiz",
        question: "Question",
        results: "Quiz Results",
        score: "You got {correct} out of {total} correct!",
        typeAnswer: "Type your answer here...",
        submit: "Submit",
        correct: "✓ Correct!",
        incorrect: "✗ Incorrect. The correct answer was: {answer}"
    },
    categories: {
        title: "Select Category",
        noCategories: "No categories available"
    },
    alerts: {
        answerFirst: "Please answer the current question before generating a new one!",
        noContent: "Could not extract content from the page. Please try again.",
        noQuestions: "No questions could be generated. Please try a different page.",
        serverError: "Could not connect to the server. Please make sure it's running.",
        generateError: "An error occurred while generating questions. Please try again.",
        contentError: "Failed to extract content. Please try again on a different page."
    }
};