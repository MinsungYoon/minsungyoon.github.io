// Image Overlay
const overlay = document.getElementById('overlay');
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

// Hide Header on Scroll
const header = document.querySelector('header');
let lastScrollTop = 0;

window.addEventListener('scroll', function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
    header.classList.add('header-hidden');
  } else {
    header.classList.remove('header-hidden');
  }
  lastScrollTop = Math.max(0, scrollTop);
});

// Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach((reveal) => {
      if (reveal.getBoundingClientRect().top < windowHeight - 100) {
        reveal.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
}

// Theme Toggle
const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = themeToggleBtn.querySelector('i');
const themeText = themeToggleBtn.querySelector('span');
const themes = ['gradient', 'dark', 'white'];
let currentTheme = localStorage.getItem('themePreference') || 'gradient';

applyTheme(currentTheme);

themeToggleBtn.addEventListener('click', function () {
  const nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
  currentTheme = themes[nextIndex];
  applyTheme(currentTheme);
  localStorage.setItem('themePreference', currentTheme);
});

function applyTheme(theme) {
  document.body.classList.remove('white-mode', 'dark-mode');
  if (theme === 'white') document.body.classList.add('white-mode');
  else if (theme === 'dark') document.body.classList.add('dark-mode');
  updateThemeButton(theme);
}

function updateThemeButton(theme) {
  const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
  const labels = {
    gradient: ['Gradient Mode', 'fas fa-palette'],
    dark:     ['Dark Mode',     'fas fa-moon'],
    white:    ['White Mode',    'fas fa-sun'],
  };
  themeText.textContent = labels[nextTheme][0];
  themeIcon.className   = labels[nextTheme][1];
}

// News Toggle (index.html only)
const loadMoreNews = document.getElementById('loadMoreNews');
if (loadMoreNews) {
  loadMoreNews.addEventListener('click', function () {
    const additionalContent = document.getElementById('moreNews');
    const isHidden = additionalContent.style.display === 'none';
    additionalContent.style.display = isHidden ? 'block' : 'none';
    this.innerHTML = isHidden
      ? '<i class="fas fa-chevron-circle-up"></i> Close'
      : 'More News <i class="fas fa-chevron-down"></i>';
    this.setAttribute('aria-expanded', String(isHidden));
  });
}

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
