import { UIManager } from './uiManager.js';
import { QuizManager } from './quizManager.js';
import { CategoryManager } from './categoryManager.js';
import { APIService } from './apiService.js';
import { ThemeManager } from './themeManager.js';
import {SettingsManager} from "./settings.js";
import { SettingsViewController } from './settingsViewController.js';


document.addEventListener('DOMContentLoaded', () => {
    const elements = UIManager.getElements();

    const defaultQuestionsToggle = document.getElementById('defaultQuestionsToggle');
    const trueFalseQuestionsToggle = document.getElementById('trueFalseToggle');
    const typeAnswerQuestionsToggle = document.getElementById("typeAnswerToggle");
    const settingsButton = document.getElementById('settingsButton');
    const minutesInput = document.getElementById('minutesInput');
    const secondsInput = document.getElementById('secondsInput');


    const savedSettings = SettingsManager.getSettings();
    defaultQuestionsToggle.checked = savedSettings.defaultQuestions;
    trueFalseQuestionsToggle.checked = savedSettings.trueFalseQuestions;
    typeAnswerQuestionsToggle.checked = savedSettings.typeAnswerQuestions;
    minutesInput.value = savedSettings.timeLimit.minutes;
    secondsInput.value = savedSettings.timeLimit.seconds;


    const themeManager = new ThemeManager();

    minutesInput.addEventListener('input', (e) => {
        const value = Math.min(Math.max(parseInt(e.target.value) || 1, 1), 10);
        minutesInput.value = value;
        SettingsManager.updateTimeLimit(value, secondsInput.value);
    });

    secondsInput.addEventListener('input', (e) => {
        const value = Math.min(Math.max(parseInt(e.target.value) || 60, 60), 600);
        secondsInput.value = value;
        SettingsManager.updateTimeLimit(minutesInput.value, value);
    });


    async function generateQuiz() {
        try {
            if (!QuizManager.isCurrentQuestionAnswered && QuizManager.questionCounter > 0) {
                UIManager.showCustomAlert("Please answer the current question before generating a new one!");
                return;
            }

            const content = await APIService.getTabContent();
            if (!content) {
                UIManager.showCustomAlert("Could not extract content from the page. Please try again.");
                return;
            }

            try {
                const questions = await APIService.fetchFromServer('content', content);
                if (!questions || questions.length === 0) {
                    UIManager.showCustomAlert("No questions could be generated. Please try a different page.");
                    return;
                }
                UIManager.switchView(elements.initialView, elements.secondView);
                QuizManager.createQuizUI(questions);
            } catch (error) {
                if (error.message.includes('Server connection failed')) {
                    UIManager.showCustomAlert("Could not connect to the server. Please make sure it's running.");
                } else {
                    UIManager.showCustomAlert("An error occurred while generating questions. Please try again.");
                }
                console.error("[Active Reading Quiz] Error:", error);
            }
        } catch (error) {
            console.error("[Active Reading Quiz] Error:", error);
            UIManager.showCustomAlert("Failed to extract content. Please try again on a different page.");
        }
    }


    async function generateCategories() {
        try {
            UIManager.switchView(elements.initialView, elements.categoryView);
            UIManager.showLoadingState();

            const content = await APIService.getTabContent();
            if (content) {
                const categoryMap = await APIService.fetchFromServer('category', content);
                CategoryManager.displayCategories(categoryMap);
            }
        } catch (error) {
            console.error("[Active Reading Quiz] Error:", error);
            UIManager.showError(elements.categoriesContainer, 'Failed to load categories');
        }
    }

    document.getElementById('getUrlButton').addEventListener('click', generateQuiz);
    document.getElementById('chooseCategoryButton').addEventListener('click', generateCategories);
    document.getElementById('generateAgainButton').addEventListener('click', generateQuiz);
    document.getElementById('categoryBackButton').addEventListener('click', () =>{
        QuizManager.resetQuestionCounter();
        UIManager.switchView(elements.categoryView, elements.initialView);
    });
    document.getElementById('goBackButton').addEventListener('click', () => {
        QuizManager.showResults();
        UIManager.switchView(elements.secondView, elements.resultsView);
    });
    document.getElementById('retryButton').addEventListener('click', () => {
        QuizManager.resetQuestionCounter();
        UIManager.switchView(elements.resultsView, elements.initialView);
    });
    document.getElementById("settingsButton").addEventListener("click", () => {
        UIManager.switchView(elements.initialView, elements.settingsView);
    })
    document.getElementById("settingsBackButton").addEventListener("click",() => {
        UIManager.switchView(elements.settingsView, elements.initialView);
    })

    settingsButton.addEventListener('click', () => {
        document.getElementById('initialView').style.display = 'none';
        document.getElementById('settingsView').style.display = 'block';
        SettingsViewController.initialize();
    });



});