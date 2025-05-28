
export class SettingsManager {
    static STORAGE_KEY = "quizSettings"

    static defaultSettings = {
        defaultQuestions: true,
        trueFalseQuestions: false,
        typeAnswerQuestions: false,
        language: 'en',
        timeLimit: {
            minutes: 5,
            seconds: 60
        },
        difficulty: 'easy'
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

    static updateTimeLimit(minutes, seconds) {
        const currentSettings = this.getSettings();
        currentSettings.timeLimit = {
            minutes: parseInt(minutes),
            seconds: parseInt(seconds)
        };
        this.saveSettings(currentSettings);
    }

    static getDifficultySettings() {
        const difficulty = this.getSettings().difficulty;
        switch(difficulty) {
            case 'easy':
                return {
                    timeMultiplier: 1.5,
                    questionComplexity: 'basic'
                };
            case 'hard':
                return {
                    timeMultiplier: 0.7,
                    questionComplexity: 'complex'
                };
            default:
                return {
                    timeMultiplier: 1,
                    questionComplexity: 'standard'
                };
        }
    }


    static getDefaultSettings() {
        return {
            defaultQuestions: true,
            trueFalseQuestions: false,
            typeAnswerQuestions: false,
            timeLimit: {
                minutes: 5,
                seconds: 0
            }
        };
    }


}