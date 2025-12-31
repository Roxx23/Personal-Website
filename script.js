// script.js

// ===== Scroll Position Management =====
// Prevent automatic scroll restoration
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}

// Always start at top immediately on page load
window.scrollTo(0, 0);

// Save scroll position before navigating to detail pages
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link && (link.href.includes('experience') || link.href.includes('project'))) {
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
  }
});

// Restore scroll position when returning from detail pages
window.addEventListener('DOMContentLoaded', () => {
  // Check if we're on the main page and coming from a detail page
  const isMainPage = !window.location.pathname.includes('experience') && 
                     !window.location.pathname.includes('project');
  
  if (isMainPage) {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
      // Restore position immediately
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(savedPosition));
        sessionStorage.removeItem('scrollPosition');
      });
    }
  }
});

// ===== Hide Loading Screen Immediately =====
window.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 800);
  }
});

// ===== Spotify-like Smooth Scroll Navigation =====
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.menu a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only handle internal links (starting with #)
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          // Remove active class from all links
          document.querySelectorAll('.menu a').forEach(link => {
            link.classList.remove('active');
          });
          
          // Add active class to clicked link
          this.classList.add('active');
          
          // Smooth scroll to target
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});

// ===== Update Active Menu on Scroll =====
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.section');
  const scrollPos = window.pageYOffset + 200; // offset for better triggering
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      document.querySelectorAll('.menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// ===== Contact Form Handler =====
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      const formResponse = document.getElementById('formResponse');
      
      // Show loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        const data = await response.json();
        
        if (response.ok) {
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
          submitBtn.style.background = 'linear-gradient(135deg, #1db954, #1ed760)';
          showNotification('Message sent successfully! 📧');
          
          if (formResponse) {
            formResponse.innerHTML = '<p style="color: #1db954;">✓ Thank you! Your message has been sent.</p>';
            formResponse.style.display = 'block';
          }
          
          // Reset form after delay
          setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            if (formResponse) formResponse.style.display = 'none';
          }, 3000);
          
        } else {
          throw new Error(data.message || 'Form submission failed');
        }
        
      } catch (error) {
        console.error('Error:', error);
        submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Try Again';
        submitBtn.style.background = 'linear-gradient(135deg, #e22134, #ff4444)';
        showNotification('Failed to send message. Please try again.');
        
        if (formResponse) {
          formResponse.innerHTML = '<p style="color: #e22134;">✗ Failed to send. Please try again.</p>';
          formResponse.style.display = 'block';
        }
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
          if (formResponse) formResponse.style.display = 'none';
        }, 3000);
      }
    });
  }
});

// ===== Spotify-like Notification =====
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'spotify-notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => notification.classList.add('show'), 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ===== Hover Effect for Cards (Spotify-like) =====
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

// ===== Carousel Smooth Scroll with Mouse Wheel =====
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach(carousel => {
    carousel.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        carousel.scrollLeft += e.deltaY;
      }
    });
  });
});

// ===== Lazy Load Images =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===== Project Page Scripts (if on project page) =====
const progressEl = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

if (progressEl && currentTimeEl && totalTimeEl && playBtn) {
  // read total seconds from data-duration
  const totalDuration = +progressEl.dataset.duration;
  
  // format seconds → M:SS
  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2,'0')}`;
  }
  
  // paint the green fill under the thumb
  function paintTrack(percent) {
    progressEl.style.background = 
      `linear-gradient(to right, var(--accent) ${percent}%, #404040 ${percent}%)`;
  }
  
  // set the total-time label once
  totalTimeEl.textContent = formatTime(totalDuration);
  
  // on scroll: update slider, paint, update current-time
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight ? (scrollTop / docHeight) * 100 : 0;
    progressEl.value = pct;
    paintTrack(pct);
    currentTimeEl.textContent = formatTime(Math.floor(totalDuration * pct / 100));
  });
  
  // on manual drag: scroll page, paint, update current-time
  progressEl.addEventListener('input', e => {
    const pct = +e.target.value;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, (docHeight * pct) / 100);
    paintTrack(pct);
    currentTimeEl.textContent = formatTime(Math.floor(totalDuration * pct / 100));
  });
  
  // play/pause auto-scroll
  let isPlaying = false, scrollInterval;
  playBtn.addEventListener('click', () => {
    const icon = playBtn.firstElementChild;
    if (!isPlaying) {
      icon.classList.replace('fa-play-circle','fa-pause-circle');
      isPlaying = true;
      scrollInterval = setInterval(() => {
        window.scrollBy(0,2);
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
          clearInterval(scrollInterval);
          icon.classList.replace('fa-pause-circle','fa-play-circle');
          isPlaying = false;
        }
      }, 20);
    } else {
      clearInterval(scrollInterval);
      icon.classList.replace('fa-pause-circle','fa-play-circle');
      isPlaying = false;
    }
  });
  
  // prev/next nav
  if (prevBtn && nextBtn) {
    (function(){
      const file = window.location.pathname.split('/').pop();
      const m = file.match(/project(\d+)\.html$/);
      if (!m) return;
      const id = parseInt(m[1],10);
      prevBtn.addEventListener('click', ()=>{
        if (id>1) window.location.href = `project${id-1}.html`;
      });
      nextBtn.addEventListener('click', ()=>{
        window.location.href = `project${id+1}.html`;
      });
    })();
  }
  
  // ensure fill is painted on load
  window.addEventListener('DOMContentLoaded', () => paintTrack(progressEl.value));
}

