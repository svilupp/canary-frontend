# Canary Design System Documentation

> **Deploy the flock, ship with confidence**

Version 1.0 • Browser Automation Testing Platform

---

## Table of Contents

1. [Brand Overview](#brand-overview)
2. [Design Philosophy](#design-philosophy)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Spacing & Layout](#spacing--layout)
6. [Components](#components)
7. [Animations & Motion](#animations--motion)
8. [Voice & Tone](#voice--tone)
9. [Usage Guidelines](#usage-guidelines)
10. [Accessibility](#accessibility)

---

## Brand Overview

### What is Canary?

Canary is a browser automation platform for debugging and QA testing that runs tests in parallel. Like a squadron of canaries deployed into a coal mine, multiple test instances work simultaneously to catch issues before they reach production.

### The Flock Philosophy

Instead of sequential testing, Canary deploys a "squadron" of test instances that work in parallel. Each canary patrols a different area, reports back instantly, and covers more ground than any single tester could. This parallel approach dramatically reduces testing time while increasing coverage.

### Brand Positioning

**Core Message:** Professional, fast, and reliable browser automation with a friendly, approachable personality.

**Target Audience:** Developers and QA engineers who ship quickly and need confidence that their builds work across browsers and scenarios.

**Competitive Differentiation:**
- **Visual Identity:** Bold yellow (vs. typical purple/blue dev tools)
- **Personality:** Industrial meets friendly (serious but not stuffy)
- **Experience:** Motion and character make testing feel alive
- **Philosophy:** Parallel by default, not as an afterthought

---

## Design Philosophy

### Industrial Meets Friendly

Canary draws from two aesthetic worlds:

**Industrial Safety Equipment**
- Bold warning colors (safety yellow)
- Clear, utilitarian typography
- High contrast for visibility
- Functional, purpose-driven design

**Friendly Character**
- Approachable mascot (canary birds)
- Smooth animations and micro-interactions
- Clear, helpful language
- Delight in the details

### Design Principles

1. **Bold Over Timid:** Dominant colors with sharp accents outperform evenly-distributed palettes. Yellow dominates but doesn't overwhelm.

2. **Distinctive Over Generic:** Avoid "AI slop" aesthetics. Every choice should feel intentional and context-specific.

3. **Functional Over Decorative:** Every design element serves the user's goal—testing quickly and confidently.

4. **Alive Over Static:** Motion makes the interface feel responsive and engaging, especially for long-running test operations.

5. **Clear Over Clever:** Clarity trumps cleverness. Users should never wonder what something does.

---

## Color System

### Primary Palette

```css
/* Brand Colors */
--canary-yellow: #FFD60A;    /* Primary brand, active states, CTAs */
--canary-gold: #FFC300;      /* Hover states, emphasis */
--canary-dark: #E6B800;      /* Dark mode yellow adjustments */

/* Structural Colors */
--steel-dark: #415A77;       /* Primary text, headers, structure */
--steel-base: #526980;       /* Secondary elements */
--steel-light: #778DA9;      /* Tertiary text, muted elements */
--steel-pale: #9BABC2;       /* Borders, dividers */

/* Background Colors */
--sky-pale: #E0E1DD;         /* Light mode backgrounds */
--sky-light: #F5F5F3;        /* Light mode primary surface */
--coal-black: #1B1B1E;       /* Dark mode surfaces */
--coal-darker: #0D0D0F;      /* Dark mode primary background */

/* Status Colors */
--alert-red: #E63946;        /* Errors, failures */
--alert-red-dark: #C41E3A;   /* Error hover states */
--success-green: #06A77D;    /* Success, passed tests */
--success-green-dark: #058B6A; /* Success hover states */
--warning-orange: #FF9F1C;   /* Warnings, pending states */
```

### Color Usage Guidelines

**Primary Actions:**
- Use `canary-yellow` for all primary CTAs
- Reserve yellow for important, actionable elements
- Yellow should feel special, not overused

**Text Hierarchy:**
- Primary text: `steel-dark` (light) / `sky-light` (dark)
- Secondary text: `steel-base` or `steel-light`
- Tertiary/muted: `steel-pale`

**Backgrounds:**
- Light mode: Start with `sky-light`, use `sky-pale` for subtle variation
- Dark mode: `coal-darker` primary, `coal-black` for cards/surfaces
- Add atmospheric patterns (diagonal stripes, gradients) for depth

**Status Communication:**
- Success: `success-green` - tests passed, operations completed
- Error: `alert-red` - failures, critical issues
- Warning: `warning-orange` - performance issues, alerts
- Active: `canary-yellow` - tests running, active operations
- Neutral: `steel-light` - idle, queued states

### Color Don'ts

❌ Don't use yellow for large background areas (use sparingly for impact)  
❌ Don't mix success green and canary yellow (they compete)  
❌ Don't use more than 3 colors in a single component  
❌ Don't use alert red for anything but actual errors/failures  

---

## Typography

### Font Stack

```css
--font-display: 'IBM Plex Sans Condensed', sans-serif;
--font-body: 'Sora', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Display Font: IBM Plex Sans Condensed

**Usage:** Headlines, labels, buttons, UI chrome, navigation

**Characteristics:**
- Geometric and industrial
- Excellent at small sizes
- Strong personality without being decorative
- **Always uppercase** for maximum impact and consistency

**Examples:**
```
DEPLOY SQUADRON
CONFIGURE TESTS
ALL TESTS PASSED
```

### Body Font: Sora

**Usage:** Paragraphs, descriptions, longer content

**Characteristics:**
- Clean and modern
- Excellent readability at all sizes
- Slightly geometric to complement display font
- Works well in both light and dark modes

**Avoid:** Generic fonts like Inter, Roboto, Arial, System UI

### Monospace Font: JetBrains Mono

**Usage:** Code blocks, technical content, API responses

**Characteristics:**
- Designed specifically for code
- Excellent ligatures
- Clear character differentiation (0 vs O, 1 vs l)

### Typography Scale

```css
/* Headings (all uppercase) */
h1: clamp(2.5rem, 5vw, 4rem);    /* 40-64px */
h2: clamp(2rem, 4vw, 3rem);      /* 32-48px */
h3: clamp(1.5rem, 3vw, 2rem);    /* 24-32px */
h4: 1.25rem;                     /* 20px */

/* Body Text */
body: 16px;
large: 18px;
small: 14px;
```

### Typography Rules

1. **Headlines are ALWAYS uppercase** when using display font
2. **Letter-spacing:** -0.02em for headlines, 0.05em for labels
3. **Line-height:** 1.2 for headlines, 1.6 for body text
4. **Font weights:** 
   - Display: 600 (medium), 700 (bold)
   - Body: 400 (regular), 500 (medium), 600 (semi-bold)

---

## Spacing & Layout

### Spacing Scale

```css
--space-xs: 0.25rem;   /* 4px  - Tight spacing, icon gaps */
--space-sm: 0.5rem;    /* 8px  - Small gaps, compact layouts */
--space-md: 1rem;      /* 16px - Default spacing */
--space-lg: 1.5rem;    /* 24px - Section spacing */
--space-xl: 2rem;      /* 32px - Large gaps */
--space-2xl: 3rem;     /* 48px - Major sections */
--space-3xl: 4rem;     /* 64px - Page sections */
```

### Layout Principles

**Maximum Content Width:** 1400px (optimal reading and scanning)

**Responsive Breakpoints:**
```css
/* Mobile-first approach */
Base: < 768px (1 column)
Tablet: 768px - 1024px (2 columns)
Desktop: > 1024px (3-4 columns)
```

**Grid Systems:**
- 2-column: `minmax(300px, 1fr)` - for feature cards
- 3-column: `minmax(250px, 1fr)` - for component showcases
- 4-column: `minmax(200px, 1fr)` - for small items, badges

**Container Padding:**
- Desktop: `--space-2xl` (48px)
- Mobile: `--space-lg` (24px)

---

## Components

### Buttons

**Visual Style:**
- Uppercase labels (display font)
- Letter-spacing: 0.05em
- Border-radius: `--radius-md` (8px)
- Smooth transitions (250ms)
- Shine effect on hover (gradient sweep)

**Variants:**

```css
.btn-primary {
  /* Yellow, high emphasis */
  background: var(--canary-yellow);
  color: var(--coal-black);
  box-shadow: var(--shadow-yellow);
}

.btn-secondary {
  /* Steel gray, medium emphasis */
  background: var(--steel-dark);
  color: white;
}

.btn-outline {
  /* Transparent with yellow border */
  border: 2px solid var(--canary-yellow);
  background: transparent;
}

.btn-ghost {
  /* Minimal, low emphasis */
  border: 2px solid var(--border-color);
  background: transparent;
}
```

**Sizes:**
- Small: `padding: 8px 16px; font-size: 0.85rem`
- Default: `padding: 16px 32px; font-size: 0.95rem`
- Large: `padding: 24px 48px; font-size: 1.1rem`

**States:**
- Hover: Slight color shift + lift up 2px
- Active: Return to baseline (pressed effect)
- Disabled: 50% opacity, no interactions

### Cards

**Visual Style:**
- White/dark background with subtle border
- Border-radius: `--radius-lg` (12px)
- 4px yellow accent strip appears on hover (top edge)
- Lift effect on hover (translateY -4px)

**Structure:**
```html
<div class="card">
  <div class="card-header">
    <h4 class="card-title">TITLE</h4>
    <p class="card-subtitle">Subtitle text</p>
  </div>
  <div class="card-content">
    <!-- Main content -->
  </div>
</div>
```

**Variants:**
- Standard: Default card style
- Highlighted: Yellow border + subtle yellow gradient background
- Compact: Reduced padding for dense layouts

### Forms

**Input Style:**
- 2px border (changes to yellow on focus)
- Focus ring: `0 0 0 3px rgba(255, 214, 10, 0.2)`
- Padding: `--space-md` (16px)
- Border-radius: `--radius-md` (8px)

**Labels:**
- Display font, uppercase, small size
- Color: `--text-secondary`
- Margin-bottom: `--space-sm`

**Validation:**
- Success: Green left border
- Error: Red left border + error message below
- Keep validation messages concise and actionable

### Alerts

**Structure:**
4px colored left border + icon + content

**Types:**
- Success: Green border, checkmark icon
- Error: Red border, X icon
- Warning: Orange border, warning icon
- Info: Yellow border, info icon

**Usage:**
- Place at top of relevant section
- Dismissible for non-critical alerts
- Keep messages scannable (bold the key point)

### Badges

**Visual Style:**
- Small, pill-shaped labels
- Display font, uppercase, 0.75rem
- Padding: `4px 16px`
- Border-radius: `--radius-lg` (rounded)

**Usage:**
- Status indicators (passed, failed, running)
- Categories and tags
- Counts and metrics
- Should be scannable at a glance

### Tables

**Visual Style:**
- Steel dark header with white text
- Alternating row hover (yellow tint)
- Clear borders between rows
- Responsive: Scroll on mobile

**Best Practices:**
- Keep headers concise (uppercase)
- Left-align text, right-align numbers
- Use badges for status columns
- Provide sorting where relevant

---

## Animations & Motion

### Philosophy

**High-Impact Moments Over Scattered Micro-interactions**

Focus animation budget on:
1. Page load (staggered reveals)
2. State transitions (deploying squadron)
3. Status changes (test completion)
4. User feedback (button clicks, form submission)

### Animation Timing

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);
```

**Use fast:** Hover states, button interactions  
**Use base:** Most UI transitions, card hovers  
**Use slow:** Page loads, major state changes  

### Signature Animations

**Staggered Page Load:**
```css
.section {
  animation: fadeInUp 400ms forwards;
}
.section:nth-child(1) { animation-delay: 0ms; }
.section:nth-child(2) { animation-delay: 100ms; }
.section:nth-child(3) { animation-delay: 200ms; }
```

**Flight Path (Active Tests):**
- Horizontal movement across screen
- Smooth, constant velocity
- Multiple canaries with slight delay between launches

**Status Pulse:**
```css
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}
```
Use for active/running states only

**Button Shine Effect:**
- Gradient sweep left to right on hover
- Adds premium feel without being distracting

### Motion Don'ts

❌ Don't animate everything (overwhelming)  
❌ Don't use spring physics for business tools  
❌ Don't auto-play animations on loop (accessibility)  
❌ Don't animate during critical operations (confusing)  

---

## Voice & Tone

### Brand Personality

**Competent:** We know testing. We're professionals.  
**Fast:** No fluff. Get to the point.  
**Slightly Cheeky:** Air traffic control meets scrappy startup.  
**Helpful:** Direct, action-oriented feedback.  

### Writing Guidelines

**Microcopy Examples:**

✅ **Good:**
- "Deploying the flock..."
- "5 canaries in the air"
- "Squadron complete - all clear"
- "Canary #3 spotted an issue on checkout flow"

❌ **Bad:**
- "Please wait while we process your request"
- "Test execution in progress"
- "An error has occurred"
- "Success!"

### Error Messages

**Structure:** What happened + Why + What to do

**Examples:**

✅ "Element not found: #submit-button. Check if the selector changed or if the page loaded completely."

❌ "Selector error occurred."

### Tone Variations

**Success Messages:** Direct, confident
> "All 24 tests passed. Ship it."

**Error Messages:** Clear, actionable (not apologetic)
> "Payment gateway timeout after 5s. Increase timeout or check API status."

**Warnings:** Informative, not alarmist
> "Page load exceeded 3s. Consider optimizing assets."

**Loading States:** Progress-focused
> "Squadron deployed. Running 12 tests across 3 browsers..."

---

## Usage Guidelines

### When to Use Yellow

✅ **Do use yellow for:**
- Primary call-to-action buttons
- Active test indicators
- Important status badges
- Accent strips and highlights
- Focus states

❌ **Don't use yellow for:**
- Large background areas
- Body text
- Every piece of UI chrome
- Non-actionable decorative elements

### Dark Mode Considerations

**Adjustments for Dark Mode:**
- Reduce yellow saturation slightly (less harsh)
- Increase contrast for text legibility
- Use darker shadows (more subtle)
- Invert atmospheric patterns (light on dark vs dark on light)

**Test in both modes** - components should feel cohesive, not like separate themes

### Component Combinations

**Card + Badge + Button:**
```html
<div class="card">
  <h4>Test Suite</h4>
  <span class="badge badge-success">Passed</span>
  <button class="btn btn-outline">View Results</button>
</div>
```

**Alert + Button:**
```html
<div class="alert alert-danger">
  <div class="alert-icon">✕</div>
  <div class="alert-content">
    <div class="alert-title">Test Failed</div>
    <p>Element not found...</p>
    <button class="btn btn-small btn-danger">Debug</button>
  </div>
</div>
```

### Responsive Behavior

**Desktop (>1024px):**
- 3-4 column grids
- Hover states active
- Full animations

**Tablet (768-1024px):**
- 2 column grids
- Touch-friendly targets (min 44px)
- Reduced animation complexity

**Mobile (<768px):**
- Single column
- Simplified navigation
- Essential animations only
- Increased touch targets

---

## Accessibility

### Color Contrast

All text meets WCAG AA standards:
- `canary-yellow` on `coal-black`: 12.5:1 ✓
- `steel-dark` on `sky-light`: 8.2:1 ✓
- `sky-light` on `coal-black`: 16.8:1 ✓

### Keyboard Navigation

**Focus Indicators:**
- Visible focus rings (3px yellow glow)
- Skip to main content link
- Logical tab order

**Interactive Elements:**
- All buttons and links keyboard accessible
- Form inputs have associated labels
- Modals trap focus appropriately

### Screen Readers

**Semantic HTML:**
- Use proper heading hierarchy (h1 → h2 → h3)
- ARIA labels for icon-only buttons
- Status updates announced via ARIA live regions

**Alt Text:**
- Decorative images: `alt=""`
- Functional images: Descriptive alt text
- Complex diagrams: Full text alternative

### Motion Sensitivity

Respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Implementation Checklist

### Starting a New Feature

- [ ] Review this design system
- [ ] Use CSS variables from the system
- [ ] Choose appropriate components
- [ ] Follow typography hierarchy
- [ ] Test in both light and dark modes
- [ ] Verify keyboard navigation
- [ ] Check color contrast
- [ ] Test responsive behavior
- [ ] Add meaningful animations (if appropriate)
- [ ] Write clear, action-oriented copy

### Before Shipping

- [ ] All interactive elements have focus states
- [ ] Color contrast meets WCAG AA
- [ ] Works without JavaScript (progressive enhancement)
- [ ] Tested with screen reader
- [ ] Tested on mobile device
- [ ] Animations respect motion preferences
- [ ] Images have alt text
- [ ] Forms have proper labels

---

## Resources

### Design Tokens

All design tokens are available as CSS custom properties in the main stylesheet. Import and use throughout your application for consistency.

### Figma/Sketch

(Link to design files when available)

### Component Library

Reference the live design system HTML file for complete component examples with markup and styling.

### Questions?

For design system questions, updates, or contributions, contact the design team or open an issue in the project repository.

---

## Changelog

### v1.0 (Current)
- Initial design system release
- Complete color palette
- Typography system
- Core component library
- Light and dark mode support
- Canary-specific components (flight paths, squadron grids)

---

**Remember:** This design system is a living document. As Canary evolves, so will these guidelines. When in doubt, prioritize user clarity over design trends, and always ask: "Does this help someone ship with confidence?"

🐤 **Deploy the flock, ship with confidence.**
