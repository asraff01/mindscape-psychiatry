/**
 * Dr. P. Manivannan, MBBS, MD (Psychiatry) — Mindscape Psychiatry Chennai
 * 3-Second High-Clarity Logo Preloader & Ultra-Fluid Scroll Zoom System
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initScrollReveal();
  initScrollZoom();
  initFocusSlider();
  initDateConstraints();
  initMobileNav();
  initNavDropdowns();
  initScrollSpy();
  initIntakeToggle();
  initAppointmentForm();
  initBioModal();
  initFloatingWidgetScroll();
  initYear();
});

/* --------------------------------------------------------------------------
   1. 3-Second Ultra-High Clarity Mindscape Logo Preloader
   -------------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const PRELOADER_DURATION_MS = 3000; // Exact 3 seconds

  setTimeout(() => {
    preloader.classList.add('is-hidden');
    document.body.classList.remove('is-loading');

    // Trigger reveal animations on hero elements right after preloader finishes
    setTimeout(() => {
      const heroReveals = document.querySelectorAll('#hero .reveal-on-scroll');
      heroReveals.forEach(el => el.classList.add('is-revealed'));
    }, 150);
  }, PRELOADER_DURATION_MS);
}

/* --------------------------------------------------------------------------
   2. Scroll-Driven Zoom Animation (2nd Section Mindscape Artwork)
   -------------------------------------------------------------------------- */
function initScrollZoom() {
  const container = document.getElementById('zoom-container');
  const img = document.getElementById('zoom-target-image');
  if (!container || !img) return;

  let ticking = false;

  function updateZoom() {
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const totalDistance = windowHeight + rect.height;
      const currentProgress = (windowHeight - rect.top) / totalDistance;
      const clampedProgress = Math.min(Math.max(currentProgress, 0), 1);
      
      // Zoom from scale 1.02 to 1.25
      const scale = 1.02 + (clampedProgress * 0.23);
      img.style.transform = `scale(${scale.toFixed(4)})`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateZoom);
      ticking = true;
    }
  }, { passive: true });

  updateZoom();
}

/* --------------------------------------------------------------------------
   3. Areas of Focus Carousel Controls & 2-Second Auto-Scroll Animation
   -------------------------------------------------------------------------- */
function initFocusSlider() {
  const track = document.getElementById('focus-cards-track');
  const prevBtn = document.getElementById('focus-prev-btn');
  const nextBtn = document.getElementById('focus-next-btn');
  if (!track) return;

  let autoScrollTimer = null;
  const AUTO_INTERVAL = 2000; // 2 seconds auto-scroll

  function scrollNext() {
    const card = track.querySelector('.focus-therapy-card');
    const scrollAmt = card ? card.offsetWidth + 28 : 380;
    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    if (track.scrollLeft >= maxScrollLeft - 20) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: scrollAmt, behavior: 'smooth' });
    }
  }

  function scrollPrev() {
    const card = track.querySelector('.focus-therapy-card');
    const scrollAmt = card ? card.offsetWidth + 28 : 380;

    if (track.scrollLeft <= 20) {
      track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: -scrollAmt, behavior: 'smooth' });
    }
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoScrollTimer = setInterval(scrollNext, AUTO_INTERVAL);
  }

  function stopAutoPlay() {
    if (autoScrollTimer) {
      clearInterval(autoScrollTimer);
      autoScrollTimer = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAutoPlay();
      scrollNext();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAutoPlay();
      scrollPrev();
      startAutoPlay();
    });
  }

  track.addEventListener('mouseenter', stopAutoPlay);
  track.addEventListener('mouseleave', startAutoPlay);
  track.addEventListener('touchstart', stopAutoPlay, { passive: true });
  track.addEventListener('touchend', startAutoPlay, { passive: true });

  startAutoPlay();
}

/* --------------------------------------------------------------------------
   4. Scroll Reveal Animations (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/* --------------------------------------------------------------------------
   5. Floating Corner Widget Scroll Trigger
   -------------------------------------------------------------------------- */
