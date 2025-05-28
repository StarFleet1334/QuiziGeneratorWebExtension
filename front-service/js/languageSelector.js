import {TranslationManager} from './translations.js';
import {SettingsManager} from './settings.js';

export class LanguageSelector {
    constructor() {
        this.flags = {
            en: chrome.runtime.getURL('assets/flags/en.svg'),
            es: chrome.runtime.getURL('assets/flags/es.svg'),
            de: chrome.runtime.getURL('assets/flags/de.svg'),
            fr: chrome.runtime.getURL('assets/flags/fr.svg'),
            zh: chrome.runtime.getURL('assets/flags/zh.svg'),
            hi: chrome.runtime.getURL('assets/flags/hi.svg'),
            ar: chrome.runtime.getURL('assets/flags/ar.svg'),
            pt: chrome.runtime.getURL('assets/flags/pt.svg'),
            ru: chrome.runtime.getURL('assets/flags/ru.svg'),
            ja: chrome.runtime.getURL('assets/flags/ja.svg'),
            ko: chrome.runtime.getURL('assets/flags/ko.svg'),
            it: chrome.runtime.getURL('assets/flags/it.svg'),
            nl: chrome.runtime.getURL('assets/flags/nl.svg'),
            tr: chrome.runtime.getURL('assets/flags/tr.svg')
        };
        this.container = this.createLanguageSelector();
    }

    createLanguageSelector() {
        const container = document.createElement('div');
        container.className = 'custom-language-selector';

        const selectedLanguage = document.createElement('div');
        selectedLanguage.className = 'selected-language';

        const dropdownContent = document.createElement('div');
        dropdownContent.className = 'dropdown-content';

        const languages = [
            {code: 'en', name: 'English', flag: this.flags.en},
            {code: 'es', name: 'Español', flag: this.flags.es},
            {code: 'de', name: 'Deutsch', flag: this.flags.de},
            {code: 'fr', name: 'Français', flag: this.flags.fr},
            {code: 'zh', name: '中文', flag: this.flags.zh},
            {code: 'hi', name: 'हिन्दी', flag: this.flags.hi},
            {code: 'ar', name: 'العربية', flag: this.flags.ar},
            {code: 'pt', name: 'Português', flag: this.flags.pt},
            {code: 'ru', name: 'Русский', flag: this.flags.ru},
            {code: 'ja', name: '日本語', flag: this.flags.ja},
            {code: 'ko', name: '한국어', flag: this.flags.ko},
            {code: 'it', name: 'Italiano', flag: this.flags.it},
            {code: 'nl', name: 'Nederlands', flag: this.flags.nl},
            {code: 'tr', name: 'Türkçe', flag: this.flags.tr}

        ];


        const settings = SettingsManager.getSettings();
        const currentLang = settings.language || 'en';

        languages.forEach(lang => {
            const langOption = document.createElement('div');
            langOption.className = 'language-option';
            langOption.dataset.value = lang.code;

            const flag = document.createElement('img');
            flag.src = lang.flag;
            flag.alt = `${lang.name} flag`;
            flag.className = 'flag-icon';

            const name = document.createElement('span');
            name.textContent = lang.name;

            langOption.appendChild(flag);
            langOption.appendChild(name);

            if (lang.code === currentLang) {
                selectedLanguage.innerHTML = langOption.innerHTML;
            }

            langOption.addEventListener('click', () => {
                selectedLanguage.innerHTML = langOption.innerHTML;
                SettingsManager.updateSettings('language', lang.code);
                TranslationManager.setLanguage(lang.code);
                dropdownContent.classList.remove('show');
            });

            dropdownContent.appendChild(langOption);
        });

        selectedLanguage.addEventListener('click', () => {
            dropdownContent.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                dropdownContent.classList.remove('show');
            }
        });

        container.appendChild(selectedLanguage);
        container.appendChild(dropdownContent);

        return container;
    }

    getElement() {
        return this.container;
    }
}