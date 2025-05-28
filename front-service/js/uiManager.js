export class UIManager {
    static getElements() {
        return {
            initialView: document.getElementById('initialView'),
            secondView: document.getElementById('secondView'),
            categoryView: document.getElementById('categoryView'),
            resultsView: document.getElementById('resultsView'),
            quizContainer: document.getElementById('quizContainer'),
            categoriesContainer: document.getElementById('categories-container'),
            settingsView: document.getElementById('settingsView')
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

    static showCustomAlert(message) {
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        const alertContainer = document.getElementById('alertContainer');
        const buttonsContainer = document.querySelector('#secondView');
        const buttonsRect = buttonsContainer.getBoundingClientRect();

        const alertDiv = document.createElement('div');
        alertDiv.className = 'custom-alert';

        const messageDiv = document.createElement('div');
        messageDiv.className = 'alert-message';
        messageDiv.textContent = message;

        const closeButton = document.createElement('button');
        closeButton.className = 'alert-close';
        closeButton.textContent = '×';
        closeButton.onclick = () => {
            alertDiv.classList.add('hiding');
            setTimeout(() => alertDiv.remove(), 300);
        };

        alertDiv.appendChild(messageDiv);
        alertDiv.appendChild(closeButton);

        alertContainer.appendChild(alertDiv);

        const topPosition = Math.min(
            buttonsRect.bottom + window.scrollY + 20,
            window.innerHeight - alertDiv.offsetHeight - 20
        );

        alertDiv.style.cssText = `
        position: absolute;
        top: ${topPosition}px;
        left: 50%;
        transform: translateX(-50%);
    `;

        setTimeout(() => {
            if (alertDiv.parentElement) {
                alertDiv.classList.add('hiding');
                setTimeout(() => alertDiv.remove(), 300);
            }
        }, 3000);
    }

}