// Deteksi apakah perangkat mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Initialize particles.js hanya jika bukan mobile
if (!isMobile) {
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#00e5ff" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#00e5ff",
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" }
      }
    }
  });
} else {
  // Jika mobile, nonaktifkan particles
  const particlesContainer = document.querySelector('.particles-desktop');
  if (particlesContainer) {
    particlesContainer.style.display = 'none';
  }
}

// DOM Elements
const loadingScreen = document.getElementById("loadingScreen");
const backToTopBtn = document.getElementById("backToTop");
const toast = document.getElementById("toast");
const modals = document.querySelectorAll(".modal");
const closeBtns = document.querySelectorAll(".close-btn");
const variantCards = document.querySelectorAll('.variant-card');
const viewAllBtn = document.getElementById('viewAllVariants');
const serviceCards = document.querySelectorAll('.service-card[data-modal]');

// Hide loading screen after page loads
window.addEventListener("load", function() {
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 1000);
});

// Back to top button
window.addEventListener("scroll", function() {
  if (window.pageYOffset > 300) {
    backToTopBtn.style.display = "flex";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", function() {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Interaksi untuk varian produk
variantCards.forEach(card => {
  card.addEventListener('click', function() {
    const variant = this.getAttribute('data-variant');
    
    // Animasi klik yang lebih sederhana untuk mobile
    if (!isMobile) {
      gsap.to(this, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          openProductDetail(variant);
        }
      });
    } else {
      // Untuk mobile, langsung buka tanpa animasi yang berat
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
        openProductDetail(variant);
      }, 150);
    }
  });
});

// Fungsi buka detail produk
function openProductDetail(variant) {
  const modal1 = document.getElementById('modal1');
  
  if (variant === 'Transporter Robot') {
    modal1.querySelector('h2').innerHTML = '<i class="fas fa-robot"></i> Transporter Robot';
    modal1.querySelector('p').textContent = 'High-speed transporter robot with precision control';
    openModal(modal1);
  } else if (variant === 'battle-sumo') {
    modal1.querySelector('h2').innerHTML = '<i class="fas fa-robot"></i> The Battle Sumo Robot';
    modal1.querySelector('p').textContent = 'Competition-grade sumo robot with advanced sensors';
    openModal(modal1);
  } else if (variant === 'Smart Monitoring Powe') {
    modal1.querySelector('h2').innerHTML = '<i class="fas fa-home"></i> Smart Monitoring Power';
    modal1.querySelector('p').textContent = 'Complete smart home automation system';
    openModal(modal1);
  } else if (variant === 'Smart Gas Detector') {
    modal1.querySelector('h2').innerHTML = '<i class="fas fa-gas-pump"></i> Smart Gas Detector';
    modal1.querySelector('p').textContent = 'Advanced gas detection system with IoT integration';
    openModal(modal1);
  }
}

// Tombol "All Variants"
viewAllBtn.addEventListener('click', function() {
  const modal1 = document.getElementById('modal1');
  
  modal1.querySelector('h2').innerHTML = '<i class="fas fa-robot"></i> All Products (6 Products)';
  modal1.querySelector('p').textContent = 'Explore our complete lineup of electronics, IoT devices, and robotics';
  
  openModal(modal1);
  
  if (!isMobile) {
    gsap.to(this, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
  } else {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = '';
    }, 150);
  }
});

// Interaksi untuk layanan
serviceCards.forEach(card => {
  card.addEventListener('click', function() {
    const modalId = this.getAttribute('data-modal');
    
    if (!isMobile) {
      gsap.to(this, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          const modal = document.getElementById(modalId);
          if (modal) {
            openModal(modal);
          }
        }
      });
    } else {
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
        const modal = document.getElementById(modalId);
        if (modal) {
          openModal(modal);
        }
      }, 150);
    }
  });
});

// Fungsi buka modal
function openModal(modal) {
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
  
  // Animation yang berbeda untuk mobile dan desktop
  if (!isMobile) {
    gsap.fromTo(modal.querySelector('.modal-content'), 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
  } else {
    // Untuk mobile, gunakan animasi yang lebih sederhana
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'translateY(20px)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
      modalContent.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      modalContent.style.transform = 'translateY(0)';
      modalContent.style.opacity = '1';
    }, 10);
  }
}

// Fungsi tutup modal
function closeModal(modal) {
  if (!isMobile) {
    gsap.to(modal.querySelector('.modal-content'), {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: "back.in(1.7)",
      onComplete: () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  } else {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'translateY(20px)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
      modalContent.style.transform = '';
      modalContent.style.opacity = '';
      modalContent.style.transition = '';
    }, 300);
  }
}

