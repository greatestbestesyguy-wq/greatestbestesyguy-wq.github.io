/**
 * Global JavaScript for Recycle STL
 * Handles popup notifications and shared site logic
 */

window.addEventListener('load', () => {
    // Select the notification popup element
    const popup = document.getElementById('popup-notif');
    
    // Check if the popup exists on the current page before running logic
    if (popup) {
        // Delay the popup appearing for a better user experience (1.5 seconds)
        setTimeout(() => {
            popup.style.display = 'block';
        }, 1500);
    }
});

/**
 * Closes the global notification popup
 */
function closePopup() {
    const popup = document.getElementById('popup-notif');
    if (popup) {
        popup.style.display = 'none';
    }
}

// Log initialization for debugging purposes
console.log("Recycle STL: Global scripts initialized.");
