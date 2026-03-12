/**
 * Global JavaScript for Recycle STL
 * Handles the sliding navigation indicator and popup logic
 */

window.addEventListener('load', () => {
    initNavigation();
    initPopup();
});

/**
 * Logic for the sliding navigation bar
 */
function initNavigation() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    // Create the indicator element if it doesn't exist
    let indicator = document.getElementById('nav-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'nav-indicator';
        nav.appendChild(indicator);
    }

    const links = nav.querySelectorAll('a');
    
    // Find active link by checking the URL path
    let activeLink = Array.from(links).find(link => 
        window.location.pathname.endsWith(link.getAttribute('href')) ||
        (window.location.pathname === '/' && link.getAttribute('href') === 'index.html')
    );

    // Fallback to the first link (Home) if no match found
    if (!activeLink) activeLink = links[0];

    // Function to move the bar
    function updateIndicator(el) {
        indicator.style.width = `${el.offsetWidth}px`;
        indicator.style.left = `${el.offsetLeft}px`;
        
        // Update active text color
        links.forEach(l => l.style.color = 'var(--text-dim)');
        el.style.color = 'var(--text)';
    }

    // Set initial position with a tiny delay to ensure layout is calculated correctly
    setTimeout(() => updateIndicator(activeLink), 50);

    // Handle window resizing
    window.addEventListener('resize', () => updateIndicator(activeLink));
}

/**
 * Logic for the notification popup
 */
function initPopup() {
    const popup = document.getElementById('popup-notif');
    if (popup) {
        setTimeout(() => {
            popup.style.display = 'block';
        }, 1500);
    }
}

/**
 * Close function called by the 'X' button in HTML
 */
function closePopup() {
    const popup = document.getElementById('popup-notif');
    if (popup) popup.style.display = 'none';
}
