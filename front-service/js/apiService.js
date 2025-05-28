import {SettingsManager} from "./settings.js";

export class APIService {
    static async getTabContent() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (!tab) {
                throw new Error('No active tab found');
            }

            console.log('Getting content from tab:', tab.url);

            const maxRetries = 3;
            let retryCount = 0;

            while (retryCount < maxRetries) {
                try {
                    const content = await new Promise((resolve, reject) => {
                        const timeout = setTimeout(() => {
                            reject(new Error('Content extraction timed out'));
                        }, 5000);

                        chrome.tabs.sendMessage(
                            tab.id,
                            {
                                action: "getContent",
                                timestamp: Date.now()
                            },
                            response => {
                                clearTimeout(timeout);
                                if (chrome.runtime.lastError) {
                                    reject(chrome.runtime.lastError);
                                    return;
                                }
                                if (!response || !response.content) {
                                    reject(new Error('No content received'));
                                    return;
                                }
                                if (response.url !== tab.url) {
                                    reject(new Error(`URL mismatch: Expected ${tab.url}, got ${response.url}`));
                                    return;
                                }
                                console.log('Content received from:', response.url);
                                resolve(response.content);
                            }
                        );
                    });

                    return content;
                } catch (error) {
                    console.error('Attempt failed:', error);
                    retryCount++;
                    if (retryCount === maxRetries) {
                        throw error;
                    }
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
        } catch (error) {
            console.error('Error getting tab content:', error);
            throw error;
        }
    }


    static async fetchFromServer(endpoint, content) {
        try {
            console.log('Sending request to server...');
            const settings = SettingsManager.getSettings();
            const url = `http://localhost:8080/api/${endpoint}`;

            console.log('Request URL:', url);
            console.log('Content length:', content?.length);

            const LANGUAGE_MAP = {
                en: "English",
                es: "Spanish",
                de: "German",
                fr: "French",
                zh: "Chinese",
                hi: "Hindi",
                ar: "Arabic",
                pt: "Portuguese",
                ru: "Russian",
                ja: "Japanese",
                ko: "Korean",
                it: "Italian",
                nl: "Dutch",
                tr: "Turkish"
            };

            const language = LANGUAGE_MAP[settings.language] || "English";
            console.log('Language sent:', language);
            const requestBody = {
                text: content,
                trueFalseQuestions: settings.trueFalseQuestions,
                typeAnswerQuestions: settings.typeAnswerQuestions,
                language: language,
            };


            console.log('Request body:', requestBody);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server error:', response.status, errorText);
                throw new Error(`Server returned ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log('Server response received:', data);
            return data;
        } catch (error) {
            console.error('Server request failed:', error);
            if (error.message.includes('Failed to fetch')) {
                throw new Error('Server connection failed. Make sure the server is running at http://localhost:8080');
            }
            throw error;
        }
    }

}