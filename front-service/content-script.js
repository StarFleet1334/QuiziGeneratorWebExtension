(function() {
    const scriptId = window.__quizExtensionId || `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    if (!window.__quizExtensionState || window.__quizExtensionState.id !== scriptId) {
        if (window.__quizExtensionState) {
            delete window.__quizExtensionState;
        }

        window.__quizExtensionState = {
            id: scriptId,
            currentUrl: window.location.href,
            initialized: false,
            timestamp: Date.now()
        };

        function initializeContentScript() {
            const state = window.__quizExtensionState;

            if (state.initialized) return;
            state.initialized = true;

            chrome.runtime.onMessage.removeListener(contentMessageHandler);

            chrome.runtime.onMessage.addListener(contentMessageHandler);

            console.log('Content script initialized for:', window.location.href, 'with ID:', scriptId);
        }

        function contentMessageHandler(request, sender, sendResponse) {
            if (request.action === "getContent") {
                try {
                    console.log('Extracting content from:', window.location.href);
                    const documentClone = document.cloneNode(true);
                    const reader = new Readability(documentClone);
                    const article = reader.parse();

                    if (article && article.textContent) {
                        console.log('Content extracted successfully');
                        sendResponse({
                            content: article.textContent,
                            url: window.location.href,
                            timestamp: Date.now(),
                            scriptId: scriptId
                        });
                    } else {
                        console.error('No content extracted');
                        sendResponse({
                            error: 'Failed to extract content',
                            url: window.location.href,
                            scriptId: scriptId
                        });
                    }
                } catch (error) {
                    console.error('Content extraction error:', error);
                    sendResponse({
                        error: 'Error processing content',
                        url: window.location.href,
                        scriptId: scriptId
                    });
                }
                return true;
            }
        }

        initializeContentScript();

        window.addEventListener('beforeunload', () => {
            if (window.__quizExtensionState && window.__quizExtensionState.id === scriptId) {
                delete window.__quizExtensionState;
            }
        }, { once: true });
    }
})();