// Close-button nav
const closeBtn = document.getElementById('close-btn');
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

// ===== Spotify-like "Now Playing" Bar Animation =====
document.addEventListener('DOMContentLoaded', () => {
  function createNowPlayingAnimation() {
    const cards = document.querySelectorAll('.card-image');
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        const overlay = this.querySelector('.overlay');
        if (overlay) {
          overlay.style.opacity = '1';
        }
      });
      
      card.addEventListener('mouseleave', function() {
        const overlay = this.querySelector('.overlay');
        if (overlay && !this.classList.contains('playing')) {
          overlay.style.opacity = '0';
        }
      });
    });
  }
  
  createNowPlayingAnimation();
});

// ===== Add Fade-in Animation on Scroll =====
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.section');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
  });
});

// ===== Back to Top Button =====
document.addEventListener('DOMContentLoaded', () => {
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

// ===== Keyboard Shortcuts (Spotify-like) =====
document.addEventListener('keydown', (e) => {
  // Space bar to scroll down
  if (e.code === 'Space' && e.target === document.body) {
    e.preventDefault();
    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    });
  }
  
  // Home key to go to top
  if (e.code === 'Home') {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  // End key to go to bottom
  if (e.code === 'End') {
    e.preventDefault();
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  }
  
  // Arrow keys for navigation
  if (e.code === 'ArrowUp' && e.ctrlKey) {
    e.preventDefault();
    window.scrollBy({
      top: -100,
      behavior: 'smooth'
    });
  }
  
  if (e.code === 'ArrowDown' && e.ctrlKey) {
    e.preventDefault();
    window.scrollBy({
      top: 100,
      behavior: 'smooth'
    });
  }
});

// ===== Recently Viewed Tracking (Unified) =====
function trackRecentlyViewed(item) {
  let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  
  // Remove if already exists (check by title and url)
  recentlyViewed = recentlyViewed.filter(i => 
    !(i.title === item.title && i.url === item.url)
  );
  
  // Add timestamp if not present
  if (!item.timestamp) {
    item.timestamp = Date.now();
  }
  
  // Add image property if not present
  if (!item.image) {
    item.image = '';
  }
  
  // Add to beginning
  recentlyViewed.unshift(item);
  
  // Keep only last 10 items
  recentlyViewed = recentlyViewed.slice(0, 10);
  
  localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
}

function loadRecentlyViewed() {
  const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  const container = document.querySelector('.recently-viewed-grid');
  
  if (!container) return;
  
  container.innerHTML = '';
  
  if (recentlyViewed.length === 0) {
    container.innerHTML = '<p style="color: var(--text-secondary); grid-column: 1/-1; text-align: center;">No recently viewed items yet. Browse projects and experiences!</p>';
    return;
  }
  
  recentlyViewed.forEach(item => {
    const card = document.createElement('a');
    card.href = item.url;
    card.className = 'recently-viewed-card';
    card.innerHTML = `
      <div class="recently-viewed-image">
        <i class="fas ${item.type === 'project' ? 'fa-code' : 'fa-briefcase'}"></i>
      </div>
      <div class="recently-viewed-info">
        <h4>${item.title}</h4>
        <p>${item.subtitle}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

// Load recently viewed on page load
document.addEventListener('DOMContentLoaded', loadRecentlyViewed);

// ===== Dynamic Year in Footer =====
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement) {
  const currentYear = new Date().getFullYear();
  yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
}

// ===== Preloader Animation =====
window.addEventListener('load', () => {
  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      document.body.classList.add('loaded');
      console.log('🎵 All systems ready!');
    }, 500); // Reduced to 500ms
  }
});

// Also hide on DOMContentLoaded as backup
document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 800);
  }
});

// ===== Enhanced Card Click Feedback =====
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card-link, .contact-method').forEach(link => {
    link.addEventListener('click', function(e) {
      // Add click ripple effect
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
});

console.log('🎵 Spotify-like portfolio loaded!');

// ===== Queue Panel Functionality =====
document.addEventListener('DOMContentLoaded', () => {
  const queueBtn = document.getElementById('miniQueue');
  const queuePanel = document.getElementById('queuePanel');
  const closeQueue = document.getElementById('closeQueue');
  const recentlyViewedPanel = document.getElementById('recentlyViewedPanel');
  
  if (queueBtn && queuePanel && closeQueue) {
    queueBtn.addEventListener('click', () => {
      queuePanel.classList.toggle('show');
      if (recentlyViewedPanel) {
        recentlyViewedPanel.classList.remove('show');
      }
    });
    
    closeQueue.addEventListener('click', () => {
      queuePanel.classList.remove('show');
    });
    
    // Queue item navigation
    document.querySelectorAll('.queue-item[data-section]').forEach(item => {
      item.addEventListener('click', function() {
        const section = this.dataset.section;
        const targetElement = document.getElementById(section);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          queuePanel.classList.remove('show');
          showNotification(`Navigating to ${this.querySelector('.queue-title').textContent}`);
        }
      });
    });
  }
});

// ===== Recently Viewed Panel =====
document.addEventListener('DOMContentLoaded', () => {
  const historyBtn = document.getElementById('miniHistory');
  const recentlyViewedPanel = document.getElementById('recentlyViewedPanel');
  const closeRecentlyViewed = document.getElementById('closeRecentlyViewed');
  const recentlyViewedContent = document.getElementById('recentlyViewedContent');
  
  let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
  const maxRecent = 10;
  
  function addToRecent(title, type, image, url = null) {
    const timestamp = Date.now();
    
    // Remove if already exists (check by title and url)
    const existing = recentlyViewed.findIndex(item => 
      item.title === title && item.url === url
    );
    
    if (existing !== -1) {
      recentlyViewed.splice(existing, 1);
    }
    
    recentlyViewed.unshift({ title, type, image, timestamp, url });
    
    if (recentlyViewed.length > maxRecent) {
      recentlyViewed.pop();
    }
    
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    updateRecentlyViewedPanel();
  }
  
  function getTimeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  }
  
  function updateRecentlyViewedPanel() {
    if (recentlyViewed.length === 0) {
      recentlyViewedContent.innerHTML = '<p class="empty-state">No recent items yet. Start exploring!</p>';
      return;
    }
    
    recentlyViewedContent.innerHTML = recentlyViewed.map(item => `
      <div class="recent-item" data-url="${item.url || '#'}" data-type="${item.type}" data-title="${item.title}">
        <div class="recent-item-icon">
          ${item.image ? `<img src="${item.image}" alt="${item.title}" style="width: 40px; height: 40px; border-radius: 4px; object-fit: cover;">` : `<i class="fas ${item.type === 'Project' ? 'fa-code' : 'fa-briefcase'}"></i>`}
        </div>
        <div class="recent-item-info">
          <span class="recent-item-title">${item.title}</span>
          <span class="recent-item-type">${item.type}</span>
        </div>
        <span class="recent-item-time">${getTimeAgo(item.timestamp)}</span>
      </div>
    `).join('');
    
    // Add click handlers
    document.querySelectorAll('.recent-item').forEach(item => {
      item.addEventListener('click', function() {
        const url = this.dataset.url;
        if (url && url !== '#' && url !== 'null') {
          window.location.href = url;
        }
      });
    });
  }
  
  if (historyBtn && recentlyViewedPanel && closeRecentlyViewed) {
    historyBtn.addEventListener('click', () => {
      recentlyViewedPanel.classList.toggle('show');
      const queuePanel = document.getElementById('queuePanel');
      if (queuePanel) {
        queuePanel.classList.remove('show');
      }
      updateRecentlyViewedPanel();
    });
    
    closeRecentlyViewed.addEventListener('click', () => {
      recentlyViewedPanel.classList.remove('show');
    });
  }
  
  // Track project clicks
  document.querySelectorAll('#projects .card-link').forEach(link => {
    link.addEventListener('click', function() {
      const titleElement = this.querySelector('.card-title');
      const title = titleElement ? titleElement.childNodes[0].textContent.trim() : 'Unknown Project';
      const url = this.getAttribute('href');
      const img = this.querySelector('.card-image img');
      const imgSrc = img ? img.getAttribute('src') : '';
      addToRecent(title, 'Project', imgSrc, url);
    });
  });
  
  // Track experience clicks
  document.querySelectorAll('#experience .card-link').forEach(link => {
    link.addEventListener('click', function() {
      const titleElement = this.querySelector('.card-title');
      const title = titleElement ? titleElement.childNodes[0].textContent.trim() : 'Unknown Experience';
      const url = this.getAttribute('href');
      const img = this.querySelector('.card-image img');
      const imgSrc = img ? img.getAttribute('src') : '';
      addToRecent(title, 'Experience', imgSrc, url);
    });
  });
  
  // Initialize panel
  updateRecentlyViewedPanel();
  
  // Make addToRecent globally accessible
  window.addToRecent = addToRecent;
});

// ===== Enhanced Mini Player Navigation =====
document.addEventListener('DOMContentLoaded', () => {
  const sections = ['skills', 'projects', 'experience', 'about', 'education', 'certifications', 'contact'];
  let currentSectionIndex = 0;
  
  const prevBtn = document.getElementById('miniPrev');
  const nextBtn = document.getElementById('miniNext');
  const shuffleBtn = document.getElementById('miniShuffle');
  const repeatBtn = document.getElementById('miniRepeat');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentSectionIndex = (currentSectionIndex - 1 + sections.length) % sections.length;
      const targetSection = document.getElementById(sections[currentSectionIndex]);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        showNotification(`Previous: ${sections[currentSectionIndex]}`);
      }
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentSectionIndex = (currentSectionIndex + 1) % sections.length;
      const targetSection = document.getElementById(sections[currentSectionIndex]);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        showNotification(`Next: ${sections[currentSectionIndex]}`);
      }
    });
  }
  
  if (shuffleBtn) {
    let isShuffled = false;
    let originalOrder = [];
    
    shuffleBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      isShuffled = !isShuffled;
      
      if (isShuffled) {
        this.style.color = 'var(--accent)';
        shuffleContent();
        showNotification('Shuffle mode enabled - Content shuffled! 🔀');
      } else {
        this.style.color = '';
        restoreContent();
        showNotification('Shuffle mode disabled - Original order restored');
      }
    });
    
    function shuffleArray(array) {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
    
    function shuffleContent() {
      // Shuffle sections order
      const mainContent = document.querySelector('.content');
      const sections = Array.from(mainContent.querySelectorAll('.section'));
      const heroSection = document.querySelector('.hero-playlist');
      
      // Store original order
      originalOrder = sections.map(section => ({
        element: section,
        parent: section.parentNode,
        nextSibling: section.nextSibling
      }));
      
      // Shuffle sections
      const shuffledSections = shuffleArray(sections);
      
      // Re-append in shuffled order (after hero section)
      shuffledSections.forEach(section => {
        mainContent.appendChild(section);
      });
      
      // Shuffle projects
      const projectCarousel = document.querySelector('#projects .carousel');
      if (projectCarousel) {
        const projectCards = Array.from(projectCarousel.querySelectorAll('.card-link'));
        const shuffledProjects = shuffleArray(projectCards);
        shuffledProjects.forEach(card => projectCarousel.appendChild(card));
      }
      
      // Shuffle experience cards
      const experienceCarousel = document.querySelector('#experience .carousel');
      if (experienceCarousel) {
        const experienceCards = Array.from(experienceCarousel.querySelectorAll('.card-link'));
        const shuffledExperience = shuffleArray(experienceCards);
        shuffledExperience.forEach(card => experienceCarousel.appendChild(card));
      }
      
      // Shuffle skills
      const skillsGrid = document.querySelector('.skills-grid');
      if (skillsGrid) {
        const skillCards = Array.from(skillsGrid.querySelectorAll('.skill-card'));
        const shuffledSkills = shuffleArray(skillCards);
        shuffledSkills.forEach(card => skillsGrid.appendChild(card));
      }
      
      // Shuffle certifications
      const certCarousel = document.querySelector('#certifications .carousel');
      if (certCarousel) {
        const certCards = Array.from(certCarousel.querySelectorAll('.card'));
        const shuffledCerts = shuffleArray(certCards);
        shuffledCerts.forEach(card => certCarousel.appendChild(card));
      }
      
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function restoreContent() {
      // Restore original sections order
      originalOrder.forEach(({ element, parent, nextSibling }) => {
        if (nextSibling && nextSibling.parentNode === parent) {
          parent.insertBefore(element, nextSibling);
        } else {
          parent.appendChild(element);
        }
      });
      
      // Reload page to restore all original orders
      setTimeout(() => {
        location.reload();
      }, 500);
    }
  }
  
  if (repeatBtn) {
    repeatBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      if (this.classList.contains('active')) {
        this.style.color = 'var(--accent)';
        showNotification('Repeat enabled');
      } else {
        this.style.color = '';
        showNotification('Repeat disabled');
      }
    });
  }
});

// ===== Close panels when clicking outside =====
document.addEventListener('click', (e) => {
  const queuePanel = document.getElementById('queuePanel');
  const recentlyViewedPanel = document.getElementById('recentlyViewedPanel');
  const queueBtn = document.getElementById('miniQueue');
  const historyBtn = document.getElementById('miniHistory');
  
  if (queuePanel && !queuePanel.contains(e.target) && e.target !== queueBtn && !queueBtn?.contains(e.target)) {
    queuePanel.classList.remove('show');
  }
  
  if (recentlyViewedPanel && !recentlyViewedPanel.contains(e.target) && e.target !== historyBtn && !historyBtn?.contains(e.target)) {
    recentlyViewedPanel.classList.remove('show');
  }
});

// ===== Skill Filter Functionality =====
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      
      // Update active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter skills with animation
      skillCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
      
      showNotification(`Showing ${filter === 'all' ? 'all' : filter} skills`);
    });
  });
});

// ===== Shuffle Projects =====
document.addEventListener('DOMContentLoaded', () => {
  const shuffleBtn = document.querySelector('.shuffle-all-btn');
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      const carousel = document.querySelector('#projects .carousel');
      const cards = Array.from(carousel.querySelectorAll('.card-link'));
      
      // Shuffle array
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
      
      // Re-append in new order
      cards.forEach(card => carousel.appendChild(card));
      
      showNotification('Projects shuffled! 🔀');
    });
  }
});

// ===== Search Overlay (Cmd+K / Ctrl+K) =====
document.addEventListener('DOMContentLoaded', () => {
  const searchOverlay = document.getElementById('searchOverlay');
  const searchInput = document.getElementById('searchInput');
  const searchClose = document.getElementById('searchClose');
  const searchResults = document.getElementById('searchResults');
  
  // Function to close search
  const closeSearch = () => {
    if (searchOverlay) {
      searchOverlay.classList.remove('active');
      if (searchInput) searchInput.value = '';
    }
  };
  
  // Open search with Ctrl+K or Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (searchOverlay) {
        searchOverlay.classList.add('active');
        if (searchInput) {
          setTimeout(() => searchInput.focus(), 100);
        }
      }
    }
    
    // Close with Escape
    if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
      closeSearch();
    }
  });
  
  // Close button
  if (searchClose) {
    searchClose.addEventListener('click', closeSearch);
  }
  
  // Click outside to close
  if (searchOverlay) {
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        closeSearch();
      }
    });
  }
  
  // Function to add quick links
  const showQuickLinks = () => {
    if (!searchResults) return;
    
    searchResults.innerHTML = `
      <div class="search-section">
        <h4>Quick Links</h4>
        <a href="#about" class="search-result-item">
          <i class="fas fa-user"></i> About Me
        </a>
        <a href="#education" class="search-result-item">
          <i class="fas fa-graduation-cap"></i> Education
        </a>
        <a href="#experience" class="search-result-item">
          <i class="fas fa-briefcase"></i> Experience
        </a>
        <a href="#skills" class="search-result-item">
          <i class="fas fa-cogs"></i> Skills
        </a>
        <a href="#projects" class="search-result-item">
          <i class="fas fa-code"></i> Projects
        </a>
        <a href="#certifications" class="search-result-item">
          <i class="fas fa-certificate"></i> Certifications
        </a>
        <a href="#contact" class="search-result-item">
          <i class="fas fa-envelope"></i> Contact
        </a>
      </div>
    `;
    
    // Add click handlers to all result items
    document.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', closeSearch);
    });
  };
  
  // Initialize with quick links
  showQuickLinks();
  
  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      if (query.length === 0) {
        showQuickLinks();
      } else {
        // Simple search implementation
        const sections = [
          { name: 'About Me', icon: 'fa-user', link: '#about' },
          { name: 'Education', icon: 'fa-graduation-cap', link: '#education' },
          { name: 'Experience', icon: 'fa-briefcase', link: '#experience' },
          { name: 'Skills', icon: 'fa-cogs', link: '#skills' },
          { name: 'Projects', icon: 'fa-code', link: '#projects' },
          { name: 'Certifications', icon: 'fa-certificate', link: '#certifications' },
          { name: 'Contact', icon: 'fa-envelope', link: '#contact' },
        ];
        
        const results = sections.filter(s => s.name.toLowerCase().includes(query));
        
        if (results.length > 0) {
          searchResults.innerHTML = `
            <div class="search-section">
              <h4>Results</h4>
              ${results.map(r => `
                <a href="${r.link}" class="search-result-item">
                  <i class="fas ${r.icon}"></i> ${r.name}
                </a>
              `).join('')}
            </div>
          `;
        } else {
          searchResults.innerHTML = `
            <div class="search-section">
              <p style="padding: 1rem 1.5rem; color: var(--text-light);">No results found</p>
            </div>
          `;
        }
        
        // Add click handlers to search results
        document.querySelectorAll('.search-result-item').forEach(item => {
          item.addEventListener('click', closeSearch);
        });
      }
    });
  }
});

// ===== Volume Control Animation =====
document.addEventListener('DOMContentLoaded', () => {
  const volumeSlider = document.getElementById('volumeSlider');
  const volumeBtn = document.getElementById('volumeBtn');
  
  if (volumeSlider && volumeBtn) {
    volumeSlider.addEventListener('input', (e) => {
      const value = e.target.value;
      const icon = volumeBtn.querySelector('i');
      
      // Change icon based on volume
      if (value == 0) {
        icon.className = 'fas fa-volume-mute';
      } else if (value < 50) {
        icon.className = 'fas fa-volume-down';
      } else {
        icon.className = 'fas fa-volume-up';
      }
      
      // Update slider background
      const percent = (value / 100) * 100;
      volumeSlider.style.background = `linear-gradient(to right, var(--accent) ${percent}%, #404040 ${percent}%)`;
    });
    
    // Mute/unmute on button click
    let previousVolume = 70;
    volumeBtn.addEventListener('click', () => {
      if (volumeSlider.value > 0) {
        previousVolume = volumeSlider.value;
        volumeSlider.value = 0;
      } else {
        volumeSlider.value = previousVolume;
      }
      volumeSlider.dispatchEvent(new Event('input'));
    });
  }
});

