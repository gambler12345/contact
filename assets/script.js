/**
 * Contact Form – Cookie Consent Manager & Form Handler
 * DSGVO / GDPR compliant | Cookie Guidelines | AI Act Notice
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────
     1. COOKIE CONSENT MANAGER
  ───────────────────────────────────────── */
  const CONSENT_KEY = 'cookie_consent_v1';
  const CONSENT_DATE_KEY = 'cookie_consent_date';

  /**
   * Read stored consent from localStorage.
   * Returns null if not yet set.
   */
  function getStoredConsent() {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  /**
   * Persist consent choices to localStorage.
   */
  function saveConsent(choices) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(choices));
      localStorage.setItem(CONSENT_DATE_KEY, new Date().toISOString());
    } catch (_) {
      // Storage unavailable – proceed without persisting
    }
  }

  /**
   * Apply accepted/rejected state to all category checkboxes.
   */
  function applyConsentToCheckboxes(choices) {
    Object.entries(choices).forEach(function (entry) {
      var cat = entry[0], val = entry[1];
      var el = document.getElementById('cookie-cat-' + cat);
      if (el && !el.disabled) {
        el.checked = val;
      }
    });
  }

  /**
   * Read current checkbox states from the banner.
   */
  function readCheckboxConsent() {
    return {
      necessary: true, // always true
      functional: !!(document.getElementById('cookie-cat-functional') || {}).checked,
      analytics: !!(document.getElementById('cookie-cat-analytics') || {}).checked,
      marketing: !!(document.getElementById('cookie-cat-marketing') || {}).checked,
    };
  }

  function showCookieBanner() {
    var banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.add('visible');
      banner.removeAttribute('hidden');
      // Move focus to banner for accessibility
      var firstBtn = banner.querySelector('button');
      if (firstBtn) firstBtn.focus();
    }
  }

  function hideCookieBanner() {
    var banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.remove('visible');
      banner.setAttribute('hidden', '');
    }
  }

  function initCookieBanner() {
    var existing = getStoredConsent();
    if (!existing) {
      showCookieBanner();
    } else {
      applyConsentToCheckboxes(existing);
    }

    var btnAcceptAll = document.getElementById('cookie-accept-all');
    var btnRejectNonEssential = document.getElementById('cookie-reject-non-essential');
    var btnSaveChoices = document.getElementById('cookie-save-choices');
    var settingsTrigger = document.getElementById('cookie-settings-trigger');

    if (btnAcceptAll) {
      btnAcceptAll.addEventListener('click', function () {
        var choices = { necessary: true, functional: true, analytics: true, marketing: true };
        saveConsent(choices);
        applyConsentToCheckboxes(choices);
        hideCookieBanner();
        announceLiveRegion('Cookie-Einstellungen gespeichert: Alle akzeptiert.');
      });
    }

    if (btnRejectNonEssential) {
      btnRejectNonEssential.addEventListener('click', function () {
        var choices = { necessary: true, functional: false, analytics: false, marketing: false };
        saveConsent(choices);
        applyConsentToCheckboxes(choices);
        hideCookieBanner();
        announceLiveRegion('Cookie-Einstellungen gespeichert: Nur notwendige Cookies.');
      });
    }

    if (btnSaveChoices) {
      btnSaveChoices.addEventListener('click', function () {
        var choices = readCheckboxConsent();
        saveConsent(choices);
        hideCookieBanner();
        announceLiveRegion('Cookie-Einstellungen gespeichert.');
      });
    }

    if (settingsTrigger) {
      settingsTrigger.addEventListener('click', function () {
        var existing = getStoredConsent();
        if (existing) applyConsentToCheckboxes(existing);
        showCookieBanner();
      });
    }
  }

  /* ─────────────────────────────────────────
     2. ARIA LIVE REGION (Accessibility)
  ───────────────────────────────────────── */
  var liveRegion = null;

  function announceLiveRegion(msg) {
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      liveRegion.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;';
      document.body.appendChild(liveRegion);
    }
    liveRegion.textContent = '';
    // Delay ensures screen readers pick up the change
    setTimeout(function () { liveRegion.textContent = msg; }, 50);
  }

  /* ─────────────────────────────────────────
     3. CONTACT FORM HANDLER
  ───────────────────────────────────────── */
  var FORM_ID = 'contact-form';
  var MAX_MESSAGE_LENGTH = 2000;

  function initContactForm() {
    var form = document.getElementById(FORM_ID);
    if (!form) return;

    var submitBtn = form.querySelector('[data-submit-btn]');
    var msgSuccess = document.getElementById('form-success');
    var msgError = document.getElementById('form-error-msg');
    var messageField = document.getElementById('message');
    var charCountEl = document.getElementById('char-count');

    // Character counter for textarea
    if (messageField && charCountEl) {
      messageField.addEventListener('input', function () {
        var len = messageField.value.length;
        charCountEl.textContent = len + ' / ' + MAX_MESSAGE_LENGTH;
        charCountEl.className = 'char-counter';
        if (len >= MAX_MESSAGE_LENGTH) {
          charCountEl.classList.add('at-limit');
        } else if (len > MAX_MESSAGE_LENGTH * 0.85) {
          charCountEl.classList.add('near-limit');
        }
      });
    }

    // Real-time validation on blur
    var fields = form.querySelectorAll('[data-required]');
    fields.forEach(function (field) {
      field.addEventListener('blur', function () {
        validateField(field);
      });
      field.addEventListener('input', function () {
        // Clear error once user starts typing
        if (field.classList.contains('error')) {
          clearFieldError(field);
        }
      });
    });

    // Form submission
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Hide previous messages
      hideElement(msgSuccess);
      hideElement(msgError);

      // Validate all required fields
      var isValid = validateForm(form);
      if (!isValid) {
        // Focus first invalid field
        var firstInvalid = form.querySelector('.form-control.error');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Check GDPR consent
      var consentGdpr = document.getElementById('consent-gdpr');
      if (!consentGdpr || !consentGdpr.checked) {
        setFieldError(consentGdpr, 'Bitte stimmen Sie der Datenschutzerklärung zu.');
        consentGdpr.focus();
        return;
      }

      // Set loading state
      setLoading(submitBtn, true);

      // Submit form data to the configured endpoint
      submitForm(form)
        .then(function () {
          form.reset();
          if (charCountEl) charCountEl.textContent = '0 / ' + MAX_MESSAGE_LENGTH;
          showElement(msgSuccess);
          announceLiveRegion('Ihre Nachricht wurde erfolgreich gesendet.');
          window.scrollTo({ top: msgSuccess.offsetTop - 80, behavior: 'smooth' });
        })
        .catch(function (err) {
          var errorEl = document.getElementById('form-error-msg');
          if (err && err.message === 'no-endpoint' && errorEl) {
            var textEl = errorEl.querySelector('.form-error-msg__text p');
            if (textEl) {
              textEl.textContent = 'Kein Übermittlungsendpunkt konfiguriert. Bitte tragen Sie das data-endpoint-Attribut am Formular ein (z. B. einen Formspree-Endpunkt).';
            }
          }
          showElement(msgError);
          announceLiveRegion('Fehler beim Senden. Bitte versuchen Sie es erneut.');
        })
        .finally(function () {
          setLoading(submitBtn, false);
        });
    });
  }

  /**
   * Submits the form data to the endpoint configured via the form's
   * `data-endpoint` attribute (e.g. a Formspree URL or a custom API).
   * Set `data-endpoint="https://formspree.io/f/YOUR_FORM_ID"` on the
   * <form> element to enable real submission.
   */
  function submitForm(form) {
    var data = new FormData(form);
    var payload = {};
    data.forEach(function (val, key) {
      payload[key] = val;
    });
    // Consent fields are included for GDPR Art. 7(1) audit-trail purposes.
    // The backend should log these with appropriate access controls and
    // never expose them in client-facing responses or public logs.

    var endpoint = (form.getAttribute('data-endpoint') || '').trim();
    if (!endpoint) {
      // No endpoint configured — fall back to mailto so the visitor can still send a message.
      var mailto = form.getAttribute('data-mailto') || '';
      if (mailto) {
        var subject = encodeURIComponent(payload.subject || 'Kontaktanfrage');
        var body = encodeURIComponent(
          'Von: ' + (payload['first-name'] || '') + ' ' + (payload['last-name'] || '') +
          '\nE-Mail: ' + (payload['email'] || '') +
          (payload['phone'] ? '\nTelefon: ' + payload['phone'] : '') +
          '\n\n' + (payload['message'] || '')
        );
        window.location.href = 'mailto:' + mailto + '?subject=' + subject + '&body=' + body;
        return Promise.resolve();
      }
      return Promise.reject(new Error('no-endpoint'));
    }

    return fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
    });
  }

  /* ─────────────────────────────────────────
     4. FORM VALIDATION HELPERS
  ───────────────────────────────────────── */
  function validateForm(form) {
    var fields = form.querySelectorAll('[data-required]');
    var valid = true;
    fields.forEach(function (field) {
      if (!validateField(field)) valid = false;
    });
    return valid;
  }

  function validateField(field) {
    var value = field.value.trim();
    var type = field.getAttribute('data-required');

    if (!value) {
      setFieldError(field, 'Dieses Feld ist ein Pflichtfeld.');
      return false;
    }

    if (type === 'email' && !isValidEmail(value)) {
      setFieldError(field, 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return false;
    }

    if (type === 'message' && value.length > MAX_MESSAGE_LENGTH) {
      setFieldError(field, 'Die Nachricht darf maximal ' + MAX_MESSAGE_LENGTH + ' Zeichen lang sein.');
      return false;
    }

    clearFieldError(field);
    return true;
  }

  function setFieldError(field, msg) {
    if (!field) return;
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    var errorEl = document.getElementById(field.id + '-error');
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.classList.add('visible');
    }
  }

  function clearFieldError(field) {
    if (!field) return;
    field.classList.remove('error');
    field.removeAttribute('aria-invalid');
    var errorEl = document.getElementById(field.id + '-error');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
  }

  function isValidEmail(email) {
    // Use a temporary input element to leverage the browser's built-in RFC-compliant email validation
    var input = document.createElement('input');
    input.type = 'email';
    input.value = email;
    return input.validity.valid;
  }

  /* ─────────────────────────────────────────
     5. UI HELPERS
  ───────────────────────────────────────── */
  function setLoading(btn, loading) {
    if (!btn) return;
    if (loading) {
      btn.classList.add('btn--loading');
      btn.setAttribute('disabled', '');
      btn.setAttribute('aria-busy', 'true');
    } else {
      btn.classList.remove('btn--loading');
      btn.removeAttribute('disabled');
      btn.removeAttribute('aria-busy');
    }
  }

  function showElement(el) {
    if (el) el.classList.add('visible');
  }

  function hideElement(el) {
    if (el) el.classList.remove('visible');
  }

  /* ─────────────────────────────────────────
     6. PROGRESS INDICATOR
  ───────────────────────────────────────── */
  function initFormProgress() {
    var form = document.getElementById(FORM_ID);
    if (!form) return;

    var steps = form.querySelectorAll('.form-progress__step');
    if (!steps.length) return;

    var sections = form.querySelectorAll('[data-section]');

    function updateProgress() {
      var filled = 0;
      sections.forEach(function (section) {
        var inputs = section.querySelectorAll('input[data-required], textarea[data-required], select[data-required]');
        var allFilled = true;
        inputs.forEach(function (inp) {
          if (!inp.value.trim()) allFilled = false;
        });
        if (allFilled && inputs.length) filled++;
      });

      steps.forEach(function (step, i) {
        step.classList.toggle('active', i < filled);
      });
    }

    form.querySelectorAll('input, textarea, select').forEach(function (el) {
      el.addEventListener('input', updateProgress);
      el.addEventListener('change', updateProgress);
    });

    updateProgress();
  }

  /* ─────────────────────────────────────────
     7. INIT
  ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initCookieBanner();
    initContactForm();
    initFormProgress();
  });

})();
