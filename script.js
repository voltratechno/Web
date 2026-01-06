// Initialize particles.js
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
    
    // Animasi klik
    gsap.to(this, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        // Buka modal detail produk
        openProductDetail(variant);
      }
    });
  });
});

// Fungsi buka detail produk
function openProductDetail(variant) {
  const modal1 = document.getElementById('modal1');
  
  if (variant === 'lf-dead-race') {
    // Isi modal dengan detail LF Dead Race
    modal1.querySelector('h2').innerHTML = '<i class="fas fa-robot"></i> LF Dead Race';
    modal1.querySelector('p').textContent = 'High-speed racing robot with precision control';
    
    // Tampilkan modal
    openModal(modal1);
  } else if (variant === 'battle-sumo') {
    // Isi modal dengan detail Battle Sumo Robot
    modal1.querySelector('h2').innerHTML = '<i class="fas fa-robot"></i> The Battle Sumo Robot';
    modal1.querySelector('p').textContent = 'Competition-grade sumo robot with advanced sensors';
    
    // Tampilkan modal
    openModal(modal1);
  } else if (variant === 'iot-smart-home') {
    // Isi modal dengan detail IoT Smart Home
    modal1.querySelector('h2').innerHTML = '<i class="fas fa-home"></i> IoT Smart Home System';
    modal1.querySelector('p').textContent = 'Complete smart home automation system';
    
    // Tampilkan modal
    openModal(modal1);
  } else if (variant === 'agri-robot') {
    // Isi modal dengan detail Agricultural Robot
    modal1.querySelector('h2').innerHTML = '<i class="fas fa-tractor"></i> Agricultural Robot';
    modal1.querySelector('p').textContent = 'Automated farming and agriculture robot';
    
    // Tampilkan modal
    openModal(modal1);
  }
}

// Tombol "All Variants"
viewAllBtn.addEventListener('click', function() {
  const modal1 = document.getElementById('modal1');
  
  // Isi modal dengan semua varian
  modal1.querySelector('h2').innerHTML = '<i class="fas fa-robot"></i> All Products (6 Products)';
  modal1.querySelector('p').textContent = 'Explore our complete lineup of electronics, IoT devices, and robotics';
  
  // Tampilkan modal
  openModal(modal1);
  
  // Animasi tombol
  gsap.to(this, {
    scale: 0.9,
    duration: 0.1,
    yoyo: true,
    repeat: 1
  });
});

// Interaksi untuk layanan
serviceCards.forEach(card => {
  card.addEventListener('click', function() {
    const modalId = this.getAttribute('data-modal');
    
    // Animasi klik
    gsap.to(this, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        // Buka modal yang sesuai
        const modal = document.getElementById(modalId);
        if (modal) {
          openModal(modal);
        }
      }
    });
  });
});

// Fungsi buka modal
function openModal(modal) {
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
  
  // Animation
  gsap.fromTo(modal.querySelector('.modal-content'), 
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
  );
}

// Fungsi tutup modal
function closeModal(modal) {
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
    
    // Sembunyikan status setelah 5 detik
    setTimeout(() => {
      emailStatus.classList.remove('show');
    }, 5000);
  }
  
  // Jika popup diblokir, beri alternatif
  if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
    // Alternatif: mailto link
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

// Auto-typing effect for intro
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

// Start typing effect when page loads
window.addEventListener("load", () => {
  if (introTitle) {
    introTitle.textContent = "";
    setTimeout(typeWriter, 1000);
  }
  
  // Animate logo on load
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

// Instagram Copy Username Functionality
document.querySelectorAll('.copy-username-btn').forEach(button => {
  button.addEventListener('click', function() {
    const username = '@voltratechno';
    
    // Copy ke clipboard menggunakan Clipboard API
    navigator.clipboard.writeText(username)
      .then(() => {
        // Tampilkan feedback sukses
        const successElement = this.nextElementSibling;
        if (successElement && successElement.classList.contains('copy-success')) {
          successElement.classList.add('show');
          
          // Sembunyikan pesan setelah 3 detik
          setTimeout(() => {
            successElement.classList.remove('show');
          }, 3000);
        }
        
        // Juga tampilkan toast
        showToast(`Username "${username}" berhasil disalin!`);
      })
      .catch(err => {
        console.error('Gagal menyalin: ', err);
        // Fallback untuk browser lama
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