// Close modal buttons
closeBtns.forEach(btn => {
  btn.addEventListener("click", function() {
    const modal = this.closest('.modal');
    closeModal(modal);
  });
});

// Close modal on outside click
window.addEventListener("click", (e) => {
  modals.forEach(modal => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

// =============================================
// FUNGSI EMAIL KE GMAIL DENGAN TEMPLATE
// =============================================

// Fungsi untuk membuka Gmail dengan template email
function openGmailWithTemplate(subject, body) {
  const email = 'voltratechno@gmail.com';
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  
  // Gmail compose URL
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodedSubject}&body=${encodedBody}`;
  
  // Buka di tab baru
  const newWindow = window.open(gmailUrl, '_blank');
  
  // Tampilkan status
  const emailStatus = document.getElementById('email-status');
  if (emailStatus) {
    emailStatus.classList.add('show');
    emailStatus.innerHTML = '<i class="fas fa-info-circle"></i> <span>Membuka Gmail... Jika tidak terbuka, izinkan popup atau salin email: voltratechno@gmail.com</span>';
    
    setTimeout(() => {
      emailStatus.classList.remove('show');
    }, 5000);
  }
  
  // Jika popup diblokir, beri alternatif
  if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
    const mailtoLink = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
    window.location.href = mailtoLink;
  }
}

// Template email untuk berbagai keperluan
const emailTemplates = {
  consultation: {
    subject: 'Konsultasi Produk Voltra Techno',
    body: `Halo Tim Voltra Techno,

Saya tertarik dengan produk dan layanan Voltra Techno dan ingin berkonsultasi lebih lanjut.

Nama: [Nama Anda]
Perusahaan/Institusi: [Nama perusahaan/institusi]
No. WhatsApp: [Nomor WhatsApp]

Jenis Konsultasi:
☐ Robotics & IoT Products
☐ PCB Layout Design
☐ 3D Design & Modeling
☐ Programming Software
☐ Lainnya: [Sebutkan]

Deskripsi Kebutuhan:
[Beri tahu kami tentang kebutuhan atau proyek yang Anda miliki]

Mohon informasi lebih lanjut mengenai:
1. Spesifikasi produk/layanan yang tersedia
2. Waktu pengerjaan
3. Estimasi biaya
4. Portofolio proyek sebelumnya

Terima kasih,

Salam,
[Nama Anda]`
  },
  
  programming: {
    subject: 'Konsultasi Layanan Programming Voltra Techno',
    body: `Halo Tim Voltra Techno,

Saya tertarik dengan layanan Programming Voltra Techno dan ingin berkonsultasi lebih lanjut.

Nama: [Nama Anda]
Perusahaan/Institusi: [Nama perusahaan/institusi]
No. WhatsApp: [Nomor WhatsApp]

Jenis Layanan Programming yang Dibutuhkan:
☐ Web Development
☐ Mobile App Development
☐ Desktop Application
☐ IoT Programming
☐ API Development
☐ Custom Software
☐ Lainnya: [Sebutkan]

Bahasa Pemrograman yang Diinginkan:
☐ JavaScript/Node.js
☐ Python
☐ Java
☐ C++
☐ C#
☐ Lainnya: [Sebutkan]

Deskripsi Proyek:
[Jelaskan detail proyek atau sistem yang ingin dibuat]

Fitur yang Diinginkan:
[List fitur-fitur yang diperlukan]

Timeline yang Diinginkan:
[Jangka waktu pengerjaan]

Budget Estimasi:
[Kisaran budget yang tersedia]

Terima kasih,

Salam,
[Nama Anda]`
  },
  
  quoteRequest: {
    subject: 'Request Quote - Voltra Techno',
    body: `Halo Tim Voltra Techno,

Saya ingin meminta penawaran untuk produk/layanan berikut:

Nama: [Nama Anda]
Email: [Email Anda]
No. WhatsApp: [Nomor WhatsApp]

Produk/Layanan yang Diminati:
☐ LF Dead Race Robot
☐ The Battle Sumo Robot
☐ IoT Smart Home System
☐ Agricultural Robot
☐ PCB Layout Design
☐ 3D Design & Modeling
☐ Programming Services
☐ Lainnya: [Sebutkan]

Jumlah Unit/Kuantitas: [Jumlah]

Spesifikasi Khusus:
[Spesifikasi tambahan jika ada]

Waktu Pengiriman yang Diinginkan: [Tanggal/bulan]

Lokasi Pengiriman: [Alamat lengkap]

Mohon kirimkan penawaran resmi termasuk:
1. Harga per unit
2. Biaya pengiriman
3. Garansi
4. Syarat pembayaran
5. Timeline pengerjaan

Terima kasih,

Salam,
[Nama Anda]`
  }
};

// Quick Action Buttons di Contact Section
document.getElementById('contact-whatsapp').addEventListener('click', function() {
  window.open('https://wa.me/6283194870553?text=Halo%20Voltra%20Techno,%20saya%20ingin%20konsultasi%20tentang%20produk', '_blank');
});

document.getElementById('contact-gmail').addEventListener('click', function() {
  openGmailWithTemplate(
    emailTemplates.consultation.subject,
    emailTemplates.consultation.body
  );
});

document.getElementById('contact-instagram').addEventListener('click', function() {
  const username = 'voltratechno';
  const igUrl = `https://www.instagram.com/${username}/`;
  window.open(igUrl, '_blank');
  
  setTimeout(() => {
    showToast('Buka profil Instagram kami dan klik tombol "Message" untuk mengirim DM langsung.');
  }, 1000);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Show toast notification
function showToast(message) {
  toast.querySelector('.toast-message').textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Keyboard shortcuts
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal").forEach(modal => {
      if (modal.style.display === "flex") {
        closeModal(modal);
      }
    });
  }
});

