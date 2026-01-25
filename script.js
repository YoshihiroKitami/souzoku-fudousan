/**
 * 相続不動産の窓口 - 共通JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // ===================================
  // モバイルメニュー（ハンバーガー）
  // ===================================
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-list a');

  if (hamburger && nav) {
    // ハンバーガーメニューのクリックイベント
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('active');
      
      // アクセシビリティ対応
      const isExpanded = this.classList.contains('active');
      this.setAttribute('aria-expanded', isExpanded);
    });

    // ナビリンクをクリックしたらメニューを閉じる
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // メニュー外をクリックしたら閉じる
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ===================================
  // FAQアコーディオン
  // ===================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');
    
    if (question) {
      question.addEventListener('click', function() {
        // 他のアイテムを閉じる
        faqItems.forEach(function(otherItem) {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            const otherQuestion = otherItem.querySelector('.faq-question');
            if (otherQuestion) {
              otherQuestion.setAttribute('aria-expanded', 'false');
            }
          }
        });

        // 現在のアイテムをトグル
        item.classList.toggle('active');
        const isExpanded = item.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
      });
    }
  });

  // ===================================
  // お問い合わせフォーム
  // ===================================
  const contactForm = document.getElementById('contact-form');
  const formContainer = document.querySelector('.contact-form');
  const formSuccess = document.querySelector('.form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // フォームバリデーション
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const location = document.getElementById('location');

      let isValid = true;

      // 名前のバリデーション
      if (!name.value.trim()) {
        showError(name, 'お名前を入力してください');
        isValid = false;
      } else {
        clearError(name);
      }

      // メールまたは電話のバリデーション
      if (!email.value.trim() && !phone.value.trim()) {
        showError(email, 'メールアドレスまたは電話番号を入力してください');
        isValid = false;
      } else {
        clearError(email);
        
        // メールアドレスの形式チェック
        if (email.value.trim() && !isValidEmail(email.value)) {
          showError(email, '正しいメールアドレスを入力してください');
          isValid = false;
        }
      }

      // 所在地のバリデーション
      if (!location.value.trim()) {
        showError(location, '物件所在地を入力してください');
        isValid = false;
      } else {
        clearError(location);
      }

      if (isValid) {
        // フォームを非表示にして成功メッセージを表示
        contactForm.style.display = 'none';
        if (formSuccess) {
          formSuccess.classList.add('show');
        }

        // ページトップにスクロール
        window.scrollTo({
          top: formContainer.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  }

  // エラー表示関数
  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.className = 'error-message';
      errorElement.style.color = '#c0392b';
      errorElement.style.fontSize = '0.85rem';
      errorElement.style.marginTop = '0.25rem';
      errorElement.style.display = 'block';
      formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    input.style.borderColor = '#c0392b';
  }

  // エラークリア関数
  function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
      errorElement.remove();
    }
    
    input.style.borderColor = '';
  }

  // メールアドレスバリデーション
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // ===================================
  // スムーズスクロール
  // ===================================
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  
  smoothScrollLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ===================================
  // ヘッダースクロール時の影
  // ===================================
  const header = document.querySelector('.header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.08)';
      }
    });
  }

  // ===================================
  // 現在のページをナビでハイライト
  // ===================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinksAll = document.querySelectorAll('.nav-list a');
  
  navLinksAll.forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
