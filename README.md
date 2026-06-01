# Tokyo Neon Kissa

A bilingual cocktail bar concept website designed for Tokyo nightlife venues serving both local customers and international visitors.

This project demonstrates **full-stack web development**, combining a modern UI with a working reservation system, cocktail recommendation feature, and an AI-powered virtual host chat.

---

## Live Demo

https://tokyo-neon-bar.vercel.app

---

## Screenshots

### Homepage
<img src="src/app/screenshots/homepage.png" width="900">

### Cocktail Finder
<img src="src/app/screenshots/cocktail-finder.png" width="900">

### Reservation Form
<img src="src/app/screenshots/reservation-form.png" width="900">

### Mobile Layout
<img src="src/app/screenshots/mobile-layout.png" width="400">

---

## Features

### User Experience
- English / Japanese language toggle
- Modern minimalist cocktail bar UI
- Responsive layout for desktop and mobile
- Google Maps access section

### AI Virtual Host — Hana
- Floating chat button available on every page
- Powered by **Claude (claude-sonnet-4-6)** via the Anthropic API
- Responds in whichever language the guest uses (English or Japanese)
- Knows the bar's opening hours, cocktail menu, and pricing
- Warm, atmospheric tone kept to 1–2 sentences per reply
- Conversation history maintained within the session (up to 20 messages)

### Cocktail Finder
- Interactive drink recommendation system
- Filters based on mood and sweetness
- Flavor preferences and exclusions
- Dynamic scoring logic for recommendations

### Reservation System
- Reservation request form
- Server-side API processing
- Email notifications for new reservations

---

## Backend Features

- `/api/chat` — AI chat route using the Anthropic SDK; Hana's persona and bar knowledge are set in a system prompt
- `/api/recommend` — cocktail recommendation logic
- `/api/reserve` — reservation handling with email delivery via **Resend**
- Environment variables for secure API keys
- Serverless deployment on **Vercel**

---

## Security / Hardening

The reservation system includes basic protections:

- Honeypot anti-spam field
- Rate limiting for reservation requests
- Input sanitization for safer email content
- Production sanity testing

---

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes
- Anthropic Claude API (AI chat)
- Resend Email API

### Infrastructure
- Vercel Deployment
- Environment Variables

---

## Challenges

### Building an AI Virtual Host
Designing Hana required crafting a system prompt that keeps responses brief and atmospheric while still being genuinely useful — answering questions about hours, the menu, and reservations without sounding like a chatbot.

### Bilingual AI Responses
The chat automatically detects and matches the language of the guest (English or Japanese), which required prompt engineering to ensure consistent behaviour across both languages.

### Building a Recommendation System
The Cocktail Finder required designing a scoring system that evaluates user preferences such as mood, sweetness, and flavor keywords.

### Bilingual UI Design
Supporting both English and Japanese required careful UI design to maintain readability and layout balance across languages.

### Reservation Workflow
Creating a working reservation system required connecting a frontend form with a backend API route and email delivery service.

---

## What I Learned

Through this project I practised:

- Integrating the Anthropic Claude API into a Next.js app
- Writing effective system prompts for persona-driven AI behaviour
- Designing bilingual AI responses through prompt engineering
- Designing realistic UI for hospitality businesses
- Implementing server-side API routes
- Handling environment variables in production
- Deploying full-stack applications
- Integrating third-party APIs

---

## Project Purpose

This project was built as a **portfolio demonstration of full-stack web development** using modern JavaScript tools, with a focus on AI integration for hospitality use cases.

The concept focuses on nightlife venues in Tokyo that want to serve both local and international customers.

---

## Status

Deployed and fully functional.

---

## Author

Batmagnai Ganbaatar
