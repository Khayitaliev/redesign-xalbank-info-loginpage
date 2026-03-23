'use strict';

lucide.createIcons();

let translations = {};
let currentLang = localStorage.getItem('lang') || 'ru';

document.addEventListener('DOMContentLoaded', () => {
    fetch('./js/translation.json')
        .then(res => {
            if (!res.ok) {
                throw new Error('JSON file topilmadi (404)');
            }
            return res.json();
        })
        .then(data => {
            translations = data;
            setLanguage(currentLang);
            initEvents();
        })
        .catch(err => {
            console.error('JSON load error:', err);
        });

});

function initEvents() {


    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });


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


    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });


    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });


    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}