// Auto-typing effect untuk desktop saja
if (!isMobile) {
  const introText = "Innovating the Future of Technology & Robotics";
  let typedIndex = 0;
  const typingSpeed = 50;
  const introTitle = document.querySelector(".intro h2");

  function typeWriter() {
    if (typedIndex < introText.length && introTitle) {
      introTitle.textContent = introText.substring(0, typedIndex + 1);
      typedIndex++;
      setTimeout(typeWriter, typingSpeed);
    }
  }

  window.addEventListener("load", () => {
    if (introTitle) {
      introTitle.textContent = "";
      setTimeout(typeWriter, 1000);
    }
    
    // Animate logo on load hanya untuk desktop
    const logoContainer = document.querySelector(".logo-container");
    if (logoContainer) {
      gsap.from(logoContainer, {
        scale: 0,
        rotation: 360,
        duration: 1,
        ease: "back.out(1.7)"
      });
    }
  });
}

// Instagram Copy Username Functionality
document.querySelectorAll('.copy-username-btn').forEach(button => {
  button.addEventListener('click', function() {
    const username = '@voltratechno';
    
    navigator.clipboard.writeText(username)
      .then(() => {
        const successElement = this.nextElementSibling;
        if (successElement && successElement.classList.contains('copy-success')) {
          successElement.classList.add('show');
          
          setTimeout(() => {
            successElement.classList.remove('show');
          }, 3000);
        }
        
        showToast(`Username "${username}" berhasil disalin!`);
      })
      .catch(err => {
        console.error('Gagal menyalin: ', err);
        const textArea = document.createElement('textarea');
        textArea.value = username;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(`Username "${username}" berhasil disalin!`);
      });
  });
});

// Handle service modal links from footer
document.querySelectorAll('.open-service-modal').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const modalId = this.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) {
      openModal(modal);
    }
  });
});

// Optimasi untuk touch events di mobile
if (isMobile) {
  // Tambahkan class untuk touch feedback
  document.querySelectorAll('button, .variant-card, .service-card, .portfolio-item').forEach(element => {
    element.addEventListener('touchstart', function() {
      this.classList.add('touch-active');
    });
    
    element.addEventListener('touchend', function() {
      this.classList.remove('touch-active');
    });
  });
  
  // Nonaktifkan animasi GSAP yang berat untuk mobile
  if (typeof gsap !== 'undefined') {
    gsap.globalTimeline.pause();
  }
}

// Optimasi scroll untuk mobile
let scrollTimeout;
window.addEventListener('scroll', function() {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(function() {
    // Reset transform setelah scroll berhenti
    document.querySelectorAll('.variant-card, .service-card').forEach(card => {
      card.style.transform = '';
    });
  }, 100);
});
// ============================================
// DETEKSI DAN OPTIMASI UNTUK MOBILE PORTRAIT
// ============================================

// Deteksi orientasi portrait
function isPortraitMode() {
  return window.matchMedia("(orientation: portrait)").matches;
}

