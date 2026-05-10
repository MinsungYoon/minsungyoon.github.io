// Image Overlay
const overlay = document.getElementById('overlay');
if (overlay) {
  const overlayImg = overlay.querySelector('img');

  document.querySelectorAll('.gallery-img, .pub-image').forEach((img) => {
    img.addEventListener('click', function () {
      overlay.classList.remove('active');
      overlayImg.src = '';

      const tempImg = new Image();
      tempImg.src = this.src;
      tempImg.onload = () => {
        overlayImg.src = tempImg.src;
        overlay.classList.add('active');
      };
    });
  });

  overlay.addEventListener('click', function () {
    overlay.classList.remove('active');
    setTimeout(() => { overlayImg.src = ''; }, 300);
  });
}

// Hide Header on Scroll
const header = document.querySelector('header');
if (header) {
  let lastScrollTop = 0;
  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }
    lastScrollTop = Math.max(0, scrollTop);
  }, { passive: true });
}

// Scroll Reveal Animation (IntersectionObserver)
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -100px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('active'));
  }
}

// Theme Toggle
const themeToggleBtn = document.getElementById('themeToggle');
const themes = ['dark', 'white', 'gradient'];
let currentTheme = localStorage.getItem('themePreference') || 'dark';

applyTheme(currentTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', function () {
    const nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
    currentTheme = themes[nextIndex];
    applyTheme(currentTheme);
    localStorage.setItem('themePreference', currentTheme);
  });
}

function applyTheme(theme) {
  document.documentElement.classList.remove('white-mode', 'dark-mode');
  if (theme === 'white') document.documentElement.classList.add('white-mode');
  else if (theme === 'dark') document.documentElement.classList.add('dark-mode');
  updateThemeButton(theme);
}

function updateThemeButton(theme) {
  if (!themeToggleBtn) return;
  const themeIcon = themeToggleBtn.querySelector('i');
  const themeText = themeToggleBtn.querySelector('span');
  const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
  const labels = {
    gradient: ['Gradient Mode', 'fas fa-palette'],
    dark:     ['Dark Mode',     'fas fa-moon'],
    white:    ['White Mode',    'fas fa-sun'],
  };
  if (themeText) themeText.textContent = labels[nextTheme][0];
  if (themeIcon) themeIcon.className = labels[nextTheme][1];
}

// News Toggle (index.html only)
const loadMoreNews = document.getElementById('loadMoreNews');
if (loadMoreNews) {
  loadMoreNews.addEventListener('click', function () {
    const newsList = document.querySelector('.news-list');
    const expanded = newsList.classList.toggle('show-hidden');
    this.innerHTML = expanded
      ? '<i class="fas fa-chevron-circle-up"></i> Close'
      : 'More News <i class="fas fa-chevron-down"></i>';
    this.setAttribute('aria-expanded', String(expanded));
  });
}

// Footer year
const footerYear = document.getElementById('footer-year');
if (footerYear) footerYear.textContent = new Date().getFullYear();

// Pictures Toggle (index.html only)
const loadMorePictures = document.getElementById('loadMorePictures');
if (loadMorePictures) {
  loadMorePictures.addEventListener('click', function () {
    const morePictures = document.getElementById('morePictures');
    const isHidden = morePictures.style.display === 'none';
    morePictures.style.display = isHidden ? 'block' : 'none';
    this.innerHTML = isHidden
      ? '<i class="fas fa-chevron-circle-up"></i> Close'
      : 'More Pictures <i class="fas fa-chevron-down"></i>';
    this.setAttribute('aria-expanded', String(isHidden));
  });
}
