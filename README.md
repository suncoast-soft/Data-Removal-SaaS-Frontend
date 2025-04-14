# Data-Removal-SaaS-Frontend Project Overview

## Local Development Setup

```
npm install
```

Create a .env file with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=<your_local_supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_local_supabase_key>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

There's a lot more env variables you need to set. Please reach out to one
of the other developers for the full list.

```
npx supabase start
npm run dev
```

## Supabase

### Example Policy

```
alter policy "Enable insert for users based on profile_id"
on "public"."google"
to public
with check (
  (( SELECT auth.uid() AS uid) IN ( SELECT profiles.user_id
   FROM profiles
  WHERE (profiles.id = profile_id)))
);
```
