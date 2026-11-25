const CUSTOM_LINK_KEY = 'customNewTabLink';

const noLinkContainer = document.getElementById('noLinkContainer');
const homeLinkInput = document.getElementById('homeLinkInput');
const homeClearBtn = document.getElementById('homeClearBtn');
const homeSaveBtn = document.getElementById('homeSaveBtn');
const homeStatus = document.getElementById('homeStatus');

let customLink = localStorage.getItem(CUSTOM_LINK_KEY);

const updateClearBtn = () => {
    if (homeClearBtn && homeLinkInput) {
        homeClearBtn.style.display = homeLinkInput.value ? 'block' : 'none';
    }
};

if (homeLinkInput) {
    homeLinkInput.addEventListener('input', updateClearBtn);
    homeLinkInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && homeSaveBtn) {
            homeSaveBtn.click();
        }
    });
}

if (homeClearBtn) {
    homeClearBtn.addEventListener('click', () => {
        if (homeLinkInput) {
            homeLinkInput.value = '';
            updateClearBtn();
            homeLinkInput.focus();
        }
    });
}

if (homeSaveBtn) {
    homeSaveBtn.addEventListener('click', () => {
        const link = (homeLinkInput ? homeLinkInput.value : '').trim();
        if (link) {
            let finalLink = link;
            if (!/^https?:\/\//i.test(finalLink)) {
                finalLink = 'https://' + finalLink;
            }
            localStorage.setItem(CUSTOM_LINK_KEY, finalLink);
            if (homeLinkInput) {
                homeLinkInput.value = finalLink;
            }
            updateClearBtn();
            if (homeStatus) {
                homeStatus.textContent = 'Saved! Redirecting...';
                homeStatus.style.color = 'var(--success-color, #28a745)';
                homeStatus.style.display = 'block';
            }
            setTimeout(() => {
                window.location.replace(finalLink);
            }, 400);
        } else {
            localStorage.removeItem(CUSTOM_LINK_KEY);
            if (homeLinkInput) {
                homeLinkInput.value = '';
            }
            updateClearBtn();
            if (homeStatus) {
                homeStatus.textContent = 'URL cleared! Reset to default.';
                homeStatus.style.color = 'var(--success-color, #28a745)';
                homeStatus.style.display = 'block';
            }
            setTimeout(() => {
                if (homeStatus) homeStatus.style.display = 'none';
            }, 2500);
        }
    });
}

if (!customLink) {
    if (noLinkContainer) {
        noLinkContainer.style.display = 'block';
    }
    updateClearBtn();
} else {
    window.location.replace(customLink);
}
