# ADR 0001: Initial Architecture Stack

## Status
Accepted

## Context
The Cvyon platform requires a scalable, modern, and SEO-friendly architecture capable of rendering dynamic resumes, handling server-side AI integrations (Gemini), and managing subscriptions via Paystack.

## Decision
We have elected to use the following core technology stack:
- **Framework**: Next.js 14+ with the App Router.
- **Styling**: Tailwind CSS.
- **State Management**: Zustand (for complex client-side state like the Resume Builder).
- **Database & Auth**: Supabase (PostgreSQL).
- **Payment Processing**: Paystack.
- **AI Integration**: Google Gemini API.

## Consequences
- **Pros**: Next.js provides excellent SEO and server-side rendering out of the box, which is vital for a SaaS platform. Supabase allows for rapid development with built-in Row Level Security (RLS) to ensure data isolation. Zustand provides a lighter-weight alternative to Redux for our complex builder state.
- **Cons**: Vercel/Next.js serverless architecture means we lack a static IP address, which complicates certain third-party integrations (see ADR 0002). 
