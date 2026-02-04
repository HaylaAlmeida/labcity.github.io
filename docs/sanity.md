# Sanity (CMS) Setup

This repo can load content from Sanity when `NEXT_PUBLIC_SANITY_PROJECT_ID` is configured.

## Environment variables

Copy `.env.example` -> `.env.local` and set:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (usually `production`)
- `NEXT_PUBLIC_SANITY_API_VERSION` (example: `2025-01-01`)
- `REVALIDATE_SECRET` (any random string)

Optional (only if your dataset is private):

- `SANITY_API_READ_TOKEN`

## Content types expected by the site

The Next.js app queries these document types:

### `person`

Fields:

- `id` (string, optional)
- `name` (string, required)
- `level` (string, required): `coordinator` | `doctor` | `master` | `undergraduate`
- `role` (string, optional; used for coordinators)
- `focus` (string, optional)
- `lattes` (url/string, optional)
- `email` (string, optional)
- `linkedin` (url/string, optional)
- `order` (number, optional; sorting)
- `image` (image, optional) OR `imageUrl` (url/string, optional)

### `project`

Fields:

- `id` (string, optional)
- `title` (string, required)
- `slug` (slug, required)
- `category` (string, required)
- `status` (string, required)
- `description` (string, required)
- `longDescription` (text, optional)
- `partners` (array of strings, optional)
- `features` (array of strings, optional)
- `order` (number, optional; sorting)
- `image` (image, optional) OR `imageUrl` (url/string, optional)

### `publication`

Fields:

- `id` (string, optional)
- `title` (string, required)
- `slug` (slug, required)
- `year` (number, required)
- `type` (string, required): `journal` | `conference` | `book` | `thesis`
- `venue` (string, required)
- `doi` (url/string, optional)
- `abstract` (text, optional)
- `tags` (array of strings, optional)
- `authors` (preferred) array of references to `person` OR array of strings

## Revalidation (webhook)

Configure a webhook in Sanity to call:

- `POST https://<your-vercel-domain>/api/revalidate?secret=<REVALIDATE_SECRET>`

This clears cached fetches tagged with:

- `sanity:publications`
- `sanity:projects`
- `sanity:team`
