(function(){
  // ---- nav scroll state ----
  const nav = document.getElementById('siteNav');
  const onScroll = () => {
    if (window.scrollY > 20) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- hero before/after demo toggle ----
  const demoPanel = document.querySelector('[data-panel]');
  const demoButtons = document.querySelectorAll('.demo-btn');
  demoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const state = btn.getAttribute('data-state');
      demoPanel.setAttribute('data-state', state);
      demoButtons.forEach(b => b.classList.toggle('is-active', b === btn));
    });
  });

  // ---- reveal on scroll ----
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  // ---- toast helper ----
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(message){
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  // ---- CTA modal (demo only, no backend) ----
  const overlay = document.getElementById('modalOverlay');
  const modal = overlay.querySelector('.modal');
  const modalClose = document.getElementById('modalClose');
  const modalToggleBtns = document.querySelectorAll('.modal-toggle-btn');
  const modalEyebrow = document.getElementById('modalEyebrow');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalForm = document.getElementById('modalForm');
  const modalSubmit = document.getElementById('modalSubmit');
  const phoneLabel = document.getElementById('phoneLabel');
  const phoneInput = document.getElementById('phoneInput');
  const messageLabel = document.getElementById('messageLabel');
  let lastFocused = null;

  const COPY = {
    consult: {
      eyebrow: 'CONSULT',
      title: 'AI 협업 도입, 전문가와 상담하세요',
      desc: '현재 업무 상황을 알려주시면, 맞춤 도입 방향을 안내해드립니다.',
      submit: '상담 신청하기',
      toast: '상담 신청이 완료됐어요. 담당자가 곧 연락드릴게요 🙌',
      phoneRequired: true,
      phoneLabel: '전화번호',
      messageLabel: '상담받고 싶은 내용 (선택)'
    },
    content: {
      eyebrow: 'FREE GUIDE',
      title: '실무 바로 적용 가이드 받기',
      desc: '입력하신 이메일로 AI 협업 실무 가이드를 바로 보내드립니다.',
      submit: '무료로 받기',
      toast: '가이드 신청이 완료됐어요. 곧 이메일로 보내드릴게요 🙌',
      phoneRequired: false,
      phoneLabel: '전화번호 (선택)',
      messageLabel: '궁금한 점 (선택)'
    }
  };

  function applyIntent(intent){
    const copy = COPY[intent] || COPY.consult;
    modalForm.dataset.intent = intent;
    modalEyebrow.textContent = copy.eyebrow;
    modalTitle.textContent = copy.title;
    modalDesc.textContent = copy.desc;
    modalSubmit.textContent = copy.submit;
    phoneLabel.innerHTML = copy.phoneRequired
      ? '전화번호 <em>*</em>'
      : '전화번호 <em>(선택)</em>';
    phoneInput.required = copy.phoneRequired;
    messageLabel.textContent = copy.messageLabel;

    modalToggleBtns.forEach(btn => {
      btn.classList.toggle('is-active', btn.getAttribute('data-intent') === intent);
    });
  }

  function openModal(intent){
    lastFocused = document.activeElement;
    applyIntent(intent || 'consult');
    overlay.hidden = false;
    document.body.classList.add('no-scroll');
    requestAnimationFrame(() => overlay.classList.add('is-open'));
    const firstField = modalForm.querySelector('input[name="name"]');
    if (firstField) setTimeout(() => firstField.focus(), 300);
  }

  function closeModal(){
    overlay.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    setTimeout(() => { overlay.hidden = true; }, 300);
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('.js-cta-trigger').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.getAttribute('data-intent')));
  });

  modalToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => applyIntent(btn.getAttribute('data-intent')));
  });

  modalClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
  });

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!modalForm.checkValidity()) {
      modalForm.reportValidity();
      return;
    }
    const intent = modalForm.dataset.intent || 'consult';
    const copy = COPY[intent] || COPY.consult;
    modalForm.reset();
    closeModal();
    showToast(copy.toast);
  });
})();
