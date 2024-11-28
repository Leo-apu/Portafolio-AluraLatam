document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const observerOptions = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    const form = document.getElementById('contactForm');
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const mensaje = document.getElementById('mensaje');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            Swal.fire({
                title: "Formulario Enviado Correctamente",
                text: "Gracias por contactarnos, te responderemos a la brevedad.",
                icon: "success",
                backdrop: true,
                color: "#ffffff",
                background: "#5DADE2",
              });
            form.reset();
        }
    });

    function validateForm() {
        let isValid = true;

        if (!nombre.value.trim()) {
            setErrorFor(nombre, 'El nombre no puede estar vacío');
            isValid = false;
        } else {
            setSuccessFor(nombre);
        }

        if (!email.value.trim()) {
            setErrorFor(email, 'El email no puede estar vacío');
            isValid = false;
        } else if (!isValidEmail(email.value.trim())) {
            setErrorFor(email, 'El email no es válido');
            isValid = false;
        } else {
            setSuccessFor(email);
        }

        if (!mensaje.value.trim()) {
            setErrorFor(mensaje, 'El mensaje no puede estar vacío');
            isValid = false;
        } else {
            setSuccessFor(mensaje);
        }

        return isValid;
    }

    function setErrorFor(input, message) {
        const formControl = input.parentElement;
        const errorMessage = formControl.querySelector('.error-message') || document.createElement('small');
        errorMessage.className = 'error-message';
        errorMessage.innerText = message;
        formControl.appendChild(errorMessage);
        formControl.className = 'campo-grupo error';
    }

    function setSuccessFor(input) {
        const formControl = input.parentElement;
        const errorMessage = formControl.querySelector('.error-message');
        if (errorMessage) {
            formControl.removeChild(errorMessage);
        }
        formControl.className = 'campo-grupo success';
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    const navToggle = document.querySelector('.navegacion__toggle');
    const navMenu = document.querySelector('.navegacion');
    const navList = document.querySelector('.navegacion__lista');

    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navMenu.classList.toggle('active');
        navList.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', !isExpanded);
    });

    navList.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navMenu.classList.remove('active');
            navList.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    const header = document.querySelector('.cabecera');
    const main = document.querySelector('main');

    function adjustMainPadding() {
        const headerHeight = header.offsetHeight;
        main.style.paddingTop = `${headerHeight}px`;
    }

    window.addEventListener('load', adjustMainPadding);
    window.addEventListener('resize', adjustMainPadding);

    const darkModeToggle = document.getElementById('darkModeToggle');
    const iconSun = document.getElementById('icon-sun');
    const iconMoon = document.getElementById('icon-moon');

    function setDarkMode(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
            iconSun.style.display = 'block';
            iconMoon.style.display = 'none';
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
            iconSun.style.display = 'none';
            iconMoon.style.display = 'block';
        }
    }

    if (localStorage.getItem('darkMode') === 'enabled') {
        setDarkMode(true);
    }

    darkModeToggle.addEventListener('click', () => {
        setDarkMode(!document.body.classList.contains('dark-mode'));
    });

    const scrollToTopButton = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function handleNavTransparency() {
        if (window.scrollY > 100) {
            header.classList.add('cabecera--transparent');
        } else {
            header.classList.remove('cabecera--transparent');
        }
    }

    window.addEventListener('scroll', handleNavTransparency);
    handleNavTransparency();
});
