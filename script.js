/**
 * PISHKO QENTI — Interactive Script
 * Animations, mobile nav, menu tabs, WhatsApp form
 */

(function() {
  'use strict';

  // ==========================================
  // HEADER SCROLL EFFECT
  // ==========================================
  const header = document.getElementById('header');
  let lastScroll = 0;

  function handleHeaderScroll() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  // ==========================================
  // HERO IMAGE LOAD ANIMATION
  // ==========================================
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('load', function() {
      setTimeout(function() {
        hero.classList.add('loaded');
      }, 100);
    });
  }

  // ==========================================
  // INTERSECTION OBSERVER — SCROLL ANIMATIONS
  // ==========================================
  const animElements = document.querySelectorAll('.anim-fade-up');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animElements.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    animElements.forEach(function(el) {
      el.classList.add('visible');
    });
  }

  // ==========================================
  // MOBILE NAV TOGGLE
  // ==========================================
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (burgerBtn && mobileNav) {
    burgerBtn.addEventListener('click', function() {
      burgerBtn.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    const mobileLinks = mobileNav.querySelectorAll('.mobile-nav__link');
    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        burgerBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ==========================================
  // MENU TABS
  // ==========================================
  const menuTabs = document.querySelectorAll('.menu__tab');
  const menuCategories = document.querySelectorAll('.menu__category');

  menuTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');

      // Update active tab
      menuTabs.forEach(function(t) {
        t.classList.remove('menu__tab--active');
      });
      this.classList.add('menu__tab--active');

      // Update active category
      menuCategories.forEach(function(cat) {
        cat.classList.remove('menu__category--active');
      });

      var targetCategory = document.getElementById('tab-' + targetTab);
      if (targetCategory) {
        targetCategory.classList.add('menu__category--active');
      }
    });
  });

  // ==========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        var headerHeight = header.offsetHeight || 0;
        var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // WHATSAPP FORM SUBMISSION
  // ==========================================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      var name = document.getElementById('formName').value.trim();
      var phone = document.getElementById('formPhone').value.trim();
      var date = document.getElementById('formDate').value;
      var time = document.getElementById('formTime').value;
      var guests = document.getElementById('formGuests').value;
      var message = document.getElementById('formMessage').value.trim();

      if (!name || !phone || !date || !time || !guests) {
        alert('Por favor completá todos los campos obligatorios.');
        return;
      }

      // Format date nicely
      var dateObj = new Date(date + 'T12:00:00');
      var months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      var formattedDate = dateObj.getDate() + ' de ' + months[dateObj.getMonth()] + ' de ' + dateObj.getFullYear();

      var whatsappMessage = '¡Hola! Quiero hacer una reserva en PISHKO QENTI\n\n';
      whatsappMessage += '👤 Nombre: ' + name + '\n';
      whatsappMessage += '📱 Teléfono: ' + phone + '\n';
      whatsappMessage += '📅 Fecha: ' + formattedDate + '\n';
      whatsappMessage += '🕐 Horario: ' + time + '\n';
      whatsappMessage += '👥 Personas: ' + guests + '\n';

      if (message) {
        whatsappMessage += '💬 Mensaje: ' + message + '\n';
      }

      whatsappMessage += '\n¡Gracias!';

      var encodedMessage = encodeURIComponent(whatsappMessage);
      var whatsappUrl = 'https://wa.me/5491155655290?text=' + encodedMessage;

      window.open(whatsappUrl, '_blank', 'noopener');
    });
  }

  // ==========================================
  // SET MIN DATE FOR RESERVATION
  // ==========================================
  const dateInput = document.getElementById('formDate');
  if (dateInput) {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var dd = String(today.getDate()).padStart(2, '0');
    dateInput.setAttribute('min', yyyy + '-' + mm + '-' + dd);
  }

  // ==========================================
  // COUNTER ANIMATION FOR RATING
  // ==========================================
  function animateCounter(element, target, duration) {
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var current = (progress * target).toFixed(1);
      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = target.toFixed(1);
      }
    }

    requestAnimationFrame(step);
  }

  // Observe rating elements
  var ratingScores = document.querySelectorAll('.testimonials__rating-score, .hero__rating-score');
  if ('IntersectionObserver' in window && ratingScores.length > 0) {
    var ratingObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target, 4.6, 1200);
          ratingObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    ratingScores.forEach(function(el) {
      ratingObserver.observe(el);
    });
  }

  // ==========================================
  // GALLERY LIGHTBOX EFFECT (optional hover)
  // ==========================================
  const galleryItems = document.querySelectorAll('.gallery__item');
  galleryItems.forEach(function(item) {
    item.style.cursor = 'pointer';
  });

  // ==========================================
  // PARALLAX ON HERO (subtle)
  // ==========================================
  var heroBgImg = document.querySelector('.hero__bg-img');
  if (heroBgImg && window.innerWidth > 768) {
    window.addEventListener('scroll', function() {
      var scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        heroBgImg.style.transform = 'scale(1.05) translateY(' + (scrolled * 0.15) + 'px)';
      }
    }, { passive: true });
  }

})();
