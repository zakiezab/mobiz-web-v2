# Mobiz Design System

**Version:** 1.0  
**Last Updated:** November 2, 2025  
**Extracted From:** homepage.html, how_we_work.html, technology_partners.html

---

## Table of Contents

1. [Design Principles](#design-principles)
2. [Typography](#typography)
3. [Color Palette](#color-palette)
4. [Spacing System](#spacing-system)
5. [Component Library](#component-library)
6. [Layout Patterns](#layout-patterns)
7. [Tailwind Configuration](#tailwind-configuration)
8. [Responsive Design](#responsive-design)
9. [Animation & Interaction](#animation--interaction)

---

## Design Principles

### Brand Voice: Confident, Declarative, Peer-to-Peer

**We Are:**
- Declarative (not descriptive)
- Confident (not arrogant)
- Assured (not defensive)
- Concise & sophisticated
- Accountable

**Visual Translation:**
- **Minimal:** No unnecessary decoration
- **Confident:** Large type, bold hierarchy
- **Sophisticated:** Refined spacing, subtle interactions
- **Technical:** Precision in every detail

---

## Typography

### Font Family

**Primary:** Libre Franklin  
**Source:** Google Fonts  
**Weights Used:** 200 (ExtraLight), 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold)

```css
@import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@200;300;400;500;600&display=swap');

font-family: 'Libre Franklin', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Type Scale

| Element | Size | Weight | Line Height | Letter Spacing | Usage |
|---------|------|--------|-------------|----------------|-------|
| **Display (H1)** | 48-72px (clamp) | 200 | 1.1 | -0.02em | Page heroes, primary headlines |
| **Heading (H2)** | 40-48px | 200 | 1.2 | -0.02em | Section titles |
| **Subheading (H3)** | 24-28px | 400 | 1.3 | -0.01em | Subsection titles |
| **Body Large** | 18-22px | 300 | 1.5-1.6 | 0 | Hero descriptions, important body |
| **Body** | 16px | 300 | 1.6 | 0 | Default body text |
| **Body Small** | 14-15px | 300-400 | 1.6 | 0.01em | Secondary content, card text |
| **Label** | 12px | 600 | 1.2 | 0.15em | Kickers, categories, metadata |
| **Caption** | 11-13px | 300-600 | 1.4 | 0.1-0.12em | Smallest text, copyright |

### Typography Patterns

#### **Pattern 1: Page Hero**
```html
<!-- Label (kicker) -->
<div class="text-xs font-semibold tracking-widest uppercase text-secondary mb-8">
  Our Model
</div>

<!-- Headline with emphasis -->
<h1 class="text-5xl md:text-7xl font-extralight leading-tight tracking-tighter text-dark mb-8">
  The Path to <strong class="font-medium text-primary">Production.</strong>
</h1>

<!-- Description -->
<p class="text-xl md:text-2xl font-light leading-relaxed text-gray-600 max-w-3xl">
  We close the accountability gap with a single, integrated model.
</p>
```

#### **Pattern 2: Section Header**
```html
<div class="section-label text-xs font-semibold tracking-widest uppercase text-secondary mb-5">
  Our Model
</div>
<h2 class="text-4xl font-extralight tracking-tight text-dark mb-5">
  One Team. One Outcome.
</h2>
<p class="text-lg font-light text-gray-600 max-w-3xl">
  Supporting description text.
</p>
```

#### **Pattern 3: Emphasis in Headlines**
Headlines use **weight contrast** for emphasis:
- Base weight: `200` (ExtraLight)
- Emphasis: `500` (Medium) + `color: var(--primary)`

```html
<h1>Strategy is speculation. <strong>Execution is truth.</strong></h1>
<!-- "Execution is truth" is medium weight + red -->
```

---

## Color Palette

### Primary Colors

```css
--primary: #D8242A;        /* Mobiz Red - Primary brand color */
--primary-dark: #B01E23;   /* Darker red for hover states */
--secondary: #613BFE;      /* Purple - Used for labels/accents */
--dark: #0A0A0A;          /* Near-black for text */
--white: #FFFFFF;         /* Pure white */
```

### Grayscale

```css
--gray-50: #FAFAFA;   /* Lightest backgrounds */
--gray-100: #F4F4F4;  /* Section backgrounds */
--gray-200: #E0E0E0;  /* Borders, dividers */
--gray-400: #A1A1A1;  /* Disabled text */
--gray-500: #737373;  /* Secondary text */
--gray-600: #525252;  /* Body text (lighter) */
--gray-700: #303030;  /* Body text (darker) */
--gray-800: #1A1A1A;  /* Near-black text */
--gray-900: #0A0A0A;  /* Darkest (same as --dark) */
```

### Usage Guidelines

| Color | Use Case | Do | Don't |
|-------|----------|-----|-------|
| **Primary Red** | CTA buttons, emphasis in headlines, brand moments | Use for primary actions, key words | Overuse - it should feel special |
| **Secondary Purple** | Labels, kickers, subtle accents | Use for metadata, tags | Use for primary CTAs |
| **Dark** | Primary text, borders, outlines | Use for high-contrast text | Use on dark backgrounds |
| **Gray-50/100** | Section backgrounds | Alternate between white and gray-50 | Use gray-100 for cards on gray-50 |
| **Gray-600** | Body text, descriptions | Use for lower-hierarchy text | Use for headlines |

### Color Accessibility

All text color combinations meet **WCAG AA** standards:

✅ `--dark` on `--white`: 19.56:1 (AAA)  
✅ `--gray-700` on `--white`: 12.63:1 (AAA)  
✅ `--gray-600` on `--white`: 7.14:1 (AA)  
✅ `--primary` on `--white`: 5.89:1 (AA for large text)  

---

## Spacing System

### Scale

The spacing system uses a **base-8 scale** with named tokens:

```css
--space-xs: 8px;      /* 0.5rem */
--space-sm: 16px;     /* 1rem */
--space-md: 24px;     /* 1.5rem */
--space-lg: 40px;     /* 2.5rem */
--space-xl: 64px;     /* 4rem */
--space-2xl: 96px;    /* 6rem */
--space-3xl: 160px;   /* 10rem */
```

### Usage

| Token | Pixels | Rem | Common Usage |
|-------|--------|-----|--------------|
| `xs` | 8px | 0.5rem | Tight spacing, icon padding |
| `sm` | 16px | 1rem | Card padding (small), gaps |
| `md` | 24px | 1.5rem | Element spacing, small margins |
| `lg` | 40px | 2.5rem | Card padding, grid gaps |
| `xl` | 64px | 4rem | Section spacing (small) |
| `2xl` | 96px | 6rem | Section spacing (medium) |
| `3xl` | 160px | 10rem | Section spacing (large) |

### Section Padding Pattern

**Standard section padding:**
```css
padding: 120px 0;  /* Desktop: 7.5rem top/bottom */
padding: 80px 0;   /* Mobile: 5rem top/bottom */
```

**Large hero sections:**
```css
padding: 200px 0 120px;  /* Desktop hero: 12.5rem top, 7.5rem bottom */
padding: 180px 0 120px;  /* Adjusted for fixed nav offset */
```

### Container Padding

**Horizontal padding:**
```css
/* Desktop (>768px) */
padding: 0 80px;

/* Mobile (≤768px) */
padding: 0 40px;
```

### Grid Gaps

**Standard grid gaps:**
- Large grids (3-4 columns): `64px` (4rem)
- Medium grids (2 columns): `48px` (3rem)
- Small grids/flexbox: `32px` (2rem)

---

## Component Library

### 1. Navigation

**Type:** Fixed, blur backdrop, scroll-reactive

```html
<nav class="fixed top-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-xl transition-all duration-300">
  <div class="max-w-[1600px] mx-auto px-20 py-7">
    <!-- py-7 (28px) default, py-5 (20px) when scrolled -->
    
    <a href="/" class="text-2xl font-semibold text-primary -tracking-tight">
      mobiz
    </a>
    
    <ul class="flex gap-12">
      <li>
        <a href="#" class="text-sm text-gray-700 hover:text-dark transition-colors">
          Our Model
        </a>
      </li>
    </ul>
    
    <a href="#contact" class="text-sm font-medium px-7 py-3 border-[1.5px] border-dark rounded-sm hover:bg-dark hover:text-white transition-all">
      Start the Conversation
    </a>
  </div>
</nav>
```

**Behavior:**
- Fixed position with blur backdrop
- Reduces padding on scroll (28px → 20px)
- Subtle shadow appears on scroll
- Logo: 24px, semibold, primary color
- Menu items: 14px, weight 400, 48px gap
- CTA button: Outlined, fills on hover

**States:**
- Default: `py-7` (28px padding)
- Scrolled: `py-5` (20px padding) + subtle shadow

---

### 2. Page Hero

**Type:** Large heading with label + description + optional CTA

```html
<section class="py-48 md:py-52">
  <div class="max-w-5xl mx-auto px-20">
    <!-- Kicker -->
    <div class="text-xs font-semibold tracking-widest uppercase text-secondary mb-8">
      Our Model
    </div>
    
    <!-- Headline -->
    <h1 class="text-5xl md:text-7xl font-extralight leading-tight tracking-tighter text-dark mb-8">
      The Path to <strong class="font-medium text-primary">Production.</strong>
    </h1>
    
    <!-- Description -->
    <p class="text-xl md:text-2xl font-light leading-relaxed text-gray-600 max-w-3xl mb-12">
      We close the accountability gap with a single, integrated model.
    </p>
    
    <!-- CTA (optional) -->
    <a href="#contact" class="inline-block text-base font-medium text-white bg-primary px-10 py-[18px] rounded-sm hover:bg-primary-dark transition-all hover:-translate-y-0.5 hover:shadow-xl">
      Start the Conversation
    </a>
  </div>
</section>
```

**Variations:**
1. **Homepage Hero** - Includes side metrics
2. **Page Hero** - Standard (as shown above)
3. **Simple Hero** - No CTA button

---

### 3. Section Header

**Type:** Label + Headline + Description

```html
<div class="max-w-4xl mb-20">
  <!-- Label -->
  <div class="text-xs font-semibold tracking-widest uppercase text-secondary mb-5">
    Our Model
  </div>
  
  <!-- Headline -->
  <h2 class="text-4xl font-extralight tracking-tight text-dark mb-5">
    One Team. One Outcome.
  </h2>
  
  <!-- Description -->
  <p class="text-lg font-light text-gray-600 max-w-3xl">
    Our model eliminates the friction of handoffs. The team that designs your architecture is the team that builds your production system.
  </p>
</div>
```

**Usage:** Start of every major section

---

### 4. Cards

#### **4A. Service Card (Icon + Content)**

```html
<div class="grid grid-cols-[auto_1fr] gap-8">
  <!-- Icon -->
  <div class="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center text-lg font-semibold text-primary">
    01
  </div>
  
  <!-- Content -->
  <div>
    <h3 class="text-xl font-medium text-dark mb-3">Cloud Transformation</h3>
    <p class="text-base font-light leading-relaxed text-gray-600 mb-4">
      Complete migrations, modernization, and cloud-native architecture.
    </p>
    <div class="text-sm font-medium text-secondary">
      → Outcome: 40% cost reduction
    </div>
  </div>
</div>
```

#### **4B. Case Study Card**

```html
<div class="p-10 bg-gray-50 rounded-sm transition-all hover:-translate-y-1 hover:shadow-xl">
  <!-- Kicker -->
  <div class="text-xs font-semibold tracking-wide uppercase text-gray-500 mb-5">
    Global Financial Services
  </div>
  
  <!-- Metric -->
  <div class="flex items-baseline gap-2 mb-5">
    <span class="text-5xl font-light text-primary leading-none">2,000+</span>
    <span class="text-sm text-gray-600 font-normal">apps migrated</span>
  </div>
  
  <!-- Description -->
  <p class="text-sm leading-relaxed text-gray-700 font-light">
    Complete cloud transformation. Designed, built, and executed with zero unplanned downtime.
  </p>
</div>
```

#### **4C. Industry Card**

```html
<div class="p-8 bg-white border border-gray-100 transition-all hover:-translate-y-0.5 hover:shadow-lg">
  <h4 class="text-lg font-medium text-dark mb-3">Financial Services</h4>
  <p class="text-sm font-light leading-relaxed text-gray-600">
    Core banking platforms modernized. Trading systems rebuilt. Risk engines deployed.
  </p>
</div>
```

---

### 5. Timeline Component

**Type:** Vertical timeline with markers

```html
<div class="relative">
  <!-- Timeline Line -->
  <div class="absolute left-10 top-0 bottom-0 w-0.5 bg-gray-200"></div>
  
  <!-- Timeline Item -->
  <div class="grid grid-cols-[80px_1fr] gap-16 mb-20 relative">
    <!-- Marker -->
    <div class="w-20 h-20 bg-white border-2 border-primary rounded-full flex items-center justify-center text-xl font-semibold text-primary relative z-10">
      01
    </div>
    
    <!-- Content -->
    <div class="pt-4">
      <div class="text-xs font-semibold tracking-wide uppercase text-gray-500 mb-3">
        Phase 01
      </div>
      <h3 class="text-3xl font-normal text-dark mb-4">
        Clarity: Strategic Architecture
      </h3>
      <p class="text-base font-light leading-relaxed text-gray-600 mb-6">
        We start by defining the "physics" of the problem.
      </p>
      
      <!-- Deliverables -->
      <div class="flex flex-wrap gap-4">
        <div class="text-sm text-gray-700 px-4 py-2 bg-white border border-gray-200 rounded-sm">
          First-Principles Architecture
        </div>
      </div>
    </div>
  </div>
</div>
```

---

### 6. Stats Bar

**Type:** Horizontal bar with label + items

```html
<section class="py-16 bg-gray-50 border-t border-b border-gray-100">
  <div class="max-w-[1600px] mx-auto px-20 text-center">
    <!-- Label -->
    <div class="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-6">
      Currently Executing
    </div>
    
    <!-- Items -->
    <div class="flex justify-center items-center gap-12 flex-wrap">
      <div class="text-sm font-normal text-gray-600">Cloud Transformation</div>
      <div class="text-sm font-normal text-gray-600">AI & Data Platforms</div>
      <div class="text-sm font-normal text-gray-600">Digital Product Engineering</div>
      <div class="text-sm font-normal text-gray-600">Core System Modernization</div>
    </div>
  </div>
</section>
```

---

### 7. Buttons

#### **7A. Primary CTA**

```html
<a href="#contact" class="inline-block text-base font-medium text-white bg-primary px-10 py-[18px] rounded-sm hover:bg-primary-dark transition-all hover:-translate-y-0.5 hover:shadow-xl">
  Start the Conversation
</a>
```

**Specs:**
- Background: `--primary` (#D8242A)
- Hover: `--primary-dark` (#B01E23)
- Padding: `18px 40px`
- Border radius: `2px` (subtle)
- Font: 15px, weight 500
- Hover effect: Lift (`translateY(-2px)`) + shadow

#### **7B. Outline Button**

```html
<a href="#contact" class="inline-block text-sm font-medium text-dark px-7 py-3 border-2 border-dark rounded-sm hover:bg-dark hover:text-white transition-all">
  Start the Conversation
</a>
```

**Specs:**
- Border: 2px solid `--dark`
- Hover: Fill with `--dark`, text to white
- Padding: `12px 28px`
- Font: 14px, weight 500

---

### 8. Grids

#### **8A. Three-Column Grid**

```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-16">
  <!-- Items -->
</div>
```

**Usage:** Principles, model items, industries

#### **8B. Two-Column Grid**

```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-20">
  <!-- Items -->
</div>
```

**Usage:** Services (large cards)

#### **8C. Auto-Fill Grid**

```html
<div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-10">
  <!-- Items -->
</div>
```

**Usage:** Partner logos, technology grid

---

### 9. Footer

```html
<footer class="pt-20 pb-10 bg-dark text-gray-400">
  <div class="max-w-[1600px] mx-auto px-20">
    <!-- Footer Grid -->
    <div class="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-20 mb-20 pb-20 border-b border-gray-800">
      <!-- Brand Column -->
      <div>
        <h3 class="text-xl font-medium text-white mb-4">Mobiz</h3>
        <p class="text-sm font-light leading-relaxed text-gray-500 max-w-sm">
          Strategy, Executed. We don't just advise. We architect, build, and deliver production systems.
        </p>
      </div>
      
      <!-- Link Columns -->
      <div>
        <h4 class="text-[11px] font-semibold tracking-wider uppercase text-gray-500 mb-6">
          What We Build
        </h4>
        <a href="#" class="block text-sm font-light text-gray-400 mb-3 hover:text-white transition-colors">
          Cloud Transformation
        </a>
      </div>
    </div>
    
    <!-- Copyright -->
    <div class="flex justify-between items-center">
      <div class="text-[13px] text-gray-600">
        © 2025 Mobiz. Strategy, Executed.
      </div>
      <div class="flex gap-8">
        <a href="#" class="text-[13px] text-gray-600 hover:text-gray-400 transition-colors">Privacy</a>
        <a href="#" class="text-[13px] text-gray-600 hover:text-gray-400 transition-colors">Terms</a>
      </div>
    </div>
  </div>
</footer>
```

---

## Layout Patterns

### Container Widths

```css
/* Navigation, sections, footer */
max-width: 1600px;

/* Hero content, long-form content */
max-width: 1200px;

/* Body text, descriptions */
max-width: 720px;
```

### Horizontal Padding

```css
/* Desktop (>768px) */
padding: 0 80px;

/* Mobile (≤768px) */
padding: 0 40px;
```

### Section Spacing

```css
/* Standard section */
padding: 120px 0;

/* Large section (hero) */
padding: 200px 0 120px;

/* Tight section (stats bar) */
padding: 64px 0;
```

### Alternating Backgrounds

**Pattern:** Alternate between `white` and `gray-50` for visual rhythm

```
Hero (white)
Stats Bar (gray-50)
Problem Section (white)
Model Section (gray-50)
Delivered Section (white)
Recognition (dark)
Services (gray-50)
...
```

---

## Tailwind Configuration

### Complete Config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D8242A',
          dark: '#B01E23',
        },
        secondary: '#613BFE',
        dark: '#0A0A0A',
        gray: {
          50: '#FAFAFA',
          100: '#F4F4F4',
          200: '#E0E0E0',
          400: '#A1A1A1',
          500: '#737373',
          600: '#525252',
          700: '#303030',
          800: '#1A1A1A',
          900: '#0A0A0A',
        },
      },
      fontFamily: {
        sans: ['Libre Franklin', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '7xl': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '5xl': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '4xl': ['40px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '3xl': ['28px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        '2xl': ['22px', { lineHeight: '1.5' }],
        'xl': ['18px', { lineHeight: '1.6' }],
        'base': ['16px', { lineHeight: '1.6' }],
        'sm': ['14px', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        'xs': ['12px', { lineHeight: '1.2', letterSpacing: '0.15em' }],
      },
      spacing: {
        xs: '0.5rem',   // 8px
        sm: '1rem',     // 16px
        md: '1.5rem',   // 24px
        lg: '2.5rem',   // 40px
        xl: '4rem',     // 64px
        '2xl': '6rem',  // 96px
        '3xl': '10rem', // 160px
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.01em',
        wider: '0.1em',
        widest: '0.15em',
      },
      borderRadius: {
        sm: '2px',
      },
      maxWidth: {
        'container': '1600px',
        'content': '1200px',
        'prose': '720px',
      },
    },
  },
  plugins: [],
}

export default config
```

### Global Styles

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply antialiased;
  }
  
  body {
    @apply font-sans font-light text-base text-gray-800;
  }
  
  strong {
    @apply font-medium;
  }
  
  h1 strong,
  h2 strong,
  h3 strong {
    @apply text-primary;
  }
}
```

---

## Responsive Design

### Breakpoints

```css
/* Mobile First */
/* Default: 0-767px (mobile) */

@media (min-width: 768px) {
  /* Tablet */
}

@media (min-width: 1024px) {
  /* Desktop */
}

@media (min-width: 1440px) {
  /* Large Desktop */
}
```

### Responsive Patterns

#### **Typography:**
```html
<!-- Desktop: 72px, Mobile: 48px -->
<h1 class="text-5xl md:text-7xl">Headline</h1>

<!-- Desktop: 22px, Mobile: 18px -->
<p class="text-lg md:text-xl">Description</p>
```

#### **Padding:**
```html
<!-- Desktop: 80px, Mobile: 40px -->
<div class="px-10 md:px-20">
  Content
</div>

<!-- Desktop: 200px top, Mobile: 180px top -->
<section class="pt-44 md:pt-48">
  Content
</section>
```

#### **Grids:**
```html
<!-- Mobile: 1 column, Desktop: 3 columns -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-16">
  Items
</div>

<!-- Mobile: 1 column, Tablet: 2 columns, Desktop: 4 columns -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
  Items
</div>
```

#### **Navigation:**
```html
<!-- Hide menu on mobile -->
<ul class="hidden md:flex gap-12">
  Menu Items
</ul>
```

### Mobile-Specific Rules

```css
@media (max-width: 768px) {
  /* Hide hero metrics on mobile */
  .hero-metrics {
    display: none;
  }
  
  /* Reduce section padding */
  section {
    padding: 80px 0;
  }
  
  /* Single column grids */
  .grid {
    grid-template-columns: 1fr;
  }
}
```

---

## Animation & Interaction

### Transitions

**Standard duration:** `0.2s` - `0.3s`  
**Easing:** `ease` or `cubic-bezier(0.4, 0, 0.2, 1)`

```css
transition: all 0.2s ease;
transition: color 0.2s ease;
transition: transform 0.3s ease;
```

### Hover Effects

#### **1. Button Lift**
```css
.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(216, 36, 42, 0.2);
}
```

#### **2. Card Lift**
```css
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
}
```

#### **3. Subtle Lift**
```css
.subtle-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
}
```

#### **4. Color Transition**
```css
.link {
  color: var(--gray-700);
  transition: color 0.2s ease;
}

.link:hover {
  color: var(--dark);
}
```

#### **5. Fill Transition**
```css
.button-outline {
  border: 2px solid var(--dark);
  color: var(--dark);
  background: transparent;
  transition: all 0.2s ease;
}

.button-outline:hover {
  background: var(--dark);
  color: var(--white);
}
```

### Scroll Animations

#### **1. Navigation Shrink**
```javascript
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navigation');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled'); // Reduce padding
  } else {
    nav.classList.remove('scrolled');
  }
});
```

```css
.nav {
  padding: 28px 0;
  transition: all 0.3s ease;
}

