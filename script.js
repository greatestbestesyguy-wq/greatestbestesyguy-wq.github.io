/**
 * Global JavaScript for Recycle STL
 */

window.addEventListener('DOMContentLoaded', async () => {
    // 1. Fetch and Inject Shared HTML
    try {
        // Using a relative path works on GitHub Pages and Local Servers
        const response = await fetch('./shared.html');
        if (!response.ok) throw new Error('Could not find shared.html');
        
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        const headerSource = doc.getElementById('shared-header');
        const footerSource = doc.getElementById('shared-footer');
        
        const headerTarget = document.getElementById('header-placeholder');
        const footerTarget = document.getElementById('footer-placeholder');

        if (headerSource && headerTarget) {
            headerTarget.innerHTML = headerSource.innerHTML;
        }
        if (footerSource && footerTarget) {
            footerTarget.innerHTML = footerSource.innerHTML;
        }

        // 2. Initialize Navigation logic AFTER injection is successful
        initNavigation();
        initPopup();
        
    } catch (err) {
        console.error("Navigation load error:", err);
        // If fetch fails (like opening locally), we try to init anyway in case the HTML is hardcoded
        initNavigation();
        initPopup();
    }
});

function initNavigation() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    let indicator = document.getElementById('nav-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'nav-indicator';
        nav.appendChild(indicator);
    }

    const links = nav.querySelectorAll('a');
    let currentPath = window.location.pathname.split("/").pop();
    if (currentPath === "" || currentPath === "/") currentPath = "index.html";

    let activeLink = Array.from(links).find(link => 
        link.getAttribute('href') === currentPath
    );

    if (!activeLink) activeLink = links[0];

    const updateIndicator = (el) => {
        indicator.style.width = `${el.offsetWidth}px`;
        indicator.style.left = `${el.offsetLeft}px`;
        links.forEach(l => l.style.color = 'var(--text-dim)');
        el.style.color = 'var(--text)';
    };

    // Ensure layout is calculated
    setTimeout(() => updateIndicator(activeLink), 200);

    links.forEach(link => {
        link.addEventListener('mouseenter', () => updateIndicator(link));
        link.addEventListener('mouseleave', () => updateIndicator(activeLink));
    });

    window.addEventListener('resize', () => updateIndicator(activeLink));
}

function initPopup() {
    const popup = document.getElementById('popup-notif');
    if (popup) {
        setTimeout(() => {
            popup.style.display = 'block';
        }, 1500);
    }
}

function closePopup() {
    const popup = document.getElementById('popup-notif');
    if (popup) popup.style.display = 'none';
}
