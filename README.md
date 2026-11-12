# Junaid Bloch — Portfolio

A responsive editorial-style portfolio starter built with React, Vite, TypeScript, Framer Motion and a copper / warm-neutral design system. Includes light/dark mode, animated role rotation, responsive navigation, project and experience sections, and a Netlify Function-backed contact form.

## Run locally

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Run `npm run dev`.

## Deploy to Netlify

1. Push this folder to a GitHub repository.
2. In Netlify, choose **Add new site → Import an existing project** and select the repository.
3. Build command: `npm run build`; publish directory: `dist`. `netlify.toml` already configures these.
4. Create a Supabase project. Run `supabase/schema.sql` in its SQL Editor.
5. In Netlify → Site configuration → Environment variables, add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Never expose the service-role key in frontend variables or commit it to Git.
6. Redeploy. The contact form posts to `/api/contact` and the Netlify function stores messages in Supabase.

## Personalise before public launch

- Replace the generic project links with the actual repository/demo links for each project. The current GitHub links are profile-level placeholders, not verified project repositories.
- Confirm exact employment dates, degree wording, project descriptions and public-facing role titles.
- Add your chosen headshot, project screenshots, travel photos and resume PDF when ready.
- Review the availability indicator and remove/change it if you are not actively looking.
- Add rate limiting / CAPTCHA and an email notification provider before promoting the public contact form widely.

## Current implementation scope

This is the first working portfolio frontend and contact endpoint foundation. The protected admin dashboard, resume upload manager, dynamic project editor, GitHub repository integration and analytics are not implemented yet; those are sensible next milestones. Do not treat the initial illustrative project artwork as actual product screenshots.
