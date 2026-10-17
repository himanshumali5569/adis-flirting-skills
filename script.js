// ========================================================
// Adi's Flirting Skills - Interactive Script
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Side Vertical Navigation Bar Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const navBackdrop = document.getElementById('navBackdrop');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-item');
  const navbar = document.querySelector('.navbar-wrapper');

  const openDrawer = () => {
    mobileMenuBtn?.classList.add('open');
    navLinks?.classList.add('open');
    navBackdrop?.classList.add('open');
    document.body.style.overflow = 'hidden'; // prevent scrolling underneath
  };

  const closeDrawer = () => {
    mobileMenuBtn?.classList.remove('open');
    navLinks?.classList.remove('open');
    navBackdrop?.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    closeMenuBtn?.addEventListener('click', closeDrawer);
    navBackdrop?.addEventListener('click', closeDrawer);

    // Close drawer when clicking any nav item
    navItems.forEach(item => {
      item.addEventListener('click', closeDrawer);
    });

    // Close drawer when pressing Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  // 2. Navbar Background Blur on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. ScrollSpy: Highlight current active section in navigation
  const sections = document.querySelectorAll('section[id]');
  const updateActiveNav = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItems.forEach(link => link.classList.remove('active'));
          matchingLink.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav);

  // 4. Subtle Floating Hearts in Background
  const heartsContainer = document.getElementById('heartsContainer');
  const heartIcons = ['♡', '♥', '✨', '💖', '💕'];

  const createFloatingHeart = () => {
    if (!heartsContainer) return;
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    heart.style.left = (Math.random() * 90 + 2) + 'vw';
    heart.style.animationDuration = (8 + Math.random() * 6) + 's';
    heart.style.fontSize = (0.9 + Math.random() * 0.9) + 'rem';
    heart.style.opacity = (0.25 + Math.random() * 0.35).toString();

    heartsContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 14000);
  };

  // Create initial subtle hearts and periodically spawn gently
  for (let i = 0; i < 8; i++) {
    setTimeout(createFloatingHeart, i * 600);
  }
  setInterval(createFloatingHeart, 1800);

  // 5. Lightbox Modal & Photo View
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');

  const openLightbox = (src, caption) => {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption;
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      spawnHeartBurst(card);
      const src = card.getAttribute('data-src') || card.querySelector('img')?.src;
      const caption = card.getAttribute('data-caption') || card.querySelector('.card-label')?.textContent || '';
      if (src) {
        openLightbox(src, caption);
      }
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxBackdrop?.addEventListener('click', closeLightbox);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal?.classList.contains('active')) {
      closeLightbox();
    }
  });

  // 6. Click Burst Effect
  function spawnHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 6; i++) {
      const heart = document.createElement('div');
      heart.textContent = '💖';
      heart.style.position = 'fixed';
      heart.style.left = `${centerX}px`;
      heart.style.top = `${centerY}px`;
      heart.style.pointerEvents = 'none';
      heart.style.zIndex = '9999';
      heart.style.fontSize = '1.2rem';
      heart.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
      document.body.appendChild(heart);

      const angle = (i / 6) * Math.PI * 2;
      const distance = 40 + Math.random() * 40;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance - 20;

      requestAnimationFrame(() => {
        heart.style.transform = `translate(${x}px, ${y}px) scale(0)`;
        heart.style.opacity = '0';
      });

      setTimeout(() => heart.remove(), 850);
    }
  }

  // Sweet Floating Notification Toast
  function showSweetToast(message) {
    let existingToast = document.querySelector('.sweet-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'sweet-toast';
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    toast.style.background = 'rgba(235, 28, 110, 0.95)';
    toast.style.color = '#ffffff';
    toast.style.padding = '0.75rem 1.6rem';
    toast.style.borderRadius = '9999px';
    toast.style.fontWeight = '600';
    toast.style.fontSize = '0.95rem';
    toast.style.boxShadow = '0 8px 25px rgba(220, 20, 90, 0.35)';
    toast.style.zIndex = '10000';
    toast.style.opacity = '0';
    toast.style.transition = 'all 0.3s ease';

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 350);
    }, 2800);
  }

  // 7. Copy Flirting Line to Clipboard
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-text');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        spawnHeartBurst(btn);
        const iconSpan = btn.querySelector('.copy-icon');
        const textSpan = btn.querySelector('.copy-text');
        
        btn.classList.add('copied');
        if (iconSpan) iconSpan.textContent = '✓';
        if (textSpan) textSpan.textContent = 'Copied!';

        showSweetToast('💖 Flirting line copied to clipboard!');

        setTimeout(() => {
          btn.classList.remove('copied');
          if (iconSpan) iconSpan.textContent = '📋';
          if (textSpan) textSpan.textContent = 'Copy';
        }, 2200);
      }).catch(() => {
        showSweetToast('Line ready: ' + textToCopy);
      });
    });
  });
});