// ===== Visitor Counter Animation =====
document.addEventListener('DOMContentLoaded', () => {
  const counter = document.getElementById('visitorCount');
  if (counter) {
    const target = parseInt(counter.textContent.replace(/,/g, ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const animate = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(animate);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };
    
    // Start animation when element is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate();
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(counter);
  }
});

// ===== Now Playing Progress Bar =====
setInterval(() => {
  const progressBar = document.querySelector('.np-progress-bar');
  if (progressBar) {
    // Already animated via CSS
  }
}, 3000);

console.log('🎵 Advanced Spotify features loaded!');

// ===== Mini Player Functionality =====
document.addEventListener('DOMContentLoaded', () => {
  const miniPlay = document.getElementById('miniPlay');
  const miniLike = document.querySelector('.mini-player-like');
  const miniProgressBar = document.querySelector('.mini-progress-bar');
  const miniProgressFill = document.getElementById('miniProgressFill');
  const miniProgressHandle = document.querySelector('.mini-progress-handle');
  const miniCurrentTime = document.getElementById('miniCurrentTime');
  const miniTotalTime = document.getElementById('miniTotalTime');
  
  let isPlaying = false;
  let currentTime = 0;
  let duration = 225; // 3:45 in seconds
  let progressInterval;
  let autoScrollInterval;
  
  // Format time (seconds to M:SS)
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };
  
  // Auto-scroll functionality
  const startAutoScroll = () => {
    // Smooth auto-scroll
    autoScrollInterval = setInterval(() => {
      // Use different scroll method for better mobile compatibility
      const scrollAmount = 2;
      window.scrollBy(0, scrollAmount);
      
      // Stop at bottom
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
      }
    }, 50); // Every 50ms
  };
  
  const stopAutoScroll = () => {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
    }
  };
  
  // Play/Pause
  if (miniPlay) {
    miniPlay.addEventListener('click', () => {
      isPlaying = !isPlaying;
      const icon = miniPlay.querySelector('i');
      
      if (isPlaying) {
        icon.className = 'fas fa-pause';
        progressInterval = setInterval(() => {
          currentTime += 0.1;
          if (currentTime >= duration) {
            currentTime = 0;
          }
          updateProgress();
        }, 100);
        startAutoScroll();
        showToast('Now Playing', 'Exploring Portfolio - Auto-scrolling enabled', 'success');
      } else {
        icon.className = 'fas fa-play';
        clearInterval(progressInterval);
        stopAutoScroll();
        showToast('Paused', 'Playback paused - Auto-scroll stopped', 'info');
      }
    });
  }
  
  // Update progress bar
  const updateProgress = () => {
    const percent = (currentTime / duration) * 100;
    if (miniProgressFill) miniProgressFill.style.width = `${percent}%`;
    if (miniProgressHandle) miniProgressHandle.style.left = `${percent}%`;
    if (miniCurrentTime) miniCurrentTime.textContent = formatTime(currentTime);
  };
  
  // Click on progress bar to seek
  if (miniProgressBar) {
    miniProgressBar.addEventListener('click', (e) => {
      const rect = miniProgressBar.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      currentTime = percent * duration;
      updateProgress();
    });
  }
  
  // Like button with heart fill
  if (miniLike) {
    miniLike.addEventListener('click', () => {
      miniLike.classList.toggle('active');
      const icon = miniLike.querySelector('i');
      
      if (miniLike.classList.contains('active')) {
        icon.className = 'fas fa-heart'; // Filled heart
        miniLike.style.color = 'var(--accent)';
        showToast('Added to Liked', 'Portfolio added to your favorites', 'success');
      } else {
        icon.className = 'far fa-heart'; // Outline heart
        miniLike.style.color = '';
        showToast('Removed from Liked', 'Portfolio removed from favorites', 'info');
      }
    });
  }
  
  // Shuffle button
  const miniShuffle = document.getElementById('miniShuffle');
  if (miniShuffle) {
    miniShuffle.addEventListener('click', () => {
      miniShuffle.classList.toggle('active');
      if (miniShuffle.classList.contains('active')) {
        miniShuffle.style.color = 'var(--accent)';
      } else {
        miniShuffle.style.color = '';
      }
      showToast('Shuffle', miniShuffle.classList.contains('active') ? 'Shuffle on' : 'Shuffle off', 'info');
    });
  }
  
  // Repeat button
  const miniRepeat = document.getElementById('miniRepeat');
  if (miniRepeat) {
    miniRepeat.addEventListener('click', () => {
      miniRepeat.classList.toggle('active');
      if (miniRepeat.classList.contains('active')) {
        miniRepeat.style.color = 'var(--accent)';
      } else {
        miniRepeat.style.color = '';
      }
      showToast('Repeat', miniRepeat.classList.contains('active') ? 'Repeat on' : 'Repeat off', 'info');
    });
  }
  
  // Volume control
  const miniVolumeSlider = document.getElementById('miniVolumeSlider');
  const miniVolumeBtn = document.getElementById('miniVolumeBtn');
  
  if (miniVolumeSlider && miniVolumeBtn) {
    miniVolumeSlider.addEventListener('input', (e) => {
      const value = e.target.value;
      const icon = miniVolumeBtn.querySelector('i');
      
      if (value == 0) {
        icon.className = 'fas fa-volume-mute';
      } else if (value < 50) {
        icon.className = 'fas fa-volume-down';
      } else {
        icon.className = 'fas fa-volume-up';
      }
      
      const percent = value;
      miniVolumeSlider.style.background = `linear-gradient(to right, var(--accent) ${percent}%, #404040 ${percent}%)`;
    });
    
    // Initialize volume slider background
    miniVolumeSlider.dispatchEvent(new Event('input'));
  }
  
  // Stop auto-scroll when user manually scrolls
  let scrollTimeout;
  let hasShownScrollToast = false;
  window.addEventListener('wheel', () => {
    if (isPlaying && autoScrollInterval) {
      stopAutoScroll();
      
      // Update play button to show paused state
      isPlaying = false;
      if (miniPlay) {
        const icon = miniPlay.querySelector('i');
        if (icon) {
          icon.className = 'fas fa-play';
        }
      }
      clearInterval(progressInterval);
      
      // Only show toast once per auto-scroll session
      if (!hasShownScrollToast) {
        showToast('Auto-scroll', 'Manual scroll detected - Auto-scroll paused', 'info');
        hasShownScrollToast = true;
      }
    }
  }, { passive: true });
  
  // Reset toast flag when play/pause is toggled
  if (miniPlay) {
    miniPlay.addEventListener('click', () => {
      hasShownScrollToast = false;
    });
  }
});

