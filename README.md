# Shwe Yadanar Lin (SYL)

A dynamic jewelry storefront built with **React + TypeScript + Vite + Tailwind CSS**, backed by **Supabase** for database, authentication, and image storage.

The public website loads all of its content from the database, and a password-protected admin panel lets you manage it without touching any code.

## Features

- Public storefront: hero, featured collections, signature products, product detail pages, collection pages, about, contact/footer
- Admin panel at `#/admin`:
  - Email/password login (Supabase Auth)
  - Create, edit, reorder, and delete products
  - Manage featured collections
  - Edit every text section, contact detail, social link, and image
  - Upload images to Supabase Storage
- Row Level Security: visitors can only read; only signed-in admins can write
- Graceful fallback: if Supabase is not configured, the site still renders the original content

## Tech stack

| Layer     | Technology                                  |
| --------- | ------------------------------------------- |
| Frontend  | React 19, TypeScript, Vite, Tailwind CSS v4 |
| Routing   | React Router (hash routing)                 |
| Backend   | Supabase (Postgres, Auth, Storage)          |
| Icons     | lucide-react                                |

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Wait for the database to finish provisioning.

## 2. Create the database schema

1. In your Supabase project, open **SQL Editor → New query**.
2. Paste the contents of [`supabase/schema.sql`](supabase/schema.sql).
3. Click **Run**.

This creates the `products`, `featured_collections`, and `site_settings` tables, the `site-images` storage bucket, security policies, and seeds the current website content. It is safe to run again — it will not overwrite your edits, and re-running it applies any small migrations for databases created with an older version of this file.

## 3. Create your admin account

There is no public sign-up form on purpose (so visitors cannot create accounts).

1. In Supabase, go to **Authentication → Users → Add user → Create new user**.
2. Enter the admin email and password, and confirm the user.
3. Recommended: go to **Authentication → Sign In / Providers → Email** and turn **Allow new users to sign up** off.

You can log in at `/#/admin` with that email and password.

## 4. Configure environment variables

Copy the example file and fill in your project values:

```bash
cp .env.example .env
```

Find the values in Supabase under **Project Settings → API**:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

> The anon key is safe to expose in the browser. Security is enforced by Row Level Security policies. Never use the `service_role` key in the frontend.

## 5. Run locally

```bash
npm install
npm run dev
```

- Website: `http://localhost:5173/`
- Admin: `http://localhost:5173/#/admin`

## Available scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server            |
| `npm run build`   | Type-check and build to `dist/`      |
| `npm run preview` | Preview the production build         |
| `npm run lint`    | Run ESLint                           |

## Project structure

```text
src/
  components/          Public site sections
  components/admin/    Admin panel (login, layout, managers)
  context/             Auth + site-content providers
  lib/
    api.ts             Supabase data access (CRUD + uploads)
    defaults.ts        Fallback content + default images
    images.ts          Base-path-aware image URLs
    supabase.ts        Supabase client (+ config check)
    types.ts           Shared data types
supabase/
  schema.sql           Tables, RLS, storage policies, seed data
public/images/         Static fallback images
```

## How content works

- On load, `ContentProvider` fetches `site_settings`, `products`, and `featured_collections` in parallel.
- The public components read from that context, so the admin's changes appear after a refresh (or immediately after saving in the admin panel).
- Uploaded images go to the public `site-images` bucket and are stored as absolute URLs.
- Seed rows use paths like `images/s1.jpg`. `resolveImage()` prefixes the Vite base URL, so they work on root domains and sub-path deploys (such as GitHub Pages project sites).

### Collections

- Each featured collection automatically gets its own detail page at `#/collection/<id>`, showing the collection's image, title, and description.
- "Explore Collection →" on the homepage opens that detail page.
- A collection's **External URL** field is optional: leave it empty for the built-in detail page, or set a full `https://` URL to link somewhere else instead.

## Deploying

The frontend is a static build, so it can be hosted anywhere. Two environment variables must be present **at build time**.

### Vercel / Netlify

- Build command: `npm run build`
- Output directory: `dist`
- Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the project's environment settings.

### GitHub Pages

1. Add the secrets `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in **Repository → Settings → Secrets and variables → Actions**.
2. Use a workflow that runs `npm run build` with those secrets as env vars, then publishes `dist/`.
3. Set `base` in `vite.config.ts` to your repository name (e.g. `/SYL/`) if the site is served from a sub-path. Static image paths and hash routing already handle sub-paths.

Because the app uses `HashRouter`, refreshing deep links works on GitHub Pages without extra rewrite rules.

## Adding new editable fields

1. Add the column to the table in Supabase (SQL Editor).
2. Add it to the matching type in `src/lib/types.ts` and the fallback in `src/lib/defaults.ts`.
3. Render it in the relevant public component.
4. Add an input for it in `src/components/admin/SiteContentManager.tsx` (or the relevant manager).

## Security notes

- RLS allows public `SELECT` only. All writes require an authenticated user.
- The storage bucket is public for reads; uploads and deletes require authentication.
- Do not commit `.env` (it is gitignored).
