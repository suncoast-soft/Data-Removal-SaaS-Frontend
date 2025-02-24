-- Remove ssn and bio columns from profiles table
ALTER TABLE "public"."profiles" DROP COLUMN IF EXISTS "ssn";
ALTER TABLE "public"."profiles" DROP COLUMN IF EXISTS "bio";
