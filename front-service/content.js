(function() {
    try {
        const documentClone = document.cloneNode(true);
        const reader = new Readability(documentClone).parse();

        if (reader && reader.textContent) {
            console.log("[Active Reading Quiz] Extracted Content:", reader.textContent);

            chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
                if (request.action === "getContent") {
                    sendResponse({ content: reader.textContent });
                }
            });
        } else {
            console.log("[Active Reading Quiz] No readable content found.");
        }
    } catch (error) {
        console.error("[Active Reading Quiz] Error running Readability:", error);
    }
})();