function initFloatingWidgetScroll() {
  const widget = document.getElementById('floating-widget');
  if (!widget) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      widget.style.opacity = '1';
      widget.style.pointerEvents = 'auto';
      widget.style.transform = 'translateY(0)';
    } else {
      widget.style.opacity = '0';
      widget.style.pointerEvents = 'none';
      widget.style.transform = 'translateY(15px)';
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   6. Date Input Constraints (Min Date = Today)
   -------------------------------------------------------------------------- */
function initDateConstraints() {
  const dateInput = document.getElementById('preferred-date');
  if (!dateInput) return;

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const t_yyyy = tomorrow.getFullYear();
  const t_mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const t_dd = String(tomorrow.getDate()).padStart(2, '0');
  dateInput.value = `${t_yyyy}-${t_mm}-${t_dd}`;
}

/* --------------------------------------------------------------------------
   7. Navigation Dropdown Menus
   -------------------------------------------------------------------------- */
function initNavDropdowns() {
  const dropdownParents = document.querySelectorAll('.nav-item-dropdown');

  dropdownParents.forEach(parent => {
    const btn = parent.querySelector('.dropdown-trigger');
    const popover = parent.querySelector('.dropdown-popover');

    if (!btn || !popover) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      dropdownParents.forEach(otherParent => {
        if (otherParent !== parent) {
          const otherBtn = otherParent.querySelector('.dropdown-trigger');
          const otherPopover = otherParent.querySelector('.dropdown-popover');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherPopover) otherPopover.classList.remove('is-open');
        }
      });

      btn.setAttribute('aria-expanded', !isExpanded);
      popover.classList.toggle('is-open');
    });
  });

  document.addEventListener('click', () => {
    dropdownParents.forEach(parent => {
      const btn = parent.querySelector('.dropdown-trigger');
      const popover = parent.querySelector('.dropdown-popover');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      if (popover) popover.classList.remove('is-open');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdownParents.forEach(parent => {
        const btn = parent.querySelector('.dropdown-trigger');
        const popover = parent.querySelector('.dropdown-popover');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        if (popover) popover.classList.remove('is-open');
      });
    }
  });
}

/* --------------------------------------------------------------------------
   8. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const backdrop = document.getElementById('drawer-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta-btn');

  if (!mobileToggle || !mobileNav || !backdrop) return;

  function openMenu() {
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    backdrop.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    backdrop.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', () => {
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   9. Active Navigation Scroll Spy
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-list .nav-pill-link:not(.dropdown-trigger)');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   10. Intake Toggle (Seeking Therapy vs Healthcare Provider Referral)
   -------------------------------------------------------------------------- */
function initIntakeToggle() {
  const tabPatient = document.getElementById('tab-patient');
  const tabReferral = document.getElementById('tab-referral');
  const providerFields = document.getElementById('provider-fields');
  const intakeTypeInput = document.getElementById('intake-type');
  const nameLabelText = document.getElementById('name-label-text');
  const noteLabelText = document.getElementById('note-label-text');
  const submitBtnText = document.querySelector('#submit-btn .btn-text');

  if (!tabPatient || !tabReferral || !providerFields) return;

  function setPatientMode() {
    tabPatient.classList.add('is-active');
    tabPatient.setAttribute('aria-selected', 'true');
    tabReferral.classList.remove('is-active');
    tabReferral.setAttribute('aria-selected', 'false');

    providerFields.hidden = true;
    intakeTypeInput.value = 'patient';

    nameLabelText.textContent = 'FULL NAME';
    noteLabelText.textContent = 'HOW CAN WE HELP?';
    if (submitBtnText) submitBtnText.textContent = 'Schedule Hospital Appointment';
  }

  function setReferralMode() {
    tabReferral.classList.add('is-active');
    tabReferral.setAttribute('aria-selected', 'true');
    tabPatient.classList.remove('is-active');
    tabPatient.setAttribute('aria-selected', 'false');

    providerFields.hidden = false;
    intakeTypeInput.value = 'referral';

    nameLabelText.textContent = 'PATIENT FULL NAME';
    noteLabelText.textContent = 'CLINICAL SUMMARY & REASON FOR REFERRAL';
    if (submitBtnText) submitBtnText.textContent = 'Submit Healthcare Provider Referral';
  }

  tabPatient.addEventListener('click', setPatientMode);
  tabReferral.addEventListener('click', setReferralMode);
}

/* --------------------------------------------------------------------------
   11. Form Validation & Confirmation Modal
   -------------------------------------------------------------------------- */
