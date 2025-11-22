# PixelPerfect Website Sitemap

## Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│                      index.html (Landing)                    │
│              Epic intro with morphing blobs                  │
│                  ↓ "Enter Experience"                        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      home.html (Main)                        │
│         Hero video, features, marquee, bento grid            │
└─────────────────────────────────────────────────────────────┘
                              ↓
        ┌─────────────────────┼─────────────────────┐
        ↓                     ↓                     ↓
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  about.html  │    │services.html │    │ contact.html │
│              │    │              │    │              │
│ Company info │    │   Pricing    │    │ Contact form │
│ Values, team │    │   packages   │    │     FAQ      │
└──────────────┘    └──────────────┘    └──────────────┘
                              ↓
                    ┌─────────┴─────────┐
                    ↓                   ↓
            ┌──────────────┐    ┌──────────────┐
            │ signup.html  │    │  login.html  │
            │              │    │              │
            │ Registration │←───│  User login  │
            └──────────────┘    └──────────────┘
```

## Navigation Links

### Main Navigation (All Pages)
- **Home** → `home.html`
- **About** → `about.html`
- **Services** → `services.html`
- **Contact** → `contact.html`
- **Sign Up** → `signup.html` (CTA button)

### Cross-Page Links

**index.html:**
- Enter Experience → `home.html`

**home.html:**
- Learn more → `services.html`
- View Packages → `services.html`

**services.html:**
- Get Started (all packages) → `contact.html`
- Get in Touch → `contact.html`

**signup.html:**
- Already have an account? → `login.html`
- Success message → `home.html`

**login.html:**
- Don't have an account? → `signup.html`
- Success message → `home.html`

### Footer Links (All Pages)
- Privacy Policy → `#` (placeholder)
- Terms of Use → `#` (placeholder)
- Sales and Refunds → `#` (placeholder)

## Features by Page

### index.html
- 3D perspective intro
- Morphing orbs (3)
- Animated grid background
- Floating particles (50)
- Scan line effect
- Smooth page transition

### home.html
- Video background
- Morphing blobs (3)
- Parallax layers
- Scroll indicator
- Marquee section
- Bento grid features
- Big text section

### about.html
- Morphing blobs (2)
- Bento grid stats
- Team showcase
- Values section
- FAQ accordion

### services.html
- Morphing blobs (2)
- Pricing cards (3)
- Industry solutions grid
- CTA section

### contact.html
- Morphing blobs (2)
- Contact form
- FAQ accordion
- Form validation

### signup.html
- Morphing blobs (2)
- Registration form
- Password validation
- Success redirect

### login.html
- Morphing blobs (2)
- Login form
- Remember me checkbox
- Forgot password link

## Design System

### Morphing Fluid UI Elements
- Organic blob shapes on all pages
- Liquid cursor with morphing
- Fluid button interactions
- Smooth page transitions
- Magnetic hover effects

### Color Palette
- Background: `#000000`
- Text Primary: `#f5f5f7`
- Text Secondary: `#86868b`
- Accent: White with opacity variations

### Typography
- Font: Inter, -apple-system, BlinkMacSystemFont
- Headers: 5xl - 9xl (bold, tight tracking)
- Body: xl - 2xl (regular)

### Animations
- Morph cycle: 8s ease-in-out
- Float: 6s ease-in-out
- Transitions: cubic-bezier(0.34, 1.56, 0.64, 1)
