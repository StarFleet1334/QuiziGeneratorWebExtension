import { UIManager } from './uiManager.js';

export class QuizManager {
    static createQuizUI(questions) {
        const { quizContainer } = UIManager.getElements();
        quizContainer.innerHTML = '';

        questions.forEach((question, index) => {
            const questionDiv = this.createQuestionElement(question, index);
            quizContainer.appendChild(questionDiv);
        });
    }

    static createQuestionElement(question, index) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.dataset.correctAnswer = question.correct_answer;

        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.textContent = `${index + 1}. ${question.question}`;
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
        allOptions.forEach(opt => opt.classList.remove('correct', 'incorrect'));

        const correctAnswer = questionDiv.dataset.correctAnswer;
        const correctLabel = questionDiv.querySelector(
            `.answer-option input[value="${correctAnswer}"]`
        ).parentElement;

        if (choiceKey === correctAnswer) {
            selectedLabel.classList.add('correct');
        } else {
            selectedLabel.classList.add('incorrect');
            correctLabel.classList.add('correct');
        }

        allOptions.forEach(opt => opt.style.pointerEvents = 'none');
    }
}