// ===== Toast Notification System =====
function showToast(title, message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const iconMap = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    info: 'fa-info-circle'
  };
  
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fas ${iconMap[type]}"></i>
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  container.appendChild(toast);
  
  // Close button
  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.style.animation = 'slideInRight 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  });
  
  // Auto-remove after 4 seconds
  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.animation = 'slideInRight 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }
  }, 4000);
}

// ===== Section Change Detection (Update Mini Player) =====
let currentSection = 'About Me';
const sectionTitles = {
  'about': 'About Me',
  'education': 'Education',
  'experience': 'Experience',
  'skills': 'Skills',
  'projects': 'Projects',
  'certifications': 'Certifications',
  'contact': 'Contact'
};

const sectionIcons = {
  'about': 'fa-user',
  'education': 'fa-graduation-cap',
  'experience': 'fa-briefcase',
  'skills': 'fa-cogs',
  'projects': 'fa-code',
  'certifications': 'fa-certificate',
  'contact': 'fa-envelope'
};

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.section');
  const scrollPos = window.pageYOffset + 300;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      const newSection = sectionTitles[sectionId];
      if (newSection && newSection !== currentSection) {
        currentSection = newSection;
        
        // Update mini player title
        const miniPlayerTitle = document.getElementById('miniPlayerTitle');
        if (miniPlayerTitle) {
          miniPlayerTitle.textContent = `Viewing ${currentSection}`;
        }
        
        // Update mini player icon
        const miniPlayerIcon = document.getElementById('miniPlayerIcon');
        if (miniPlayerIcon && sectionIcons[sectionId]) {
          miniPlayerIcon.className = `fas ${sectionIcons[sectionId]}`;
        }
      }
    }
  });
});

