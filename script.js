/**
 * Global JavaScript for Recycle St. Louis
 */

window.addEventListener('DOMContentLoaded', async () => {
    // 1. Fetch and Inject Shared HTML (Header/Footer)
    // This handles pages like about.html or map.html that use placeholders
    const headerTarget = document.getElementById('header-placeholder');
    const footerTarget = document.getElementById('footer-placeholder');

    if (headerTarget || footerTarget) {
        try {
            const response = await fetch('./shared.html');
            if (!response.ok) throw new Error('Could not find shared.html');
            
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');

            const headerSource = doc.getElementById('shared-header');
            const footerSource = doc.getElementById('shared-footer');
            
            if (headerSource && headerTarget) {
                headerTarget.innerHTML = headerSource.innerHTML;
            }
            if (footerSource && footerTarget) {
                footerTarget.innerHTML = footerSource.innerHTML;
            }

            // Initialize features after HTML is injected
            initNavigation();
            initPopup();
            
        } catch (err) {
            console.error("Navigation load error:", err);
            // Fallback initialization if fetch fails
            initNavigation();
            initPopup();
        }
    } else {
        // If no placeholders exist (like on the CMS-ready Homepage), init immediately
        initNavigation();
        initPopup();
    }
});

/**
 * Sliding Navigation Bar Logic
 * Works for both #main-nav (Homepage) and standard <nav> (Shared)
 */
function initNavigation() {
    // Use the specific ID for the homepage, or fall back to the generic nav tag
    const nav = document.getElementById('main-nav') || document.querySelector('nav');
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
        link.getAttribute('href') === currentPath || link.getAttribute('href') === "/" + currentPath
    );

    if (!activeLink) activeLink = links[0];

    const updateIndicator = (el) => {
        if (!el) return;
        
        // Mobile Fix: Check if links have wrapped by comparing top offsets
        const firstLink = links[0];
        const lastLink = links[links.length - 1];
        const isWrapped = firstLink.offsetTop !== lastLink.offsetTop;

        if (isWrapped) {
            indicator.style.opacity = '0';
            links.forEach(l => l.style.color = 'var(--text-dim)');
            if (el) el.style.color = 'var(--text)';
            return;
        }

        indicator.style.opacity = '1';
        indicator.style.width = `${el.offsetWidth}px`;
        indicator.style.left = `${el.offsetLeft}px`;
        indicator.style.top = `${el.offsetTop + el.offsetHeight}px`;
        
        links.forEach(l => l.style.color = 'var(--text-dim)');
        el.style.color = 'var(--text)';
    };

    // Initial position with slight delay to ensure layout is ready
    setTimeout(() => updateIndicator(activeLink), 200);

    links.forEach(link => {
        link.addEventListener('mouseenter', () => updateIndicator(link));
        link.addEventListener('mouseleave', () => updateIndicator(activeLink));
    });

    window.addEventListener('resize', () => updateIndicator(activeLink));
}

/**
 * Popup Notification Controls
 */
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

/**
 * Persuasive Site Sharing Logic
 */
window.shareCurrentPage = async () => {
    const shareData = {
        title: 'Recycle St. Louis',
        text: '0 curbside pickups. 14 drop-off sites. 100% our responsibility. Help Metro High students educate STL! ♻️',
        url: 'https://stl.planet-recycling.pl/' 
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            copyToClipboard(shareData.text + " " + shareData.url);
        }
    } catch (err) {
        console.log("Share interaction cancelled");
    }
};

/**
 * Helper: Copy to Clipboard with UI feedback
 */
function copyToClipboard(content) {
    const el = document.createElement('textarea');
    el.value = content;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    
    const msg = document.createElement('div');
    msg.style = "position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:var(--accent); color:white; padding:15px 25px; border-radius:10px; font-weight:bold; z-index:9999; box-shadow: 0 4px 12px rgba(0,0,0,0.3);";
    msg.innerText = "Link copied! Paste it on social media to spread the word.";
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
}
