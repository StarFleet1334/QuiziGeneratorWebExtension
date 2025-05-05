import { UIManager } from './uiManager.js';
import { QuizManager } from './quizManager.js';
import { CategoryManager } from './categoryManager.js';
import { APIService } from './apiService.js';

document.addEventListener('DOMContentLoaded', () => {
    const elements = UIManager.getElements();

    async function generateQuiz() {
        try {
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
    document.getElementById('categoryBackButton').addEventListener('click', () =>
        UIManager.switchView(elements.categoryView, elements.initialView));
    document.getElementById('goBackButton').addEventListener('click', () =>
        UIManager.switchView(elements.secondView, elements.initialView));
});