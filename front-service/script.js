document.addEventListener('DOMContentLoaded', () => {
    const initialView = document.getElementById('initialView');
    const secondView = document.getElementById('secondView');
    const quizContainer = document.getElementById('quizContainer');
    const urlDisplay = document.getElementById('urlDisplay');

    function createQuizUI(questions) {
        quizContainer.innerHTML = ''; // Clear previous quiz

        questions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'quiz-question';

            const questionText = document.createElement('div');
            questionText.className = 'question-text';
            questionText.textContent = `${index + 1}. ${question.question}`;

            questionDiv.appendChild(questionText);

            questionDiv.dataset.correctAnswer = question.correct_answer;

            Object.entries(question.choices).forEach(([choiceKey, choiceText]) => {
                const label = document.createElement('label');
                label.className = 'answer-option';

                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = `question${index}`;
                radio.value = choiceKey;

                label.appendChild(radio);
                label.appendChild(document.createTextNode(`${choiceKey}. ${choiceText}`));

                label.addEventListener('click', (e) => {
                    const allOptions = questionDiv.querySelectorAll('.answer-option');
                    allOptions.forEach(opt => {
                        opt.classList.remove('correct', 'incorrect');
                    });

                    const correctAnswer = questionDiv.dataset.correctAnswer;

                    const correctLabel = questionDiv.querySelector(
                        `.answer-option input[value="${correctAnswer}"]`
                    ).parentElement;

                    if (choiceKey === correctAnswer) {
                        label.classList.add('correct');
                    } else {
                        label.classList.add('incorrect');
                        correctLabel.classList.add('correct');
                    }

                    allOptions.forEach(opt => {
                        opt.style.pointerEvents = 'none';
                    });
                });

                questionDiv.appendChild(label);
            });

            quizContainer.appendChild(questionDiv);
        });
    }

    async function generateQuiz() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            chrome.tabs.sendMessage(tab.id, { action: "getContent" }, async (response) => {
                if (chrome.runtime.lastError) {
                    console.error("[Active Reading Quiz] Error:", chrome.runtime.lastError.message);
                    urlDisplay.textContent = "Error getting content.";
                    return;
                }

                if (response && response.content) {
                    console.log("[Active Reading Quiz] Received Clean Content:", response.content);
                    urlDisplay.textContent = "Sending content to server...";

                    try {
                        const serverResponse = await fetch('http://localhost:8080/api/content', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                content: response.content
                            })
                        });

                        if (serverResponse.ok) {
                            const questions = await serverResponse.json();
                            console.log("[Active Reading Quiz] Server Response:", questions);

                            initialView.style.display = 'none';
                            secondView.style.display = 'block';

                            createQuizUI(questions);

                        } else {
                            urlDisplay.textContent = "Failed to send content. Server error.";
                            console.error("[Active Reading Quiz] Server returned error:", serverResponse.status);
                        }
                    } catch (serverError) {
                        urlDisplay.textContent = "Error sending to server: " + serverError.message;
                        console.error("[Active Reading Quiz] Server communication error:", serverError);
                    }

                } else {
                    urlDisplay.textContent = "No clean content extracted.";
                }
            });
        } catch (error) {
            console.error("[Active Reading Quiz] Popup Error:", error);
            urlDisplay.textContent = "Popup Error: " + error.message;
        }
    }

    document.getElementById('getUrlButton').addEventListener('click', generateQuiz);

    document.getElementById('generateAgainButton').addEventListener('click', generateQuiz);

    document.getElementById('goBackButton').addEventListener('click', () => {
        secondView.style.display = 'none';
        initialView.style.display = 'block';
        urlDisplay.textContent = '';
    });
});