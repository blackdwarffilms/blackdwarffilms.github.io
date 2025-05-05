// Navbar scroll effect
document.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Cookie banner
document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookieBanner');
    const cookiePreferences = document.getElementById('cookiePreferences');
    const acceptAllCookies = document.getElementById('acceptAllCookies');
    const customizeCookies = document.getElementById('customizeCookies');
    const saveCookiePreferences = document.getElementById('saveCookiePreferences');
    const cookieSettings = document.getElementById('cookieSettings');
    const analyticsCookies = document.getElementById('analyticsCookies');
    const marketingCookies = document.getElementById('marketingCookies');

    // Load saved preferences
    const loadPreferences = () => {
        const preferences = JSON.parse(localStorage.getItem('cookiePreferences') || '{}');
        analyticsCookies.checked = preferences.analytics || false;
        marketingCookies.checked = preferences.marketing || false;
    };

    // Save preferences
    const savePreferences = (acceptAll = false) => {
        const preferences = {
            essential: true, // Always required
            analytics: acceptAll ? true : analyticsCookies.checked,
            marketing: acceptAll ? true : marketingCookies.checked
        };
        localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.classList.remove('show');
        cookiePreferences.classList.remove('show');
    };

    // Check if user has already set preferences
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    // Load preferences if they exist
    loadPreferences();

    // Event Listeners
    acceptAllCookies.addEventListener('click', () => {
        savePreferences(true);
    });

    customizeCookies.addEventListener('click', () => {
        cookiePreferences.classList.add('show');
    });

    saveCookiePreferences.addEventListener('click', () => {
        savePreferences(false);
    });

    cookieSettings.addEventListener('click', () => {
        cookieBanner.classList.add('show');
        cookiePreferences.classList.add('show');
        loadPreferences();
    });
});
