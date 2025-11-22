# PixelPerfect Website

A modern, Apple-inspired web design agency website with smooth animations, clean aesthetics, and full backend functionality.

## Features

- **Modern Design**: Apple-inspired UI with glassmorphism effects and bento grid layouts
- **Smooth Animations**: GSAP-powered transitions and scroll-triggered reveals
- **Page Transitions**: Seamless navigation using Barba.js
- **Contact Form**: Stores submissions in SQLite database
- **User Signup**: Complete registration system with validation
- **Responsive**: Mobile-friendly design throughout
- **Custom Cursor**: Interactive cursor that responds to hover states

## Pages

- **Landing** (`/index.html`) - Animated intro page with morphing blobs
- **Home** (`/home.html`) - Hero section with video background and features
- **About** (`/about.html`) - Company information, values, and team
- **Services** (`/services.html`) - Pricing packages and industry solutions
- **Contact** (`/contact.html`) - Contact form with FAQ section
- **Sign Up** (`/signup.html`) - User registration with validation
- **Log In** (`/login.html`) - User login page with backend authentication
- **Privacy Policy** (`/privacy.html`) - Privacy and data protection policy
- **Terms of Use** (`/terms.html`) - Terms and conditions
- **Sales & Refunds** (`/refunds.html`) - Payment and refund policy

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser to `http://localhost:3000`

## ⚠️ Security Notice

**This is a demo/portfolio project.** Before using in production:

- 🔒 Implement password hashing (currently plain text)
- 🔐 Add proper session management
- 🛡️ Enable HTTPS/SSL
- 📧 Replace example emails with your actual contact info
- 🚦 Add rate limiting
- ✅ Review `SECURITY.md` for complete checklist

See `SECURITY.md` for detailed security guidelines.

## Tech Stack

- **Backend**: Node.js + Express
- **Database**: SQLite3
- **Frontend**: HTML5, Tailwind CSS (CDN), GSAP, Barba.js
- **Styling**: Custom CSS with Apple-inspired design system

## Database

The app uses SQLite (`messages.db`) with two tables:
- `messages` - Contact form submissions (name, email, project, message)
- `users` - User registrations (fullname, username, email, password)

## API Endpoints

- `POST /api/contact` - Submit contact form
- `POST /api/signup` - Create new user account
- `POST /api/login` - User authentication

## Structure

```
├── server.js           # Express server
├── package.json        # Dependencies
├── messages.db         # SQLite database
└── public/
    ├── index.html      # Landing page
    ├── home.html       # Main homepage
    ├── about.html      # About page
    ├── services.html   # Services/pricing
    ├── contact.html    # Contact form
    ├── signup.html     # User registration
    ├── css/
    │   └── style.css   # Custom styles
    └── js/
        └── transitions.js  # Page transitions & animations
```
