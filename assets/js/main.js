/**
 * Julian's Raw Paws - Core Interactivity JS
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Theme Switcher (Dark / Light Mode)
    // ----------------------------------------------------
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
    updateThemeButtonTexts();

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeButtonTexts();
        });
    });

    function updateThemeButtonTexts() {
        const isDark = document.body.classList.contains('dark-theme');
        themeToggleBtns.forEach(btn => {
            btn.innerHTML = isDark ? '<i class="bi bi-sun-fill" aria-hidden="true"></i>' : '<i class="bi bi-moon-stars-fill" aria-hidden="true"></i>';
        });
    }

    // ----------------------------------------------------
    // 2. RTL / LTR Layout Toggle
    // ----------------------------------------------------
    const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
    
    // Check local storage for layout direction
    const savedDirection = localStorage.getItem('direction') || 'ltr';
    document.documentElement.setAttribute('dir', savedDirection);
    updateRTLButtonTexts();

    rtlToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('direction', newDir);
            updateRTLButtonTexts();
        });
    });

    function updateRTLButtonTexts() {
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        rtlToggleBtns.forEach(btn => {
            btn.textContent = currentDir === 'ltr' ? 'RTL' : 'LTR';
        });
    }

    // ----------------------------------------------------
    // 3. Navigation Menu Active Highlighting
    // ----------------------------------------------------
    const currentPath = window.location.pathname;
    const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    
    const navLinks = document.querySelectorAll('.nav-link-custom');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === pageName || (pageName === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ----------------------------------------------------
    // 4. Back-to-Top Button
    // ----------------------------------------------------
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ----------------------------------------------------
    // 5. Password Visibility Toggle (Eye Icon)
    // ----------------------------------------------------
    const passwordFields = document.querySelectorAll('.password-field-wrapper');
    passwordFields.forEach(wrapper => {
        const input = wrapper.querySelector('input');
        const eyeIcon = wrapper.querySelector('.password-toggle-eye');
        if (input && eyeIcon) {
            eyeIcon.addEventListener('click', () => {
                const isPassword = input.getAttribute('type') === 'password';
                input.setAttribute('type', isPassword ? 'text' : 'password');
                eyeIcon.classList.toggle('bi-eye');
                eyeIcon.classList.toggle('bi-eye-slash');
            });
        }
    });

    // ----------------------------------------------------
    // 6. Form Validations (Standard Bootstrap Style)
    // ----------------------------------------------------
    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                // If it is valid, show a success modal/message instead of refreshing (if it is a demo submit)
                event.preventDefault();
                const successMsg = document.createElement('div');
                successMsg.className = 'alert alert-success mt-3';
                successMsg.textContent = 'Form submitted successfully! (Demo Mode)';
                form.appendChild(successMsg);
                setTimeout(() => successMsg.remove(), 4000);
                form.reset();
                form.classList.remove('was-validated');
                return;
            }
            form.classList.add('was-validated');
        }, false);
    });
});
