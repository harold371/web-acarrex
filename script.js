document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Considera el tamaño del header fijo
                const headerOffset = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // -20px para un pequeño margen extra

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle form submission (example: send to WhatsApp)
    const quoteForm = document.querySelector('.quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const tipoMudanza = document.getElementById('tipoMudanza').value;
            const origen = document.getElementById('origen').value;
            const destino = document.getElementById('destino').value;
            const fecha = document.getElementById('fecha').value;
            const volumen = document.getElementById('volumen').value;
            const descripcion = document.getElementById('descripcion').value;

            const whatsappNumber = '573209581095'; // Tu número de WhatsApp con código de país
            let message = `¡Hola! Me gustaría cotizar una mudanza:\n\n`;
            message += `Tipo de Mudanza: ${tipoMudanza}\n`;
            message += `Origen: ${origen}\n`;
            message += `Destino: ${destino}\n`;
            message += `Fecha Preferida: ${fecha}\n`;
            message += `Volumen Estimado: ${volumen} m³\n`;
            message += `Descripción Adicional: ${descripcion || 'No especificada'}\n\n`;
            message += `Por favor, envíame una cotización.`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            window.open(whatsappURL, '_blank');

            // Optionally, clear the form after submission
            quoteForm.reset();
            alert('¡Tu solicitud de cotización ha sido enviada a WhatsApp! Te contactaremos pronto.');
        });
    }

    // Simple Testimonial Slider (if needed, this is very basic)
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let scrollAmount = 0;
        const scrollStep = 370; // Adjust based on testimonial-item width + gap
        const autoScrollInterval = 5000; // 5 seconds

        const autoScroll = () => {
            scrollAmount += scrollStep;
            if (scrollAmount >= testimonialSlider.scrollWidth - testimonialSlider.clientWidth) {
                scrollAmount = 0; // Reset to start if at the end
            }
            testimonialSlider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        };

        // Start auto-scrolling
        setInterval(autoScroll, autoScrollInterval);

        // Optional: Pause on hover
        testimonialSlider.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
        testimonialSlider.addEventListener('mouseleave', () => setInterval(autoScroll, autoScrollInterval));
    }

    // Animation on scroll for sections (basic example)
    const sections = document.querySelectorAll('section:not(.hero-section)');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 1s ease-out forwards';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0'; // Hide initially
        section.style.transform = 'translateY(50px)'; // Prepare for animation
        sectionObserver.observe(section);
    });
});
