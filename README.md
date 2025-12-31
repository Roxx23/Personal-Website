# 🎵 Ayush Bora - Spotify-Inspired Portfolio

A modern, responsive portfolio website inspired by Spotify's sleek design and user experience.

## 🚀 Quick Start

Simply open `index.html` in your web browser to view the portfolio.

## 📁 File Structure

```
websitee2/
├── index.html          # Main portfolio page
├── project1.html       # Project detail pages
├── project2.html
├── style.css          # All styling
├── script.js          # Interactive features
├── Resume.pdf         # Your resume
├── IMG_0277.JPG       # Profile picture
├── logos/             # Skill and project images
├── experience_logos/  # Company logos
├── FEATURES.md        # Detailed feature list
└── README.md          # This file
```

## ✨ Key Features

### 🎨 Design
- **Spotify-inspired dark theme** with signature green accent
- **Responsive design** - Desktop, tablet, and mobile optimized
- **Smooth animations** - Fade-ins, hover effects, transitions
- **Loading screen** - Animated Spotify-style loader

### 📱 Navigation
- **Desktop**: Fixed sidebar navigation
- **Mobile**: Bottom navigation bar (Spotify-style)
- **Auto-highlighting** - Active section tracking
- **Smooth scrolling** - Click menu items to jump to sections

### 🎯 Sections
1. **Hero/Profile** - Large banner with gradient and profile pic
2. **About Me** - Bio with quick stats dashboard
3. **Education** - Academic background
4. **Skills** - Technical skills grid (12+ skills)
5. **Projects** - Scrollable project carousel (5 projects)
6. **Experience** - Work history carousel (5 companies)
7. **Certifications** - Certificate showcase (5 certs)
8. **Contact** - Contact form and social links
9. **Footer** - Site-wide footer with links

### ⚡ Interactive Features
- **Horizontal carousels** - Mouse wheel scrolling
- **Hover effects** - Play buttons, lift effects
- **Form validation** - Contact form with notifications
- **Back to top button** - Appears when scrolling
- **Keyboard shortcuts** - Space, Home, End, Ctrl+Arrows
- **Click ripples** - Material Design style feedback
- **Lazy loading** - Images load as needed

### ♿ Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus visible states
- Reduced motion support

## 🎨 Customization

### Update Your Info

**1. Personal Details** (`index.html`)
```html
<!-- Line 21-22: Name and title -->
<h1>Your Name</h1>
<p class="position">Your Position @ Company</p>

<!-- Line 52-53: Hero section -->
<h1>Your Name</h1>
<p class="role">Your Title</p>

<!-- Update About section, stats, etc. -->
```

**2. Contact Information** (`index.html`)
```html
<!-- Around line 350: Update email, phone, LinkedIn, GitHub -->
<a href="mailto:your.email@example.com">
<a href="https://linkedin.com/in/yourprofile">
```

**3. Profile Picture**
- Replace `IMG_0277.JPG` with your photo
- Update references in HTML if filename changes

**4. Resume**
- Replace `Resume.pdf` with your resume

**5. Skills** (`index.html`)
- Add/remove skill cards in the skills grid
- Update images in `/logos/` folder

**6. Projects**
- Add/remove project cards
- Update images in `/logos/` folder
- Create new `projectX.html` pages if needed

**7. Experience**
- Add/remove experience cards
- Update logos in `/experience_logos/` folder

**8. Certifications**
- Add/remove certification cards
- Icons auto-generate or add images

### Change Colors

**In `style.css`**, line 7-14:
```css
:root {
  --accent: #1DB954;        /* Change to your brand color */
  --bg-dark: #121212;       /* Main dark background */
  --bg-secondary: #181818;  /* Secondary background */
  --text-light: #b3b3b3;    /* Light text color */
  --text-white: #fff;       /* White text */
}
```

**Popular color schemes:**
- Spotify Green: `#1DB954`
- YouTube Red: `#FF0000`
- Twitter Blue: `#1DA1F2`
- Instagram Purple: `#E1306C`

### Add New Section

1. **Add HTML** in `index.html`:
```html
<section id="newsection" class="section">
  <h3 class="section-title">New Section</h3>
  <div class="content">
    <!-- Your content -->
  </div>
</section>
```

2. **Add Menu Item** in sidebar:
```html
<li><a href="#newsection"><i class="fas fa-icon"></i><span>New Section</span></a></li>
```

3. JavaScript will automatically:
   - Enable smooth scrolling
   - Track active section
   - Add fade-in animation

## ⌨️ Keyboard Shortcuts

- `Space` - Scroll down one viewport
- `Home` - Jump to top
- `End` - Jump to bottom
- `Ctrl + ↑` - Smooth scroll up
- `Ctrl + ↓` - Smooth scroll down

## 🌐 Browser Support

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## 📱 Responsive Breakpoints

- **Desktop**: > 768px - Full sidebar, multi-column
- **Tablet**: 480px - 768px - Bottom nav, adapted layouts
- **Mobile**: < 480px - Icon-only nav, single column

## 🛠️ Technologies

- **HTML5** - Semantic markup
- **CSS3** - Grid, Flexbox, Animations
- **JavaScript ES6+** - Vanilla JS, no frameworks
- **Font Awesome 6** - Icons
- **Google Fonts** - Montserrat

## 📝 To-Do / Enhancement Ideas

- [ ] Add dark/light theme toggle
- [ ] Add more projects with detail pages
- [ ] Integrate blog section
- [ ] Add testimonials/recommendations
- [ ] Connect contact form to backend
- [ ] Add Google Analytics
- [ ] Add SEO meta tags
- [ ] Create favicon
- [ ] Add Open Graph images for social sharing
- [ ] Add animations with GSAP or Anime.js
- [ ] Add 3D effects with Three.js

## 🐛 Known Issues

None currently! If you find any, feel free to fix them.

## 📄 License

This portfolio template is free to use for personal and commercial projects.

## 👨‍💻 Author

**Ayush Bora**
- LinkedIn: [linkedin.com/in/ayushbora](https://linkedin.com/in/ayushbora)
- Product Manager & Developer @ RightSol

---

## 🎉 Credits

Inspired by:
- **Spotify** - Design and UX patterns
- **Material Design** - Ripple effects
- **Modern web best practices**

Built with ❤️ and 🎵

---

**Need help?** Check `FEATURES.md` for detailed documentation of all features.

**Last Updated**: December 2024
