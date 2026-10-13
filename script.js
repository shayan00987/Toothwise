(() => {
  const menuButton = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  if (menuButton && menu) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-controls', 'mobile-menu');
    menuButton.addEventListener('click', () => {
      const isOpen = !menu.classList.contains('hidden');
      menu.classList.toggle('hidden', isOpen);
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      if (menuIcon) menuIcon.className = isOpen ? 'fa-solid fa-bars text-xl' : 'fa-solid fa-xmark text-xl';
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menu.classList.add('hidden');
      menuButton.setAttribute('aria-expanded', 'false');
      if (menuIcon) menuIcon.className = 'fa-solid fa-bars text-xl';
    }));
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        menu.classList.add('hidden');
        menuButton.setAttribute('aria-expanded', 'false');
        if (menuIcon) menuIcon.className = 'fa-solid fa-bars text-xl';
      }
    });
  }

  const form = document.getElementById('appointment-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const value = id => (document.getElementById(id)?.value || '').trim();
      const name = value('full-name');
      const phone = value('phone-number');
      const date = value('preferred-date');
      const service = document.getElementById('service-type')?.selectedOptions[0]?.textContent.trim() || '';
      const notes = value('message');
      const details = [
        'Assalam-o-Alaikum Toothwise, I would like to request an appointment.',
        `Name: ${name}`,
        `Phone: ${phone}`,
        service ? `Treatment / concern: ${service}` : '',
        date ? `Preferred date: ${date}` : '',
        notes ? `Notes: ${notes}` : ''
      ].filter(Boolean).join('\\n');
      const whatsappUrl = 'https://wa.me/923130056477?text=' + encodeURIComponent(details);
      const status = document.getElementById('form-status');
      if (status) status.textContent = 'Opening WhatsApp with your appointment details. Please send the message to request confirmation.';
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
        history.replaceState(null, '', link.getAttribute('href'));
      }
    });
  });
})();
