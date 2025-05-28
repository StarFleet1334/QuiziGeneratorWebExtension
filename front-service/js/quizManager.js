import {UIManager} from './uiManager.js';
import {Timer} from './timer.js';
import {SettingsManager} from "./settings.js";
import {TranslationManager} from "./translations.js";


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
        this.timerDisplay.textContent = `${minutes}:${seconds}`;
        this.timerDisplay.style.opacity = '1';

        if (timeRemaining.total < 60) {
            this.timerDisplay.classList.add('warning');
        }
    }


    static handleTimeUp() {
        this.showResults();
        document.querySelectorAll('.type-answer-input, .type-answer-submit, .answer-option').forEach(element => {
            element.disabled = true;
            if (element.classList.contains('answer-option')) {
                element.style.pointerEvents = 'none';
            }
        });
        const elements = UIManager.getElements();
        UIManager.switchView(elements.secondView, elements.resultsView);
    }




    static createQuizUI(questions) {
        if (!Array.isArray(questions) || questions.length === 0) {
            console.error('No questions provided or invalid questions format');
            return;
        }

        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }
        if (this.timerDisplay) {
            this.timerDisplay.remove();
            this.timerDisplay = null;
        }

        const {quizContainer} = UIManager.getElements();
        if (!quizContainer) {
            console.error('Quiz container not found');
            return;
        }

        quizContainer.innerHTML = '';
        this.isCurrentQuestionAnswered = false;

        const currentQuestionElement = document.getElementById('currentQuestion');
        if (currentQuestionElement) {
            currentQuestionElement.textContent = this.questionCounter;
        }

        const difficultySettings = SettingsManager.getDifficultySettings();
        const timeLimit = SettingsManager.getSettings().timeLimit;

        const totalSeconds = (timeLimit.minutes * 60 + timeLimit.seconds) * difficultySettings.timeMultiplier;
        const adjustedMinutes = Math.floor(totalSeconds / 60);
        const adjustedSeconds = Math.floor(totalSeconds % 60);

        this.timerDisplay = document.createElement('div');
        this.timerDisplay.className = 'quiz-timer';
        document.body.appendChild(this.timerDisplay);

        this.timer = new Timer(adjustedMinutes, adjustedSeconds);
        this.updateTimerDisplay(this.timer.getTimeRemaining());


        this.timer.start(
            (timeRemaining) => {
                this.updateTimerDisplay(timeRemaining);
            },
            () => {
                this.handleTimeUp();
            }
        );

        questions.forEach((question, index) => {
            try {
                if (!question || !question.question) {
                    console.error(`Invalid question format at index ${index}`, question);
                    return;
                }

                const questionDiv = this.createQuestionElement(question, index + 1);
                if (questionDiv) {
                    quizContainer.appendChild(questionDiv);
                }
            } catch (error) {
                console.error(`Error creating question element at index ${index}:`, error);
            }
        });
    }


    static createQuestionElement(question, index) {
        try {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'quiz-question';
            questionDiv.dataset.correctAnswer = question.correct_answer;
            questionDiv.dataset.questionNumber = index;
            questionDiv.dataset.type = question.type || 'multiple_choice';

            const questionText = document.createElement('div');
            questionText.className = 'question-text';
            questionText.textContent = question.question;
            questionDiv.appendChild(questionText);

            new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const currentQuestion = document.getElementById('currentQuestion');
                        if (currentQuestion) {
                        }
                    }
                });
            }, {threshold: 0.5}).observe(questionDiv);

            switch (question.type) {
                case 'type_answer':
                    const typeAnswerContainer = this.createTypeAnswerElement(index, questionDiv);
                    questionDiv.appendChild(typeAnswerContainer);
                    break;
                case 'true_false':
                    ['True', 'False'].forEach(option => {
                        const label = this.createChoiceElement(option, option, index, questionDiv);
                        questionDiv.appendChild(label);
                    });
                    break;
                default:
                    if (Array.isArray(question.choicesList)) {
                        question.choicesList.forEach(choice => {
                            const label = this.createChoiceElement(choice, choice, index, questionDiv);
                            questionDiv.appendChild(label);
                        });
                    } else if (question.choices) {
                        Object.entries(question.choices).forEach(([key, value]) => {
                            const label = this.createChoiceElement(key, value, index, questionDiv);
                            questionDiv.appendChild(label);
                        });
                    }
            }

            return questionDiv;
        } catch (error) {
            console.error('Error in createQuestionElement:', error);
            return null;
        }
    }


    static createTypeAnswerElement(index, questionDiv) {
        const container = document.createElement('div');
        container.className = 'type-answer-container';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'type-answer-input';
        input.name = `question${index}`;
        input.placeholder = 'Type your answer here...';

        const submitButton = document.createElement('button');
        submitButton.className = 'type-answer-submit';
        submitButton.textContent = 'Submit';
        submitButton.addEventListener('click', () => {
            if (!input.value.trim()) return;
            this.handleTypeAnswerSubmission(input, questionDiv);
        });

        container.appendChild(input);
        container.appendChild(submitButton);
        return container;
    }

    static handleTypeAnswerSubmission(input, questionDiv) {
        if (questionDiv.dataset.answered === 'true') {
            return;
        }

        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = questionDiv.dataset.correctAnswer.toLowerCase();

        const resultDisplay = document.createElement('div');
        resultDisplay.className = 'type-answer-result';

        if (userAnswer === correctAnswer) {
            resultDisplay.textContent = '✓ Correct!';
            resultDisplay.classList.add('correct');
            this.correctAnswers++;
        } else {
            resultDisplay.textContent = `✗ Incorrect. The correct answer was: ${questionDiv.dataset.correctAnswer}`;
            resultDisplay.classList.add('incorrect');
        }

        const container = input.parentElement;
        container.appendChild(resultDisplay);


        input.disabled = true;
        const submitButton = container.querySelector('.type-answer-submit');
        if (submitButton) {
            submitButton.disabled = true;
        }

        questionDiv.dataset.answered = 'true';
        this.isCurrentQuestionAnswered = true;
        this.answeredQuestions++;
    }




    static createChoiceElement(choiceKey, choiceText, index, questionDiv) {
        const label = document.createElement('label');
        label.className = 'answer-option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `question${index}`;
        radio.value = choiceKey;

        label.appendChild(radio);
        if (choiceKey === 'True' || choiceKey === 'False') {
            label.appendChild(document.createTextNode(choiceKey));
        } else {
            label.appendChild(document.createTextNode(`${choiceKey}. ${choiceText}`));
        }

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

        if (questionDiv.dataset.type === 'type_answer') {
            return;
        }

        allOptions.forEach(opt => opt.classList.remove('correct', 'incorrect'));

        const correctAnswer = questionDiv.dataset.correctAnswer;
        const correctLabel = Array.from(allOptions).find(option =>
            option.querySelector('input').value === correctAnswer
        );

        if (choiceKey === correctAnswer) {
            selectedLabel.classList.add('correct');
            this.correctAnswers++;
            console.log(`Correct answer! Total correct: ${this.correctAnswers}`);
        } else {
            selectedLabel.classList.add('incorrect');
            if (correctLabel) {
                correctLabel.classList.add('correct');
            }
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

        TranslationManager.updateScore(this.correctAnswers,this.answeredQuestions)

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