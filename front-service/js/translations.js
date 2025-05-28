import translations from "./translations/index.js";

export class TranslationManager {
    static currentLanguage = 'en';

    static setLanguage(lang) {
        if (translations[lang]) {
            this.currentLanguage = lang;
            document.documentElement.lang = lang;
            this.updatePageTranslations();
        } else {
            console.warn(`Language ${lang} not supported. Falling back to English.`);
            this.currentLanguage = 'en';
        }
    }

    static getText(key, replacements = {}) {
        const keys = key.split('.');
        let value = translations[this.currentLanguage];

        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                console.warn(`Translation missing for key: ${key} in language: ${this.currentLanguage}`);
                return key;
            }
        }

        if (typeof value === 'string') {
            Object.entries(replacements).forEach(([key, val]) => {
                value = value.replace(`{${key}}`, val);
            });
        }

        return value;
    }

    static updatePageTranslations() {
        try {
            document.title = this.getText('title');

            document.querySelectorAll('h2').forEach(h2 => {
                if (h2.closest('#initialView')) h2.textContent = this.getText('title');
                if (h2.closest('#settingsView')) h2.textContent = this.getText('settings.title');
                if (h2.closest('#categoryView')) h2.textContent = this.getText('categories.title');
                if (h2.closest('#secondView')) h2.textContent = this.getText('quiz.title');
                if (h2.closest('#resultsView')) h2.textContent = this.getText('quiz.results');
            });

            const buttons = {
                'getUrlButton': 'buttons.startQuiz',
                'chooseCategoryButton': 'buttons.chooseCategory',
                'settingsButton': 'buttons.settings',
                'categoryBackButton': 'buttons.goBack',
                'generateAgainButton': 'buttons.generateAgain',
                'goBackButton': 'buttons.finish',
                'retryButton': 'buttons.tryAgain',
                'settingsBackButton': 'buttons.goBack'
            };

            Object.entries(buttons).forEach(([id, key]) => {
                const element = document.getElementById(id);
                if (element) element.textContent = this.getText(key);
            });

            document.querySelectorAll('.switch-label').forEach(label => {
                const settingType = label.getAttribute('data-setting-type');
                if (settingType) {
                    label.textContent = this.getText(`settings.${settingType}`);
                }
            });

            document.querySelectorAll('.time-field label').forEach(label => {
                const isMinutes = label.closest('.time-field').querySelector('#minutesInput');
                if (isMinutes) {
                    label.textContent = this.getText('settings.minutes') + ':';
                } else {
                    label.textContent = this.getText('settings.seconds') + ':';
                }
            });

            document.querySelectorAll('.difficulty-btn').forEach(btn => {
                const difficulty = btn.dataset.difficulty;
                if (difficulty) {
                    btn.textContent = this.getText(`settings.difficulty.${difficulty}`);
                }
            });

            const currentQuestion = document.getElementById('currentQuestion');
            if (currentQuestion) {
                const questionCounter = currentQuestion.closest('.question-counter');
                if (questionCounter) {
                    questionCounter.firstChild.textContent = this.getText('quiz.question') + ' ';
                }
            }
        } catch (error) {
            console.error('Error updating translations:', error);
        }
    }

    static updateScore(correctAnswers,totalQuestions) {
        const scoreText = document.querySelector('.score-text');
        if (scoreText) {
            scoreText.textContent = this.getText('quiz.score', {
                correct: correctAnswers,
                total: totalQuestions
            });
            console.log("Score updated: ", correctAnswers, totalQuestions, " - ", scoreText.textContent);
        }
    }
}