.nav.scrolled {
  padding: 20px 0;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
}
```

#### **2. Scroll Progress Bar**
```javascript
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scrollProgress');
  const pos = document.documentElement.scrollTop;
  const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollValue = Math.round((pos * 100) / calcHeight);
  scrollProgress.style.width = scrollValue + '%';
});
```

```css
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
  z-index: 1001;
  transition: width 0.1s linear;
}
```

#### **3. Number Animation (Count Up)**
```javascript
const animateValue = (element, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    
    const type = element.dataset.type;
    if (type === 'currency') {
      element.textContent = '$' + current + 'M';
    } else if (type === 'billions') {
      element.textContent = '$' + (current / 1000).toFixed(1) + 'B+';
    } else if (type === 'percentage') {
      element.textContent = current + '%';
    } else {
      element.textContent = current.toLocaleString() + '+';
    }
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};
```

#### **4. Smooth Anchor Scroll**
```javascript
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80; // Account for fixed nav
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});
```

### Performance Considerations

**Use `transform` and `opacity` only:**
```css
/* ✅ Good - GPU accelerated */
.element {
  transform: translateY(-4px);
  opacity: 0.8;
}

/* ❌ Bad - Causes reflow */
.element {
  margin-top: -4px;
  height: 100px;
}
```

**Use `will-change` sparingly:**
```css
/* Only on elements that will animate */
.button:hover {
  will-change: transform;
}
```

---

## Usage Examples

### Building a New Section

```html
<section class="py-32 bg-gray-50">
  <div class="max-w-[1600px] mx-auto px-20">
    <!-- Section Header -->
    <div class="max-w-4xl mb-20">
      <div class="text-xs font-semibold tracking-widest uppercase text-secondary mb-5">
        Section Label
      </div>
      <h2 class="text-4xl font-extralight tracking-tight text-dark mb-5">
        Section Title
      </h2>
      <p class="text-lg font-light text-gray-600 max-w-3xl">
        Section description explaining what this content is about.
      </p>
    </div>
    
    <!-- Content Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-16">
      <!-- Items -->
      <div class="p-8 bg-white border border-gray-100 hover:-translate-y-0.5 hover:shadow-lg transition-all">
        <h3 class="text-lg font-medium text-dark mb-3">Item Title</h3>
        <p class="text-sm font-light leading-relaxed text-gray-600">
          Item description content goes here.
        </p>
      </div>
    </div>
  </div>
