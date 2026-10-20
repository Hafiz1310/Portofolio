
document.addEventListener('DOMContentLoaded', () => {
  // Tandai halaman yang sedang dibuka.
  const currentPage = location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // Animasi ketika elemen terlihat.
  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  // Filter kartu proyek dan sertifikat.
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const buttons = group.querySelectorAll('[data-filter]');
    const cards = document.querySelectorAll(
      `[data-card-group="${group.dataset.filterGroup}"]`
    );

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(item => item.classList.remove('active'));
        button.classList.add('active');

        const category = button.dataset.filter;

        cards.forEach(card => {
          const categories = (card.dataset.category || '').split(' ');
          const show = category === 'all' || categories.includes(category);
          card.classList.toggle('d-none', !show);
        });
      });
    });
  });

  // Preview gambar sertifikat.
  const previewModal = document.getElementById('imagePreviewModal');

  if (previewModal && window.bootstrap) {
    document.querySelectorAll('[data-preview]').forEach(image => {
      image.addEventListener('click', () => {
        const modalImage = previewModal.querySelector('.preview-image');
        const caption = previewModal.querySelector('.preview-caption');

        modalImage.src = image.src;
        modalImage.alt = image.alt;
        caption.textContent = image.dataset.title || image.alt;

        bootstrap.Modal.getOrCreateInstance(previewModal).show();
      });
    });
  }

  // Tombol kembali ke atas.
  const backTop = document.querySelector('.back-top');

  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('show', window.scrollY > 350);
    }, { passive: true });

    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Kirim pesan melalui WhatsApp tanpa backend.
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', event => {
      event.preventDefault();

      if (!contactForm.reportValidity()) return;

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      // GANTI dengan nomor WhatsApp lu, gunakan kode negara.
      // Contoh Indonesia: 6281234567890, tanpa tanda +.
      const phone = '6281315445895';

      const text = [
        'Halo Hafiz, saya ingin menghubungi Anda.',
        '',
        `Nama: ${name}`,
        `Email: ${email}`,
        `Pesan: ${message}`
      ].join('\n');

      window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
        '_blank',
        'noopener,noreferrer'
      );
    });
  }

  // Tahun otomatis di footer.
  document.querySelectorAll('[data-year]').forEach(element => {
    element.textContent = new Date().getFullYear();
  });
});
