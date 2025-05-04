export class APIService {
    static async getTabContent() {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        return new Promise((resolve, reject) => {
            chrome.tabs.sendMessage(tab.id, { action: "getContent" }, (response) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                    return;
                }
                resolve(response?.content);
            });
        });
    }

    static async fetchFromServer(endpoint, content) {
        const response = await fetch(`http://localhost:8080/api/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });

        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }

        return response.json();
    }
}