function initAppointmentForm() {
  const form = document.getElementById('appointment-form');
  const submitBtn = document.getElementById('submit-btn');
  const bookingModal = document.getElementById('booking-modal');
  const closeBookingModalBtn = document.getElementById('close-booking-modal');
  const modalConfirmBtn = document.getElementById('modal-confirm-btn');

  if (!form || !submitBtn || !bookingModal) return;

  const nameInput = document.getElementById('patient-name');
  const phoneInput = document.getElementById('patient-phone');
  const hospitalSelect = document.getElementById('preferred-hospital');
  const dateInput = document.getElementById('preferred-date');
  const timeSelect = document.getElementById('preferred-time');
  const messageInput = document.getElementById('patient-message');
  const providerNameInput = document.getElementById('provider-name');
  const providerClinicInput = document.getElementById('provider-clinic');

  const nameError = document.getElementById('name-error');
  const phoneError = document.getElementById('phone-error');
  const hospitalError = document.getElementById('hospital-error');
  const dateError = document.getElementById('date-error');
  const timeError = document.getElementById('time-error');
  const messageError = document.getElementById('message-error');
  const providerNameError = document.getElementById('provider-name-error');
  const providerClinicError = document.getElementById('provider-clinic-error');

  function clearErrors() {
    [nameError, phoneError, hospitalError, dateError, timeError, messageError, providerNameError, providerClinicError].forEach(el => {
      if (el) el.textContent = '';
    });
    [nameInput, phoneInput, hospitalSelect, dateInput, timeSelect, messageInput, providerNameInput, providerClinicInput].forEach(el => {
      if (el) el.classList.remove('is-invalid');
    });
  }

  [nameInput, phoneInput, hospitalSelect, dateInput, timeSelect, messageInput, providerNameInput, providerClinicInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        input.classList.remove('is-invalid');
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;
    const isReferral = document.getElementById('intake-type').value === 'referral';

    if (isReferral) {
      if (!providerNameInput.value.trim()) {
        providerNameError.textContent = 'Referring clinician name is required.';
        providerNameInput.classList.add('is-invalid');
        isValid = false;
      }
      if (!providerClinicInput.value.trim()) {
        providerClinicError.textContent = 'Hospital/clinic affiliation is required.';
        providerClinicInput.classList.add('is-invalid');
        isValid = false;
      }
    }

    const nameVal = nameInput.value.trim();
    if (!nameVal || nameVal.length < 2) {
      nameError.textContent = 'Please enter a valid full name.';
      nameInput.classList.add('is-invalid');
      isValid = false;
    }

    const phoneVal = phoneInput.value.trim().replace(/[\s\-()]/g, '');
    const simplePhoneRegex = /^[+]?[\d\s-]{10,15}$/;

    if (!phoneVal) {
      phoneError.textContent = 'Contact phone number is required.';
      phoneInput.classList.add('is-invalid');
      isValid = false;
    } else if (!simplePhoneRegex.test(phoneVal) || phoneVal.replace(/\D/g, '').length < 10) {
      phoneError.textContent = 'Please provide a valid 10-digit phone number.';
      phoneInput.classList.add('is-invalid');
      isValid = false;
    }

    const hospitalVal = hospitalSelect ? hospitalSelect.value : 'Kumaran Hospital, Egmore';

    const dateVal = dateInput.value;
    if (!dateVal) {
      dateError.textContent = 'Please select a preferred date.';
      dateInput.classList.add('is-invalid');
      isValid = false;
    }

    const timeVal = timeSelect.value;
    if (!timeVal) {
      timeError.textContent = 'Please select a time slot.';
      timeSelect.classList.add('is-invalid');
      isValid = false;
    }

    const messageVal = messageInput ? messageInput.value.trim() : '';
    if (!messageVal) {
      if (messageError) messageError.textContent = 'Please briefly describe what you are looking for.';
      if (messageInput) messageInput.classList.add('is-invalid');
      isValid = false;
    }

    if (!isValid) {
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;

      const randomRef = (isReferral ? 'REF-' : 'BK-') + Math.floor(1000 + Math.random() * 9000);
      document.getElementById('modal-patient-name').textContent = nameVal;
      document.getElementById('modal-ref-id').textContent = randomRef;
      document.getElementById('modal-summary-hosp').textContent = hospitalVal;
      document.getElementById('modal-summary-date').textContent = formatDateNice(dateVal);
      document.getElementById('modal-summary-time').textContent = timeVal;
      document.getElementById('modal-summary-phone').textContent = phoneInput.value.trim();

      bookingModal.classList.add('is-active');
      bookingModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      form.reset();
      initDateConstraints();
    }, 500);
  });

  function closeBookingModal() {
    bookingModal.classList.remove('is-active');
    bookingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeBookingModalBtn) closeBookingModalBtn.addEventListener('click', closeBookingModal);
  if (modalConfirmBtn) modalConfirmBtn.addEventListener('click', closeBookingModal);
  bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) closeBookingModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal.classList.contains('is-active')) {
      closeBookingModal();
    }
  });
}

function formatDateNice(dateStr) {
  if (!dateStr) return '-';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/* --------------------------------------------------------------------------
   12. Bio Modal Dialog
   -------------------------------------------------------------------------- */
function initBioModal() {
  const openBioBtn = document.getElementById('open-bio-btn');
  const bioModal = document.getElementById('bio-modal');
  const closeBioBtn = document.getElementById('close-bio-modal');
  const bioCtaBtn = document.getElementById('bio-cta-btn');

  if (!openBioBtn || !bioModal) return;

  function openBio() {
    bioModal.classList.add('is-active');
    bioModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeBio() {
    bioModal.classList.remove('is-active');
    bioModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBioBtn.addEventListener('click', openBio);
  if (closeBioBtn) closeBioBtn.addEventListener('click', closeBio);
  if (bioCtaBtn) bioCtaBtn.addEventListener('click', closeBio);

  bioModal.addEventListener('click', (e) => {
    if (e.target === bioModal) closeBio();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bioModal.classList.contains('is-active')) {
      closeBio();
    }
  });
}

/* --------------------------------------------------------------------------
   13. Dynamic Year
   -------------------------------------------------------------------------- */
function initYear() {
  const yearEl = document.getElementById('year-span');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
