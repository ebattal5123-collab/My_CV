// script.js — Template ID: template_9gbsd48

// Loader gizle
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 800);
});

// Yıl otomatik
document.getElementById('year').textContent = new Date().getFullYear();

// Tema geçişi
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (prefersDark || localStorage.getItem('theme') === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
  document.documentElement.setAttribute('data-theme', 'light');
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const newTheme = current === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  themeToggle.innerHTML = newTheme === 'dark' 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';
});

// Scroll animasyonları
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.slide-up, .fade-in, .fade-in-delay, .fade-in-delay-2')
  .forEach(el => observer.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// ========== EmailJS Entegrasyonu ==========
(function() {
  // ✅ EmailJS Public Key'ini BURAYA yaz:
  const EMAILJS_PUBLIC_KEY = KVCqGVysNCTnDAPL; // ← BURAYI DEĞİŞTİR!

  emailjs.init(EMAILJS_PUBLIC_KEY);

  const form = document.getElementById('contactForm');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      status.textContent = 'Gönderiliyor...';
      status.className = 'form-feedback';

      emailjs.send("service_cv", "template_9gbsd48", {
        from_name: form.from_name.value,
        from_email: form.from_email.value,
        message: form.message.value
      })
      .then(() => {
        status.textContent = '✅ Mesajınız başarıyla gönderildi!';
        status.className = 'form-feedback success';
        form.reset();
        setTimeout(() => status.textContent = '', 5000);
      })
      .catch((error) => {
        console.error('EmailJS Hatası:', error);
        status.textContent = '❌ Gönderim başarısız. Lütfen daha sonra tekrar deneyin.';
        status.className = 'form-feedback error';
      });
    });
  }
})();