// Deteksi mobile device
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Fungsi untuk mengatur viewport height yang benar di mobile
function setViewportHeight() {
  // Dapatkan viewport height yang benar
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  
  // Tambahkan class untuk portrait mode
  if (isPortraitMode()) {
    document.body.classList.add('portrait-mode');
    document.body.classList.remove('landscape-mode');
  } else {
    document.body.classList.add('landscape-mode');
    document.body.classList.remove('portrait-mode');
  }
}

// Panggil saat load dan resize
window.addEventListener('load', setViewportHeight);
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', function() {
  setTimeout(setViewportHeight, 100);
});

// CSS variable untuk vh
const portraitStyle = document.createElement('style');
portraitStyle.textContent = `
  :root {
    --vh: 1vh;
  }
  
  .modal,
  .modal-content,
  .loading-screen {
    height: calc(var(--vh, 1vh) * 100) !important;
    max-height: calc(var(--vh, 1vh) * 100) !important;
  }
  
  /* Class untuk portrait mode */
  .portrait-mode .variants-grid,
  .portrait-mode .services-grid {
    grid-template-columns: 1fr !important;
  }
  
  .portrait-mode .main-products-container {
    flex-direction: column !important;
  }
  
  .portrait-mode .quick-actions {
    flex-direction: column !important;
  }
`;
document.head.appendChild(portraitStyle);

// ============================================
// OPTIMASI PERFORMANSI UNTUK MOBILE PORTRAIT
// ============================================

// Nonaktifkan particles di mobile portrait untuk performa
if (isMobileDevice() && isPortraitMode()) {
  document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
      particlesContainer.style.display = 'none';
      particlesContainer.innerHTML = '';
    }
    
    // Nonaktifkan GSAP animasi yang berat
    if (typeof gsap !== 'undefined') {
      gsap.globalTimeline.pause();
    }
  });
}

// Optimasi gambar loading untuk mobile portrait
if (isMobileDevice() && isPortraitMode()) {
  document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    // Lazy loading untuk gambar
    images.forEach(img => {
      // Tambahkan loading="lazy" untuk native lazy loading
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      
      // Optimasi untuk gambar di viewport
      if (img.classList.contains('variant-image') || 
          img.classList.contains('portfolio-item img')) {
        // Tambahkan placeholder atau low-quality image
        if (!img.hasAttribute('src')) {
          img.style.backgroundColor = '#1a3a53';
          img.style.minHeight = '150px';
        }
      }
    });
  });
}

// ============================================
// FIX UNTUK TOUCH EVENTS DI MOBILE PORTRAIT
// ============================================

if (isMobileDevice()) {
  // Fix untuk touch delay
  document.addEventListener('touchstart', function() {}, {passive: true});
  
  // Prevent double-tap zoom
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
  
  // Optimasi modal untuk touch
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('touchmove', function(e) {
      e.stopPropagation();
    }, {passive: false});
  });
}

// ============================================
// SCROLL SMOOTH UNTUK MOBILE PORTRAIT
// ============================================

// Smooth scroll yang dioptimasi untuk mobile
function smoothScrollTo(target, duration = 500) {
  if (isMobileDevice()) {
    // Gunakan native smooth scroll untuk mobile
    target.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  } else {
    // Fallback untuk desktop
    const targetPosition = target.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
  }
}

// Update anchor link untuk mobile portrait
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      smoothScrollTo(targetElement);
    }
  });
});

// ============================================
// LOADING OPTIMIZATION UNTUK MOBILE PORTRAIT
// ============================================

// Loading screen yang lebih cepat untuk mobile
if (isMobileDevice() && isPortraitMode()) {
  window.addEventListener('load', function() {
    // Sembunyikan loading screen lebih cepat
    setTimeout(() => {
      const loadingScreen = document.getElementById('loadingScreen');
      if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 300);
      }
    }, 800); // Lebih cepat dari default 1000ms
  });
}

// ============================================
// FIX UNTUK SAFARI iOS
// ============================================

// Fix untuk Safari iOS
if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
  // Fix untuk viewport height di iOS
  document.addEventListener('DOMContentLoaded', function() {
    // Fix untuk 100vh di Safari
    function setFullHeight() {
      document.documentElement.style.setProperty(
        '--vh', 
        `${window.innerHeight * 0.01}px`
      );
    }
    
    setFullHeight();
    window.addEventListener('resize', setFullHeight);
    window.addEventListener('orientationchange', setFullHeight);
    
    // Fix untuk sticky header di iOS
    document.querySelectorAll('header').forEach(header => {
      header.style.position = '-webkit-sticky';
    });
  });
}
