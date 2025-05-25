const injectedTabs = new Map();

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && !tab.url.startsWith('chrome://')) {
        const currentInjection = injectedTabs.get(tabId);

        if (!currentInjection || currentInjection.url !== tab.url) {
            if (currentInjection) {
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    func: () => {
                        if (window.__quizExtensionState) {
                            delete window.__quizExtensionState;
                        }
                        chrome.runtime.onMessage.removeListener();
                    }
                }).catch(err => console.error('Cleanup error:', err));
            }

            const scriptId = `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            chrome.scripting.executeScript({
                target: { tabId: tabId },
                func: (injectionId) => {
                    window.__quizExtensionId = injectionId;
                },
                args: [scriptId]
            }).then(() => {
                return chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ['libs/Readability.js', 'content-script.js']
                });
            }).then(() => {
                injectedTabs.set(tabId, { url: tab.url, scriptId: scriptId });
                console.log('Scripts reinjected for tab:', tabId, 'URL:', tab.url);
            }).catch(err => {
                console.error('Script injection error:', err);
            });
        }
    }
});