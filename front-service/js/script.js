import { UIManager } from './uiManager.js';
import { QuizManager } from './quizManager.js';
import { CategoryManager } from './categoryManager.js';
import { APIService } from './apiService.js';
import { ThemeManager } from './themeManager.js';
import {SettingsManager} from "./settings.js";


document.addEventListener('DOMContentLoaded', () => {
    const elements = UIManager.getElements();

    const defaultQuestionsToggle = document.getElementById('defaultQuestionsToggle');
    const trueFalseQuestionsToggle = document.getElementById('trueFalseToggle');
    const typeAnswerQuestionsToggle = document.getElementById("typeAnswerToggle");
    const timeInput = document.getElementById('timeInput');
    const timeUnitButtons = document.querySelectorAll('.time-unit-btn')

    const savedSettings = SettingsManager.getSettings();
    defaultQuestionsToggle.checked = savedSettings.defaultQuestions;
    trueFalseQuestionsToggle.checked = savedSettings.trueFalseQuestions;
    typeAnswerQuestionsToggle.checked = savedSettings.typeAnswerQuestions;

    const themeManager = new ThemeManager();

    timeInput.value = savedSettings.timeLimit.value;
    timeUnitButtons.forEach(btn => {
        if (btn.dataset.unit === savedSettings.timeLimit.unit) {
            btn.classList.add('active');
        }
    });

    async function generateQuiz() {
        try {
            if (!QuizManager.isCurrentQuestionAnswered && QuizManager.questionCounter > 0) {
                UIManager.showCustomAlert("Please answer the current question before generating a new one!");
                return;
            }


            const content = await APIService.getTabContent();
            if (content) {
                const questions = await APIService.fetchFromServer('content', content);
                UIManager.switchView(elements.initialView, elements.secondView);
                QuizManager.createQuizUI(questions);
            }
        } catch (error) {
            console.error("[Active Reading Quiz] Error:", error);
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

    timeInput.addEventListener('change', (e) => {
        const value = Math.min(Math.max(parseInt(e.target.value) || 1, 1), 60);
        timeInput.value = value;
        const activeUnit = document.querySelector('.time-unit-btn.active').dataset.unit;
        SettingsManager.updateTimeLimit(value, activeUnit);
    });


    timeUnitButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            timeUnitButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            SettingsManager.updateTimeLimit(
                parseInt(timeInput.value),
                btn.dataset.unit
            );
        });
    });


});