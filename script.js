const pages = {
    home: `
        <div class="card span-2">
            <span class="badge">The Problem</span>
            <h2>Why Recycling is Failing in STL</h2>
            <p>St. Louis currently faces a "Single-Stream Crisis." Because residents put everything in one bin, glass shards often contaminate paper, and plastic bags tangle sorting machines. This project aims to educate Metro High students on <strong>Wish-cycling</strong>—the act of putting non-recyclable items in the bin hoping they'll be recycled.</p>
        </div>
        <div class="card">
            <h3>Pro Tip: The Tap Test</h3>
            <p>If a plastic item is crinkly or soft (like a grocery bag), it CANNOT go in the blue bin. Take it to Schnucks or Target instead!</p>
        </div>
        <div class="card">
            <h3>Metro HS Impact</h3>
            <p>Our school produces roughly 200lbs of paper waste weekly. Proper sorting could save 10 trees per semester.</p>
        </div>
        <div class="card span-2">
            <h3>Where does it go?</h3>
            <p>Most STL recycling goes to the Republic Services Materials Recovery Facility (MRF). If a load is more than 10% trash, the whole truck is sent to the landfill.</p>
        </div>
    `,
    interviews: `
        <div class="card span-3">
            <h2>Voices from the Field</h2>
            <div style="border-left: 4px solid #39FF14; padding-left: 20px; margin: 20px 0;">
                <p><em>"The biggest issue is the 'tanglers.' Garden hoses and Christmas lights shut down our plant three times a day."</em></p>
                <strong>- Anonymous Waste Manager, STL</strong>
            </div>
        </div>
    `,
    map: `
        <div class="card span-3">
            <h2>Interactive STL Drop-off Map</h2>
            <p>Find where to take items that don't belong in the blue bin.</p>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10000!2d-90.2!3d38.6!" width="100%" height="300" style="border:0; border-radius:15px; filter: invert(90%);"></iframe>
        </div>
    `,
    about: `
        <div class="card span-3">
            <h2>About This Project</h2>
            <p>This site was developed for a Metro Academic & Classical High School capstone project. By merging environmental science with modern web development, we hope to make sustainability more accessible to our peers.</p>
        </div>
    `
};

// --- ANIMATED COUNTER LOGIC ---
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 50; // Speed of animation

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 30);
        } else {
            counter.innerText = target;
        }
    });
}

function loadPage(pageKey) {
    document.getElementById('content').innerHTML = pages[pageKey];
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closePopup() {
    document.getElementById('custom-popup').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Load
    loadPage('home');
    animateCounters();

    // 2. Nav Clicks
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loadPage(e.target.getAttribute('data-page'));
        });
    });

    // 3. 404 Check
    if (sessionStorage.getItem('showRedirectPopup') === 'true') {
        document.getElementById('custom-popup').style.display = 'flex';
        sessionStorage.removeItem('showRedirectPopup');
    }
});
