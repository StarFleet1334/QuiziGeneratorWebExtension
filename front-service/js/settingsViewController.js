import { SettingsManager } from './settings.js';

export class SettingsViewController {
    static initialize() {
        this.#initializeToggles();
        this.#initializeBackButton();
    }

    static #initializeToggles() {
        const defaultQuestionsToggle = document.getElementById('defaultQuestionsToggle');
        const trueFalseToggle = document.getElementById('trueFalseToggle');
        const typeAnswerToggle = document.getElementById('typeAnswerToggle');

        const settings = SettingsManager.getSettings();
        defaultQuestionsToggle.checked = settings.defaultQuestions;
        trueFalseToggle.checked = settings.trueFalseQuestions;
        typeAnswerToggle.checked = settings.typeAnswerQuestions;

        defaultQuestionsToggle.addEventListener('change', () => {
            const currentSettings = SettingsManager.getSettings();
            currentSettings.defaultQuestions = defaultQuestionsToggle.checked;
            SettingsManager.saveSettings(currentSettings);
        });

        trueFalseToggle.addEventListener('change', () => {
            const currentSettings = SettingsManager.getSettings();
            currentSettings.trueFalseQuestions = trueFalseToggle.checked;
            SettingsManager.saveSettings(currentSettings);
        });

        typeAnswerToggle.addEventListener('change', () => {
            const currentSettings = SettingsManager.getSettings();
            currentSettings.typeAnswerQuestions = typeAnswerToggle.checked;
            SettingsManager.saveSettings(currentSettings);
        });
    }

    static #initializeBackButton() {
        const settingsBackButton = document.getElementById('settingsBackButton');
        settingsBackButton.addEventListener('click', () => {
            document.getElementById('settingsView').style.display = 'none';
            document.getElementById('initialView').style.display = 'block';
        });
    }
}