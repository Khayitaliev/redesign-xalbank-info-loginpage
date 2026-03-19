

// Translations
const translations = {
    ru: {
        welcome_title: "Войти в вашу <br /> учётную запись",
        welcome_desc: "Avtorizatsiya qilish uchun \"@xb.uz\" belgisini kiritmang.",
        username_placeholder: "Имя пользователя",
        password_placeholder: "Пароль",
        remember_me: "Запомнить меня",
        login_button: "Войти",
        info_title: "Batafsil qo'llanma bilan tanishib chiqing",
        info_sub: "Инструкция по использованию ITSM",
        visual_title: "Avtorizatsiya:",
        visual_subtitle: "Xalq Banki xodimlari uchun maxsus portal.",
        glass_note: "* Eslatma: shablonlardagi matnni xohlaganingizcha o'zgartirishingiz mumkin. Shablon ma'lumotni to'ldirish qulayligi uchun yaratilgan.",
        alert_login: "Кнопка входа нажата: ",
        source_option: "Xalq Bank Head Office"
    },
    uz: {
        welcome_title: "Hisobingizga <br /> kiring",
        welcome_desc: "Avtorizatsiya qilish uchun \"@xb.uz\" belgisini kiritmang.",
        username_placeholder: "Foydalanuvchi nomi",
        password_placeholder: "Parol",
        remember_me: "Meni eslab qol",
        login_button: "Kirish",
        info_title: "Batafsil qo'llanma bilan tanishib chiqing",
        info_sub: "ITSM dan foydalanish bo'yicha ko'rsatma",
        visual_title: "Avtorizatsiya:",
        visual_subtitle: "Xalq Banki xodimlari uchun maxsus portal.",
        glass_note: "* Eslatma: shablonlardagi matnni xohlaganingizcha o'zgartirishingiz mumkin. Shablon ma'lumotni to'ldirish qulayligi uchun yaratilgan.",
        alert_login: "Kirish tugmasi bosildi: ",
        source_option: "Xalq Bank Bosh Ofisi"
    },
    en: {
        welcome_title: "Sign in to <br /> your account",
        welcome_desc: "Do not enter \"@xb.uz\" for authorization.",
        username_placeholder: "Username",
        password_placeholder: "Password",
        remember_me: "Remember me",
        login_button: "Sign In",
        info_title: "Check out the detailed guide",
        info_sub: "Instructions for using ITSM",
        visual_title: "Authorization:",
        visual_subtitle: "Special portal for Xalq Bank employees.",
        glass_note: "* Note: you can change the text in the templates as you wish. The template is created for ease of filling in information.",
        alert_login: "Login button clicked: ",
        source_option: "Xalq Bank Head Office"
    }
};

let currentLang = localStorage.getItem('lang') || 'ru';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

// Language Switcher Event Listeners
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        setLanguage(btn.getAttribute('data-lang'));
    });
});

// Initialize Language
setLanguage(currentLang);

// Form Submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const source = document.getElementById('source').value;
    console.log('Login attempt:', { username, source });
    alert(translations[currentLang].alert_login + username);
});
