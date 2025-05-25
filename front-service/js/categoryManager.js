import {APIService} from "./apiService.js";
import {UIManager} from "./uiManager.js";
import {QuizManager} from "./quizManager.js";

export class CategoryManager {
    static displayCategories(categoryMap) {
        const categoriesContainer = document.getElementById('categories-container');
        categoriesContainer.innerHTML = '';

        if (categoryMap && Object.keys(categoryMap).length > 0) {
            const ul = this.createCategoryList(categoryMap);
            categoriesContainer.appendChild(ul);
        } else {
            this.showNoCategories(categoriesContainer);
        }
    }

    static createCategoryList(categoryMap) {
        const ul = document.createElement('ul');
        ul.className = 'categories-list';

        Object.entries(categoryMap).forEach(([category, relatedContent], index) => {
            const li = this.createCategoryItem(category, relatedContent, index);
            ul.appendChild(li);
        });

        return ul;
    }

    static createCategoryItem(category, relatedContent, index) {
        const li = document.createElement('li');
        li.className = 'category-item';
        li.setAttribute('data-category-index', index);
        li.setAttribute('data-category', category);

        const button = document.createElement('button');
        button.className = 'category-button';
        button.textContent = category;
        button.setAttribute('data-category-index', index);
        button.setAttribute('data-category', category);

        button.dataset.content = JSON.stringify(relatedContent);

        button.onclick = (event) => {
            event.stopPropagation();
            this.handleCategorySelect(category, relatedContent);
        };

        li.appendChild(button);
        return li;
    }

    static async handleCategorySelect(category, relatedContent) {
        const elements = UIManager.getElements();
        try {
            const freshContent = await APIService.getTabContent();
            if (!freshContent) {
                throw new Error('Failed to get fresh content from current page');
            }
            console.log('Using fresh content from current page:', window.location.href);

            const questions = await APIService.fetchFromServer('content', freshContent);
            UIManager.switchView(elements.categoryView, elements.secondView);
            QuizManager.createQuizUI(questions);
        } catch (error) {
            console.error("[Active Reading Quiz] Error:", error);
            UIManager.showError(elements.quizContainer, "Failed to generate questions. Please try again.");
        }
    }


    static showNoCategories(container) {
        const message = document.createElement('p');
        message.className = 'no-categories';
        message.textContent = 'No categories available';
        container.appendChild(message);
    }
}