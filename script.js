// Theme dark / light with persistence in localStorage
(function(){
  const root = document.documentElement;
  const THEME_KEY = 'ps_theme';
  const toggleBtn = document.getElementById('theme-toggle');
  const iconMoon = document.getElementById('icon-moon');
  const iconSun = document.getElementById('icon-sun');

  function applyTheme(theme){
    if(theme === 'light'){
      root.classList.add('light');
      iconSun.classList.remove('hidden');
      iconMoon.classList.add('hidden');
    } else {
      root.classList.remove('light');
      iconSun.classList.add('hidden');
      iconMoon.classList.remove('hidden');
    }
  }

  // initialize theme (default dark)
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(saved);

  toggleBtn.addEventListener('click', () => {
    const current = root.classList.contains('light') ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });
})();

// Language selector with default en-us and footer translation
(function(){
  const langSelect = document.getElementById('lang');
  const heroTitle = document.querySelector('.hero-title');
  const heroSub = document.querySelector('.hero-sub');
  const sectionTitle = document.querySelector('.section-title');
  const footerCreditEl = document.getElementById('footer-credit');

  const texts = {
    'pt-br': {
      heroTitle: 'Bem-vindo à PlayStation Store',
      heroSub: 'Projeto - Recriação da página inicial com carrossel de capas',
      sectionTitle: 'Destaques',
      footerCredit: 'Desenvolvido por Felipe Aguiar - Atualizado por Nivaldo Beirão'
    },
    'en-us': {
      heroTitle: 'Welcome to PlayStation Store',
      heroSub: 'Project - Home page recreation with cover carousel',
      sectionTitle: 'Featured',
      footerCredit: 'Developed by Felipe Aguiar - Updated by Nivaldo Beirão'
    },
    'es-es': {
      heroTitle: 'Bienvenido a PlayStation Store',
      heroSub: 'Proyecto - Recreación de la página principal con carrusel de portadas',
      sectionTitle: 'Destacados',
      footerCredit: 'Desarrollado por Felipe Aguiar - Actualizado por Nivaldo Beirão'
    }
  };

  // apply saved language or default to en-us
  const savedLang = localStorage.getItem('ps_lang') || 'en-us';
  if(langSelect) langSelect.value = savedLang;
  applyLang(savedLang);

  if(langSelect){
    langSelect.addEventListener('change', (e) => {
      const v = e.target.value;
      applyLang(v);
      localStorage.setItem('ps_lang', v);
    });
  }

  function applyLang(code){
    const t = texts[code] || texts['en-us'];
    if(heroTitle) heroTitle.textContent = t.heroTitle;
    if(heroSub) heroSub.textContent = t.heroSub;
    if(sectionTitle) sectionTitle.textContent = t.sectionTitle;
    if(footerCreditEl && t.footerCredit) footerCreditEl.textContent = t.footerCredit;
    // update html lang attribute for accessibility
    try {
      document.documentElement.lang = code === 'en-us' ? 'en-US' : (code === 'pt-br' ? 'pt-BR' : 'es-ES');
    } catch(e){}
  }
})();

// Keyboard support for carousel when focused
(function(){
  const carousel = document.getElementById('carousel');
  if(!carousel) return;

  carousel.addEventListener('keydown', (e) => {
    const step = 220; // approximate card width + gap
    if(e.key === 'ArrowRight'){
      carousel.scrollBy({left: step, behavior: 'smooth'});
      e.preventDefault();
    } else if(e.key === 'ArrowLeft'){
      carousel.scrollBy({left: -step, behavior: 'smooth'});
      e.preventDefault();
    }
  });
})();
