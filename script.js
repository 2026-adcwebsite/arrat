// ===== Image Error Fallback =====
// Replace broken images with a clean placeholder so they don't blow up the layout
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.background = 'linear-gradient(135deg, #ede6d7 0%, #d4c8b0 100%)';
    this.style.minHeight = '200px';
    this.alt = '';
    // Hide the broken image icon
    this.style.color = 'transparent';
  });
});

// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('is-open');
    // Lock body scroll when menu is open
    if (navMenu.classList.contains('is-open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
}

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ===== Gallery Filter =====
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterButtons.length > 0) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

// ===== Lightbox =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

if (lightbox) {
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const overlaySpan = item.querySelector('.gallery-item-overlay span');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        if (lightboxCaption && overlaySpan) {
          lightboxCaption.textContent = overlaySpan.textContent;
        }
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

function closeLightbox() {
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    const isActive = faqItem.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
    });

    if (!isActive) {
      faqItem.classList.add('active');
    }
  });
});

// ===== Reservation Form -> WhatsApp =====
const reservationForm = document.getElementById('reservationForm');
const WHATSAPP_NUMBER = '355691234567';

if (reservationForm) {
  reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(reservationForm);
    const name = formData.get('name') || '';
    const phone = formData.get('phone') || '';
    const date = formData.get('date') || '';
    const time = formData.get('time') || '';
    const people = formData.get('people') || '';
    const occasion = formData.get('occasion') || '';
    const message = formData.get('message') || '';

    let msg = `Përshëndetje Agroturizëm Arrat!\n\n`;
    msg += `Dëshiroj të bëj një rezervim:\n\n`;
    msg += `Emri: ${name}\n`;
    msg += `Telefoni: ${phone}\n`;
    msg += `Data: ${date}\n`;
    msg += `Ora: ${time}\n`;
    msg += `Numri i personave: ${people}\n`;

    if (occasion && occasion !== '') {
      msg += `Rasti: ${occasion}\n`;
    }

    if (message && message.trim() !== '') {
      msg += `\nKërkesa shtesë:\n${message}\n`;
    }

    msg += `\nFaleminderit!`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  });
}

// ===== Set Min Date on Reservation Form =====
const dateInput = document.querySelector('input[name="date"]');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

// ===== Animate Stats Counter =====
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
        const text = stat.textContent;
        const match = text.match(/[\d,]+/);
        if (match) {
          const target = parseInt(match[0].replace(/,/g, ''));
          const suffix = text.replace(match[0], '');
          let current = 0;
          const duration = 1500;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = Math.ceil(target / steps);
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            stat.textContent = current.toLocaleString() + suffix;
          }, stepTime);
        }
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.about-stats').forEach(el => {
  statsObserver.observe(el);
});

// ===== Current Year =====
const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});
