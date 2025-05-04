export class UIManager {
    static getElements() {
        return {
            initialView: document.getElementById('initialView'),
            secondView: document.getElementById('secondView'),
            categoryView: document.getElementById('categoryView'),
            quizContainer: document.getElementById('quizContainer'),
            categoriesContainer: document.getElementById('categories-container')
        };
    }

    static showLoadingState() {
        const { categoriesContainer } = this.getElements();
        categoriesContainer.innerHTML = `
            <div class="loading-spinner"></div>
            <div class="loading-text">Loading categories...</div>
        `;
    }

    static switchView(hideView, showView) {
        hideView.style.display = 'none';
        showView.style.display = 'block';
    }

    static showError(container, message) {
        container.innerHTML = `
            <div class="error-message">
                ${message}
            </div>
        `;
    }
}