document.addEventListener('DOMContentLoaded', function () {
    // Elementos DOM
    const sections = document.querySelectorAll('section');
    const navDots = document.querySelectorAll('.nav-dot');
    const header = document.querySelector('header');
    const showMoreBtn = document.getElementById('showMoreBtn');
    const hiddenSteps = document.querySelector('.hidden-steps');
    const scrollTopBtn = document.getElementById('scrollTop');
    const newsletterForm = document.getElementById('newsletterForm');
    const terminosBtn = document.querySelector('.terminos-btn');
    const terminosModal = document.getElementById('terminosModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const soundToggle = document.getElementById('soundToggle');
    const soundOn = soundToggle.querySelector('.sound-on');
    const soundOff = soundToggle.querySelector('.sound-off');

    // Control de audio
    let isMusicPlaying = false;
    soundToggle.addEventListener('click', function () {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            soundOn.style.display = 'none';
            soundOff.style.display = 'block';
        } else {
            backgroundMusic.play();
            soundOn.style.display = 'block';
            soundOff.style.display = 'none';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // Función de debounce para optimizar el scroll
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Función para actualizar dot activo con animación
    function updateActiveSection() {
        let current = '';
        const scrollPosition = window.pageYOffset + (window.innerHeight / 3);

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
            const sectionHeight = section.getBoundingClientRect().height;

            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                current = section.getAttribute('id');
            }
        });

        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === current) {
                dot.classList.add('active');
                // Solo agregar animación si no está ya animado
                if (!dot.classList.contains('animate__pulse')) {
                    dot.classList.add('animate__animated', 'animate__pulse');
                    setTimeout(() => {
                        dot.classList.remove('animate__animated', 'animate__pulse');
                    }, 1000);
                }
            }
        });
    }

    // Event Listeners con debounce
    window.addEventListener('scroll', debounce(function () {
        updateActiveSection();

        // Header background
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll to top button
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    }, 50));

    // Optimizar el resize
    window.addEventListener('resize', debounce(function () {
        updateActiveSection();
    }, 150));

    // Navegación suave con animaciones
    navDots.forEach(dot => {
        dot.addEventListener('click', function () {
            const targetSection = this.getAttribute('data-section');
            const targetElement = document.getElementById(targetSection);

            if (targetElement) {
                // Animar el dot al hacer clic
                this.classList.add('animate__animated', 'animate__pulse');
                setTimeout(() => {
                    this.classList.remove('animate__animated', 'animate__pulse');
                }, 1000);

                // Scroll suave a la sección
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });

                // Activar animaciones de la sección
                targetElement.classList.add('animate__animated', 'animate__fadeIn');
            }
        });
    });

    // Botón Ver más pasos
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function () {
            const isExpanded = hiddenSteps.style.display === 'block';

            // Primero animamos la salida del contenido actual
            this.classList.remove('animate__animated', 'animate__fadeIn');
            void this.offsetWidth; // Forzar reflow

            if (!isExpanded) {
                // Mostrar más pasos
                hiddenSteps.style.display = 'block';
                this.textContent = 'Ver menos pasos';

                // Animar los nuevos pasos
                const newSteps = hiddenSteps.querySelectorAll('.proceso-step');
                newSteps.forEach((step, index) => {
                    step.classList.remove('animate__animated', 'animate__fadeIn');
                    void step.offsetWidth; // Forzar reflow
                    step.classList.add('animate__animated', 'animate__fadeIn');
                    step.style.animationDelay = `${0.2 * (index + 1)}s`;
                });
            } else {
                // Ocultar pasos
                hiddenSteps.style.display = 'none';
                this.textContent = 'Ver más pasos...';
            }

            // Animar el botón
            this.classList.add('animate__animated', 'animate__fadeIn');
        });
    }

    // Scroll to top
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Newsletter form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            this.style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
        });
    }

    // Modal de términos
    if (terminosBtn) {
        terminosBtn.addEventListener('click', function (e) {
            e.preventDefault();
            terminosModal.style.display = 'flex';
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function () {
            terminosModal.style.display = 'none';
        });
    }

    // Click en Ver receta
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function (e) {
            e.preventDefault();
            const ingredientesSection = document.getElementById('ingredientes');
            if (ingredientesSection) {
                window.scrollTo({
                    top: ingredientesSection.offsetTop,
                    behavior: 'smooth'
                });
                ingredientesSection.classList.add('animate__animated', 'animate__fadeIn');
            }
        });
    }

    // Intersection Observer para animaciones
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            const element = entry.target;
            const animation = element.dataset.animate;
            const delay = element.dataset.delay || '';

            if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
                // Solo animar si el elemento tiene una animación definida
                if (animation) {
                    // Remover las clases antes de añadirlas de nuevo
                    element.classList.remove('animate__animated', animation);
                    // Forzar un reflow para asegurar que la animación se reinicie
                    void element.offsetWidth;

                    // Aplicar la animación
                    element.classList.add('animate__animated', animation);
                    if (delay) {
                        element.style.animationDelay = delay;
                    }
                }
            } else if (!entry.isIntersecting) {
                // Solo remover las clases cuando el elemento está completamente fuera
                if (animation) {
                    element.classList.remove('animate__animated', animation);
                    element.style.animationDelay = '';
                }
            }
        });
    };

    const observerOptions = {
        threshold: 0.1, // Solo un threshold bajo para detectar cuando entra/sale
        rootMargin: '-50px 0px' // Un pequeño margen para evitar activaciones prematuras
    };

    const observer = new IntersectionObserver(animateOnScroll, observerOptions);

    // Observar elementos con animaciones
    document.querySelectorAll('[data-animate]').forEach(element => {
        element.classList.remove('animate__animated', element.dataset.animate);
        observer.observe(element);
    });

    // Inicialización
    scrollTopBtn.style.display = 'none';
    updateActiveSection();

    // Función para manejar la aparición de patrones decorativos
    function handlePatronesScroll() {
        const patrones = document.querySelectorAll('.patron-decorativo');

        patrones.forEach(patron => {
            const rect = patron.parentElement.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.8) && (rect.bottom >= 0);

            if (isVisible) {
                patron.classList.add('visible');
                patron.style.transform = 'translate(0)';
            } else {
                patron.classList.remove('visible');
                // Restaurar la posición inicial según el tipo de patrón
                if (patron.classList.contains('patron-circulo')) {
                    patron.style.transform = 'translateX(50px)';
                } else if (patron.classList.contains('patron-zigzag')) {
                    patron.style.transform = 'rotate(-15deg) translateX(-50px)';
                } else if (patron.classList.contains('patron-puntos')) {
                    patron.style.transform = 'translateY(50px)';
                }
            }
        });
    }

    // Escuchar el evento de scroll
    window.addEventListener('scroll', handlePatronesScroll);

    // Llamar a la función una vez al cargar la página
    document.addEventListener('DOMContentLoaded', handlePatronesScroll);
}); 