// ===== Enhanced Notification for existing showNotification =====
const originalShowNotification = window.showNotification || function() {};
window.showNotification = function(message) {
  showToast('Notification', message, 'info');
};

console.log('🎵 Mini Player and advanced features loaded!');

// ===== Certificate Modal =====
document.addEventListener('DOMContentLoaded', () => {
  const certModal = document.getElementById('certModal');
  const certModalClose = document.getElementById('certModalClose');
  const certLinks = document.querySelectorAll('.cert-link');
  
  // Certificate data - place certificate images in cert_images folder
  const certificates = {
    'data_analytics_cert.jpg': {
      title: 'Google Data Analytics Certified',
      issuer: 'Google',
      date: 'December 2023',
      image: 'cert_images/data_analytics_cert.jpg',
      download: 'cert_images/data_analytics_cert.jpg'
    },
    'cert2.jpg': {
      title: 'Python Programming',
      issuer: 'Programming Hub',
      date: 'October 2023',
      image: 'cert_images/cert2.jpg',
      download: 'cert_images/cert2.jpg'
    },
    'cert3.jpg': {
      title: 'Data Visualization',
      issuer: 'Tableau',
      date: 'September 2023',
      image: 'cert_images/cert3.jpg',
      download: 'cert_images/cert3.jpg'
    },
    'cert4.jpg': {
      title: 'Flutter Development',
      issuer: 'Udemy',
      date: 'August 2023',
      image: 'cert_images/cert4.jpg',
      download: 'cert_images/cert4.jpg'
    },
    'cert5.jpg': {
      title: 'Digital Marketing',
      issuer: 'Meta Blueprint',
      date: 'July 2023',
      image: 'cert_images/cert5.jpg',
      download: 'cert_images/cert5.jpg'
    }
  };
  
  // Open certificate modal
  certLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const certImage = link.dataset.cert;
      const certDate = link.dataset.date;
      const certIssuer = link.dataset.issuer;
      const certTitle = link.querySelector('.card-title').textContent;
      
      if (certModal) {
        document.getElementById('certTitle').textContent = certTitle;
        document.getElementById('certIssuer').textContent = `Issued by ${certIssuer}`;
        document.getElementById('certDate').textContent = `Date: ${certDate}`;
        document.getElementById('certImage').src = `cert_images/${certImage}`;
        document.getElementById('certDownload').href = `cert_images/${certImage}`;
        
        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  // Close modal
  if (certModalClose) {
    certModalClose.addEventListener('click', () => {
      certModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }
  
  // Close on overlay click
  if (certModal) {
    certModal.querySelector('.cert-modal-overlay').addEventListener('click', () => {
      certModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
      certModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
});

console.log('🎵 Certificate viewer loaded!');
