/**
 * Global JavaScript for Recycle STL
 */

window.addEventListener('DOMContentLoaded', async () => {
    // 1. Fetch and Inject Shared HTML (Header/Footer)
    try {
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

        // Initialize features after HTML is injected
        initNavigation();
        initPopup();
        
    } catch (err) {
        console.error("Navigation load error:", err);
        // Fallback: try to initialize anyway if elements already exist in static HTML
        initNavigation();
        initPopup();
    }
});

/**
 * Sliding Navigation Bar Logic
 */
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

    // Initial position with slight delay for layout calculation
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
 * Uses the Web Share API with specific advocacy text
 */
window.shareCurrentPage = async () => {
    const shareData = {
        title: 'Recycle St. Louis - Metro High School',
        text: '0 curbside pickups. 14 drop-off sites. 100% our responsibility. Help Metro High students educate STL! ♻️',
        url: 'https://stl.planet-recycling.pl/' 
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log("Share cancelled");
        }
    } else {
        copyToClipboard(shareData.text + " " + shareData.url);
    }
};

/**
 * Social Media Platform Specific Sharing
 */
window.socialShare = (platform) => {
    const text = encodeURIComponent(`0 curbside pickups. 14 drop-off sites. Help Metro High students educate STL! ♻️`);
    const url = encodeURIComponent('https://stl.planet-recycling.pl/');
    let finalUrl = '';

    if (platform === 'tw') finalUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    if (platform === 'wa') finalUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    if (platform === 'fb') finalUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

    if (finalUrl) window.open(finalUrl, '_blank');
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
