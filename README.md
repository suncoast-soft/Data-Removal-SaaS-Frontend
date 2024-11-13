# Pup Erase App

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
