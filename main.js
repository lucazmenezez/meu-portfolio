document.addEventListener('DOMContentLoaded', function() {
    AOS.init();

    // MENU HAMBURGUER
    const menuToggle = document.getElementById('menu-toggle');
    const headerButtons = document.getElementById('header-buttons');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');

    menuToggle.addEventListener('click', function() {
        headerButtons.classList.toggle('active-menu');
        menuToggle.classList.toggle('active');
    });

    // CÓDIGO DO SUBMENU
    const submenuToggles = document.querySelectorAll('.has-submenu i');

    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(event) {
            const parent = this.parentElement;
            parent.classList.toggle('open'); // Abre/fecha o submenu ao clicar na seta
        });
    });

    // PROGRAMAÇÃO DO LINK ATIVO DO HEADER AO ROLAR A PAGINA.
    function setActiveLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 1 && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        if (!current) {
            current = 'home';
        }

        navLinks.forEach(a => {
            a.classList.remove('active-link');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active-link');
            }
        });
    }

    setActiveLink();

    window.addEventListener('scroll', setActiveLink);
    // TERMINO

    // AO ROLAR A PAGINA O HEADER FICA COM COR DE FUNDO
    window.addEventListener("scroll", function() {
        const header = document.querySelector("header");
        header.classList.toggle('rolagem', window.scrollY > 0);
    });

    // ANIMAÇÃO DE DIGITAÇÃO COM LIBRARY TYPED.JS
    const options = {
        strings: ["Desenvolvedor Web", "e Freelancer."],
        typeSpeed: 70,
        backSpeed: 50,
        loop: true,
        backDelay: 2000,
        startDelay: 500,
        showCursor: true,
        cursorChar: "|",
        autoInsertCss: true
    };

    new Typed(".second-text", options);

     // seção FAQ, accordion
    const questions = document.querySelectorAll('[data-faq-question]');

    for (let i = 0; i < questions.length; i++) {
        questions[i].addEventListener('click', abreOuFechaResposta)
    }

    function abreOuFechaResposta(elemento) {
        const classe = 'faq__questions__item--is-open';
        const elementoPai = elemento.target.parentNode;
        elementoPai.classList.toggle(classe);
    }

    // formulário para e-mail
    
})