import {UIManager} from './uiManager.js';

export class QuizManager {
    static questionCounter = 0;
    static isCurrentQuestionAnswered = false;
    static correctAnswers = 0;
    static answeredQuestions = 0;

    static createQuizUI(questions) {
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
        this.questionCounter = 0;
        this.isCurrentQuestionAnswered = false;
        this.correctAnswers = 0;
        this.answeredQuestions = 0;
        document.getElementById('currentQuestion').textContent = '1';
    }

    static handleGoBack() {
        this.resetQuestionCounter();
    }

}