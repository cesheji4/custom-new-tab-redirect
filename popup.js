const CUSTOM_LINK_KEY = 'customNewTabLink';

document.addEventListener('DOMContentLoaded', () => {
    const linkInput = document.getElementById('linkInput');
    const clearBtn = document.getElementById('clearBtn');
    const saveBtn = document.getElementById('saveBtn');
    const status = document.getElementById('status');

    const updateClearBtn = () => {
        if (clearBtn && linkInput) {
            clearBtn.style.display = linkInput.value ? 'block' : 'none';
        }
    };

    const existingLink = localStorage.getItem(CUSTOM_LINK_KEY);
    if (existingLink) {
        linkInput.value = existingLink;
    }
    updateClearBtn();

    if (linkInput) {
        linkInput.addEventListener('input', updateClearBtn);
        linkInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveBtn.click();
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            linkInput.value = '';
            updateClearBtn();
            linkInput.focus();
        });
    }

    saveBtn.addEventListener('click', () => {
        const link = linkInput.value.trim();

        if (link) {
            let finalLink = link;
            if (!/^https?:\/\//i.test(finalLink)) {
                finalLink = 'https://' + finalLink;
            }

            localStorage.setItem(CUSTOM_LINK_KEY, finalLink);
            linkInput.value = finalLink;
            updateClearBtn();
            status.textContent = 'Saved successfully!';
            status.style.color = 'var(--success-color, #28a745)';
        } else {
            localStorage.removeItem(CUSTOM_LINK_KEY);
            localStorage.removeItem('newTabCount');
            localStorage.removeItem('landingPageSnoozedUntil');
            linkInput.value = '';
            updateClearBtn();
            status.textContent = 'URL cleared! Reset to default.';
            status.style.color = 'var(--success-color, #28a745)';
        }

        status.style.display = 'block';
        setTimeout(() => {
            status.style.display = 'none';
        }, 2000);
    });
});
