<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1w_B_KPHQ3HPOvXfwJU9ntaaFVigB8Q_4

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
# 👜 VELRA — Royal Leather Atelier

VELRA is a premium luxury leather e-commerce experience built for modern India.  
It blends royal elegance with Gen-Z minimalism, delivering handcrafted leather lifestyle pieces with a refined digital boutique experience.

Built with:
Next.js + React + Tailwind CSS + Firebase + Razorpay + Framer Motion

---

## ✨ Brand Identity

VELRA represents:

• Royal confidence  
• Editorial elegance  
• Modern minimal luxury  
• Emotion-driven styling  
• Premium handcrafted leather  

Color System (Strict Brand Palette):

- Burgundy (Primary)
- Matte Gold (Accent)
- Beige (Background)
- Ivory (Cards)
- Dark Brown (Hover States)

---

# 🚀 Core Features Implemented

---

## 🔐 Authentication System (Firebase v9 Modular)

- Email / Password Login
- Google Login
- Phone Authentication
- Session Persistence
- Auth Context Provider
- Firestore User Storage
- Protected Routes
- User Profile Dashboard

---

## 🧠 AI Styling Concierge (VELRA AI)

Luxury AI chatbot that:

- Starts with gentle discovery questions
- Understands mood, tone, and occasion
- Infers emotional state (confident, stressed, calm, excited, unsure)
- Recommends full outfits (not single products)
- Suggests color psychology & leather materials
- Adapts tone based on Day/Night Mood
- Works gracefully even if user skips inputs

---

## 🌗 Day / Night Mood System

Elegant theme switch with persistence.

### Day Mood
- Airy beige + ivory
- Burgundy dominant
- Soft matte gold accents
- Editorial daytime feel

### Night Mood
- Deep burgundy / leather-black background
- Champagne gold text
- Cinematic glow effects
- Subtle gloss & shimmer
- Warmer product tone

Features:
- Smooth 300–500ms animated transitions
- Card shimmer at night
- Hero vignette enhancement
- LocalStorage persistence

---

## 🛍️ Product Experience

### Amazon-Style Filtering
- Sticky left filter panel
- Multi-select checkboxes
- Price slider (dynamic)
- Category quick filter bar (top sticky)
- Live updates (no reload)
- Filter count display
- Mobile drawer filter

### Product Cards
- Dark gradient overlay
- Gold ribbon badges
- Hover zoom effect
- Hover lift + glow
- Floating wishlist button
- Smooth micro-interactions

### Product Detail
- HD gallery with thumbnails
- Dynamic centralized pricing
- Review system
- Add to cart / Wishlist
- Tabbed content (Heritage, Craft, Care)
- Emotional luxury copy

---

## 🛒 Cart & Checkout

- Quantity update
- Remove items
- Sticky summary panel
- Razorpay Integration
- GST calculation (12%)
- Complimentary shipping threshold
- Payment Simulation + Order creation
- Centralized Order State

### Payment Methods:
- Razorpay (UPI / Cards / Netbanking)
- COD (Cash on Delivery)
- EMI Option
- Secure Payment UI

---

## 📦 Order Tracking Experience

- Real purchased items shown dynamically
- Luxury vertical timeline
- Status animations
- Emotional artisan messaging
- Print certificate option
- Continue exploring CTA

---

## ❤️ Wishlist

- Add to wishlist
- Move to cart
- Luxury grid layout
- Night-mode adaptive visuals

---

## 🧾 Review System

- Star rating
- Leave review form
- Sample review mock data
- Elegant testimonial layout

---

## 🌍 Multi-Language System

- Language preference in onboarding
- Text clarity improved
- Persistent language selection
- Entire site updates based on chosen language

---

## 🎯 Onboarding Flow (Refined)

Steps:
1. Language Preference
2. Shopping Mood
3. Category Preference
4. Style Comfort Level

Removed:
- Budget question

Data stored in Firestore.

---

## 🧭 Navigation UX Enhancements

- Elegant floating "Back to Home" button
- Smooth Framer Motion page transitions
- Mobile app-like navigation feel
- Keyboard & touch friendly

---

## 📊 Admin & Dashboard

- User profile view
- Order history
- Track journey link
- Preferences view
- Logout
- Privilege section

---

## 🧩 Centralized Product Pricing Engine

- Prices controlled from central config
- No component-level price editing
- ProductListing & ProductDetail auto-sync
- Easy to modify pricing without breaking UI

---

# 🎨 UI / UX System

Reusable Luxury Classes:

- lux-card
- lux-button
- lux-outline-button
- lux-section
- lux-heading
- lux-glow-hover

Enhancements:

- Rounded-2xl everywhere
- Gold gradient dividers
- Leather texture overlays
- Micro hover animations
- Smooth page transitions
- Floating chatbot + cart (mobile)
- Sticky action buttons
- High-contrast readable typography

---

# 💰 Tax & Pricing

- GST: 12%
- Dynamic price calculation
- Central pricing configuration
- Shipping rules configurable

---

# 🛠 Tech Stack

Frontend:
- Next.js
- React
- Tailwind CSS
- Framer Motion

Backend / Database:
- Firebase Auth
- Firestore

Payments:
- Razorpay

State Management:
- Context API

---



