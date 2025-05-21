
export class SettingsManager {
    static STORAGE_KEY = "quizSettings"

    static defaultSettings = {
        defaultQuestions: true,
        trueFalseQuestions: false,
        typeAnswerQuestions: false,
        timeLimit: {
            value: 5,
            unit: 'minutes'
        }
    };

    static saveSettings(settings) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
    }

    static getSettings() {
        const settings = localStorage.getItem(this.STORAGE_KEY);
        return settings ? JSON.parse(settings) : this.defaultSettings;
    }

    static updateSettings(key,value) {
        const currentSettings = this.getSettings();
        currentSettings[key] = value;
        this.saveSettings(currentSettings);
    }

    static updateTimeLimit(value,unit) {
        const currentSettings = this.getSettings();
        currentSettings.timeLimit = {value,unit};
        this.saveSettings(currentSettings)
    }
}