'use strict';

lucide.createIcons();

let translations = {};
let currentLang = localStorage.getItem('lang') || 'ru';

document.addEventListener('DOMContentLoaded', () => {

    // JSON yuklash (MUHIM PATH)
    fetch('./js/translation.json')
        .then(res => {
            if (!res.ok) {
                throw new Error('JSON file topilmadi (404)');
            }
            return res.json();
        })
        .then(data => {
            translations = data;

            // initial language apply
            setLanguage(currentLang);

            // events ulash
            initEvents();
        })
        .catch(err => {
            console.error('JSON load error:', err);
        });

});

function initEvents() {

    // language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });

    // form submit
    const form = document.getElementById('loginForm');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = document.getElementById('username')?.value || '';
            const source = document.getElementById('source')?.value || '';

            console.log('Login attempt:', { username, source });

            alert(translations[currentLang].alert_login + username);
        });
    }
}

function setLanguage(lang) {
    if (!translations[lang]) return;

    currentLang = lang;
    localStorage.setItem('lang', lang);

    // text content update
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // placeholder update
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    // active button highlight
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}