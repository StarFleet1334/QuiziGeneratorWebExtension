import {UIManager} from './uiManager.js';
import {Timer} from './timer.js';
import {SettingsManager} from "./settings.js";

export class QuizManager {
    static questionCounter = 0;
    static isCurrentQuestionAnswered = false;
    static correctAnswers = 0;
    static answeredQuestions = 0;
    static timer = null;
    static timerDisplay = null;
    static currentTimerValue = null;


    static initializeTimer() {
        let remainingSeconds = null;
        if (this.timer) {
            remainingSeconds = this.timer.remainingSeconds;
            this.timer.stop();
            this.timer = null;
        }

        if (this.timerDisplay) {
            this.timerDisplay.remove();
            this.timerDisplay = null;
        }

        this.timerDisplay = document.createElement('div');
        this.timerDisplay.className = 'quiz-timer';
        document.body.appendChild(this.timerDisplay);

        const settings = SettingsManager.getSettings();
        if (!settings || !settings.timeLimit) {
            console.error("Time limit settings not found");
            return;
        }

        const { minutes, seconds } = settings.timeLimit;

        // Initialize timer with the minutes and seconds directly
        this.timer = new Timer(minutes, seconds, remainingSeconds);

        this.updateTimerDisplay(this.timer.getTimeRemaining());

        this.timer.start(
            (timeRemaining) => {
                this.updateTimerDisplay(timeRemaining);
            },
            () => {
                this.handleTimeUp();
            }
        );


    }

    static updateTimerDisplay(timeRemaining) {
        if (!this.timerDisplay) return;

        const minutes = String(timeRemaining.minutes).padStart(2, '0');
        const seconds = String(timeRemaining.seconds).padStart(2, '0');
        this.timerDisplay.textContent = `Time: ${minutes}:${seconds}`;
        this.timerDisplay.style.opacity = '1';

        if (timeRemaining.total < 60) {
            this.timerDisplay.classList.add('warning');
        }
    }


    static handleTimeUp() {
        this.showResults();
        document.querySelectorAll('.answer-option').forEach(option => {
            option.style.pointerEvents = 'none';
        });
        const elements = UIManager.getElements();
        UIManager.switchView(elements.secondView, elements.resultsView);
    }



    static createQuizUI(questions) {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }
        if (this.timerDisplay) {
            this.timerDisplay.remove();
            this.timerDisplay = null;
        }

        this.initializeTimer();

        const {quizContainer} = UIManager.getElements();
        quizContainer.innerHTML = '';

        this.questionCounter++;
        this.isCurrentQuestionAnswered = false;

        document.getElementById('currentQuestion').textContent = this.questionCounter;


        questions.forEach((question, index) => {
            const questionDiv = this.createQuestionElement(question, index + 1);
            quizContainer.appendChild(questionDiv);
        });
    }

    static createQuestionElement(question, index) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.dataset.correctAnswer = question.correct_answer;
        questionDiv.dataset.questionNumber = index;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.getElementById('currentQuestion').textContent = questionDiv.dataset.questionNumber;
                }
            });
        }, {threshold: 0.5});


        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.textContent = `${question.question}`;
        questionDiv.appendChild(questionText);

        Object.entries(question.choices).forEach(([choiceKey, choiceText]) => {
            const label = this.createChoiceElement(choiceKey, choiceText, index, questionDiv);
            questionDiv.appendChild(label);
        });

        return questionDiv;
    }

    static createChoiceElement(choiceKey, choiceText, index, questionDiv) {
        const label = document.createElement('label');
        label.className = 'answer-option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `question${index}`;
        radio.value = choiceKey;

        label.appendChild(radio);
        label.appendChild(document.createTextNode(`${choiceKey}. ${choiceText}`));
        this.addChoiceClickHandler(label, choiceKey, questionDiv);

        return label;
    }

    static addChoiceClickHandler(label, choiceKey, questionDiv) {
        label.addEventListener('click', () => {
            const allOptions = questionDiv.querySelectorAll('.answer-option');
            this.handleAnswerSelection(allOptions, label, choiceKey, questionDiv);
        });
    }

    static handleAnswerSelection(allOptions, selectedLabel, choiceKey, questionDiv) {
        if (questionDiv.dataset.answered === 'true') {
            return;
        }

        allOptions.forEach(opt => opt.classList.remove('correct', 'incorrect'));

        const correctAnswer = questionDiv.dataset.correctAnswer;
        const correctLabel = questionDiv.querySelector(
            `.answer-option input[value="${correctAnswer}"]`
        ).parentElement;

        if (choiceKey === correctAnswer) {
            selectedLabel.classList.add('correct');
            this.correctAnswers++;
            console.log(`Correct answer! Total correct: ${this.correctAnswers}`);
        } else {
            selectedLabel.classList.add('incorrect');
            correctLabel.classList.add('correct');
        }
        this.isCurrentQuestionAnswered = true;
        questionDiv.dataset.answered = 'true';
        this.answeredQuestions++;
        allOptions.forEach(opt => opt.style.pointerEvents = 'none');
    }

    static showResults() {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }
        if (this.timerDisplay) {
            this.timerDisplay.remove();
            this.timerDisplay = null;
        }

        const correctAnswersElement = document.getElementById('correctAnswers');
        const totalQuestionsElement = document.getElementById('totalQuestions');

        if (correctAnswersElement && totalQuestionsElement) {
            correctAnswersElement.textContent = this.correctAnswers;
            totalQuestionsElement.textContent = this.answeredQuestions;
        }

        console.log(`Quiz Results - Correct: ${this.correctAnswers}, Total: ${this.answeredQuestions}`);

        return {
            correct: this.correctAnswers,
            total: this.answeredQuestions
        };
    }



    static resetQuestionCounter() {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }
        if (this.timerDisplay) {
            this.timerDisplay.remove();
            this.timerDisplay = null;
        }

        this.questionCounter = 0;
        this.isCurrentQuestionAnswered = false;
        this.correctAnswers = 0;
        this.answeredQuestions = 0;
        this.currentTimerValue = null;
        document.getElementById('currentQuestion').textContent = '1';
    }

    static handleGoBack() {
        this.resetQuestionCounter();
    }

}