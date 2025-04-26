document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('getUrlButton').addEventListener('click', async () => {
        try {
            // Query for the active tab in the current window
            const tabs = await chrome.tabs.query({
                active: true,
                currentWindow: true
            });

            const tab = tabs[0];
            const urlDisplay = document.getElementById('urlDisplay');

            if (tab && tab.url) {
                console.log("Current URL:", tab.url);
                urlDisplay.textContent = tab.url;
                urlDisplay.style.color = 'black';
            } else {
                console.log("No URL found - Tab:", tab);
                urlDisplay.textContent = "Could not access URL";
                urlDisplay.style.color = 'red';
            }

        } catch (error) {
            console.error("Error:", error);
            const urlDisplay = document.getElementById('urlDisplay');
            urlDisplay.textContent = "Error: " + error.message;
            urlDisplay.style.color = 'red';
        }
    });
});