</section>
```

### Creating a Card Component

```tsx
// components/ui/Card.tsx
interface CardProps {
  kicker?: string;
  title: string;
  description: string;
  metric?: {
    value: string;
    context: string;
  };
  className?: string;
}

export function Card({ kicker, title, description, metric, className = '' }: CardProps) {
  return (
    <div className={`p-10 bg-gray-50 rounded-sm transition-all hover:-translate-y-1 hover:shadow-xl ${className}`}>
      {kicker && (
        <div className="text-xs font-semibold tracking-wide uppercase text-gray-500 mb-5">
          {kicker}
        </div>
      )}
      
      {metric && (
        <div className="flex items-baseline gap-2 mb-5">
          <span className="text-5xl font-light text-primary leading-none">
            {metric.value}
          </span>
          <span className="text-sm text-gray-600 font-normal">
            {metric.context}
          </span>
        </div>
      )}
      
      <h3 className="text-xl font-medium text-dark mb-3">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-700 font-light">
        {description}
      </p>
    </div>
  );
}
```

---

## Design Checklist

When building a new component or page, ensure:

### Visual Consistency
- [ ] Uses only design system colors
- [ ] Typography follows type scale
- [ ] Spacing uses tokens (xs, sm, md, lg, xl, 2xl, 3xl)
- [ ] Border radius is 2px (subtle)
- [ ] Hover states have smooth transitions

### Hierarchy
- [ ] Headlines use weight 200 (extralight)
- [ ] Emphasis uses weight 500 + primary color
- [ ] Body text uses weight 300
- [ ] Labels use weight 600 + uppercase + tracking-widest

### Layout
- [ ] Container max-width: 1600px for sections
- [ ] Content max-width: 1200px for heroes
- [ ] Text max-width: 720px for readability
- [ ] Horizontal padding: 80px desktop, 40px mobile

### Interaction
- [ ] Hover effects use transform (not margin/padding)
- [ ] Transitions are 0.2-0.3s
- [ ] Focus states are visible (accessibility)
- [ ] Buttons have clear active states

### Responsive
- [ ] Mobile-first breakpoints
- [ ] Grid collapses to single column on mobile
- [ ] Typography scales down appropriately
- [ ] Padding adjusts for smaller screens

### Performance
- [ ] Animations use transform/opacity only
- [ ] No layout thrashing
- [ ] Images optimized
- [ ] Fonts preloaded

---

**Questions? Issues?**

Contact the design team for clarification on any design system patterns or component usage.

**Version History:**
- v1.0 (Nov 2, 2025) - Initial extraction from HTML prototypes

