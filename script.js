// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Header fixo com efeito de scroll
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Animação de entrada para elementos
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Elementos para animar
document.querySelectorAll('.feature, .product-card, .service-card').forEach(el => {
    observer.observe(el);
});

// Adicionar classe para menu mobile
const menuButton = document.createElement('button');
menuButton.classList.add('menu-button');
menuButton.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('nav').appendChild(menuButton);

menuButton.addEventListener('click', () => {
    document.querySelector('.menu').classList.toggle('active');
});

// Adicionar estilos para menu mobile
const style = document.createElement('style');
style.textContent = `
    .menu-button {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #2c3e50;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        .menu-button {
            display: block;
        }

        .menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #fff;
            padding: 1rem;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .menu.active {
            display: flex;
            flex-direction: column;
        }

        .menu li {
            margin: 1rem 0;
        }
    }

    .animate {
        animation: fadeInUp 0.6s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// MENU HAMBURGUER MOBILE PROFISSIONAL
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.menu-hamburger');
    const mobileMenu = document.querySelector('.nav-menu-mobile');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const menuLinks = document.querySelectorAll('.nav-menu-mobile a');

    // Função para abrir o menu
    function openMenu() {
        hamburger.classList.add('active');
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Função para fechar o menu
    function closeMenu() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            if (mobileMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // Fechar menu ao clicar nos links
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
            // Scroll suave para seção
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            }
        });
    });

    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Fechar menu quando a tela for redimensionada para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });
});

// SLIDESHOW AUTOMÁTICO DO HERO
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    if (slides.length > 0) {
        // Preload das imagens para transições mais suaves
        slides.forEach(slide => {
            const img = new Image();
            const bgImage = slide.style.backgroundImage;
            if (bgImage) {
                img.src = bgImage.slice(5, -2); // Remove url(" e ")
            }
        });
        
        function nextSlide() {
            // Remove active da slide atual
            slides[currentSlide].classList.remove('active');
            
            // Avança para próxima slide
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Adiciona active na nova slide com pequeno delay para transição suave
            setTimeout(() => {
                slides[currentSlide].classList.add('active');
            }, 50);
        }
        
        // Inicia o slideshow automático - 6 segundos para dar tempo das transições
        setInterval(nextSlide, 6000);
        
        // Pausa o slideshow quando a aba não está ativa (performance)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                // Pausar animações seria aqui se necessário
            }
        });
    }
}); 