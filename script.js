document.addEventListener('DOMContentLoaded', () => {

    // ─── Mobile Menu Toggle ───────────────────────────────────────────────
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // ─── Smooth Scrolling ─────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    // ─── Service Tabs ─────────────────────────────────────────────────────
    const tabs = document.querySelectorAll('.svc-tab');
    const serviceDetails = document.querySelectorAll('.service-detail');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show correct service panel
            serviceDetails.forEach(detail => {
                if (detail.id === targetId) {
                    detail.classList.add('active-service');
                    // Scroll to it
                    setTimeout(() => {
                        const offset = 100;
                        const top = detail.getBoundingClientRect().top + window.pageYOffset - offset;
                        window.scrollTo({ top, behavior: 'smooth' });
                    }, 50);
                } else {
                    detail.classList.remove('active-service');
                }
            });
        });
    });

    // ─── Accordion ───────────────────────────────────────────────────────
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            const isActive = header.classList.contains('active');

            // Close all
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
                if (h.nextElementSibling) h.nextElementSibling.style.maxHeight = null;
            });

            // Toggle current
            if (!isActive) {
                header.classList.add('active');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });

    // ─── WhatsApp Handler ─────────────────────────────────────────────────
    const whatsappNumber = '5515988136215';

    document.body.addEventListener('click', (e) => {
        const btn = e.target.closest('.whatsapp-btn');
        if (btn) {
            e.preventDefault();
            const message = btn.getAttribute('data-message') || 'Olá! Gostaria de saber mais sobre a Minuto Crédito.';
            const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        }
    });

    // ─── Lead Form → WhatsApp ────────────────────────────────────────────
    const serviceMessages = {
        liminar: 'Olá! Tenho interesse no serviço de Limpeza de Nome via Liminar Judicial. Gostaria de uma análise gratuita.',
        score: 'Olá! Tenho interesse no serviço de Restauração de Score. Gostaria de uma análise gratuita.',
        bacen: 'Olá! Tenho interesse na análise e melhoria do meu Rating Bancário (BACEN/Registrato). Gostaria de uma análise gratuita.',
        google: 'Olá! Quero remover links meus do Google e/ou Jusbrasil. Gostaria de uma análise gratuita.',
        reclame: 'Olá! Preciso remover reclamações abusivas do Reclame Aqui. Gostaria de uma análise gratuita.',
        varios: 'Olá! Tenho interesse em mais de um serviço da Minuto Crédito. Gostaria de uma análise gratuita completa.',
    };

    const form = document.getElementById('leadForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const serviceSelect = document.getElementById('service');
            const serviceKey = serviceSelect ? serviceSelect.value : '';

            if (!name || !phone) {
                alert('Por favor, preencha seu nome e WhatsApp.');
                return;
            }

            const baseMessage = serviceMessages[serviceKey] || 'Olá! Gostaria de uma análise gratuita.';
            const message = `${baseMessage}\n\n*Nome:* ${name}\n*Telefone:* ${phone}`;
            const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        });
    }

    // ─── Scroll Reveal (simple intersection observer) ─────────────────────
    const revealEls = document.querySelectorAll('.service-detail.active-service .process-inline-step, .legal-card, .stat-card, .testimonial-card');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.legal-card, .stat-card, .testimonial-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
});
