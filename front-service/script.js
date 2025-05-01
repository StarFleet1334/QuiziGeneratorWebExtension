document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('getUrlButton').addEventListener('click', async () => {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            chrome.tabs.sendMessage(tab.id, { action: "getContent" }, async (response) => {
                if (chrome.runtime.lastError) {
                    console.error("[Active Reading Quiz] Error:", chrome.runtime.lastError.message);
                    document.getElementById('urlDisplay').textContent = "Error getting content.";
                    return;
                }

                if (response && response.content) {
                    console.log("[Active Reading Quiz] Received Clean Content:", response.content);

                    const urlDisplay = document.getElementById('urlDisplay');
                    urlDisplay.textContent = "Sending content to server...";

                    try {
                        const serverResponse = await fetch('http://localhost:8080/api/content', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                content: response.content
                            })
                        });

                        if (serverResponse.ok) {
                            const result = await serverResponse.text();
                            urlDisplay.textContent = "Content sent successfully!";
                            console.log("[Active Reading Quiz] Server Response:", result);
                        } else {
                            urlDisplay.textContent = "Failed to send content. Server error.";
                            console.error("[Active Reading Quiz] Server returned error:", serverResponse.status);
                        }
                    } catch (serverError) {
                        urlDisplay.textContent = "Error sending to server: " + serverError.message;
                        console.error("[Active Reading Quiz] Server communication error:", serverError);
                    }

                } else {
                    document.getElementById('urlDisplay').textContent = "No clean content extracted.";
                }
            });
        } catch (error) {
            console.error("[Active Reading Quiz] Popup Error:", error);
            document.getElementById('urlDisplay').textContent = "Popup Error: " + error.message;
        }
    });
});
