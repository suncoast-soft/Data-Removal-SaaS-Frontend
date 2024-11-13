drop policy "Enable insert for authenticated users only" on "public"."removal";

drop policy "Enable users to view their own data only" on "public"."removal";

drop policy "Enable insert for users based on user_id" on "public"."google";

revoke delete on table "public"."removal" from "anon";

revoke insert on table "public"."removal" from "anon";

revoke references on table "public"."removal" from "anon";

revoke select on table "public"."removal" from "anon";

revoke trigger on table "public"."removal" from "anon";

revoke truncate on table "public"."removal" from "anon";

revoke update on table "public"."removal" from "anon";

revoke delete on table "public"."removal" from "authenticated";

revoke insert on table "public"."removal" from "authenticated";

revoke references on table "public"."removal" from "authenticated";

revoke select on table "public"."removal" from "authenticated";

revoke trigger on table "public"."removal" from "authenticated";

revoke truncate on table "public"."removal" from "authenticated";

revoke update on table "public"."removal" from "authenticated";

revoke delete on table "public"."removal" from "service_role";

revoke insert on table "public"."removal" from "service_role";

revoke references on table "public"."removal" from "service_role";

revoke select on table "public"."removal" from "service_role";

revoke trigger on table "public"."removal" from "service_role";

revoke truncate on table "public"."removal" from "service_role";

revoke update on table "public"."removal" from "service_role";

alter table "public"."removal" drop constraint "removal_search_id_fkey";

alter table "public"."removal" drop constraint "removal_pkey";

drop index if exists "public"."removal_pkey";

drop table "public"."removal";

alter table "public"."google" drop column "results";

alter table "public"."google" drop column "status";

alter table "public"."google" add column "search_result" jsonb;

alter table "public"."google" add column "search_status" search_status;

alter table "public"."searches" drop column "result";

alter table "public"."searches" drop column "status";

alter table "public"."searches" add column "removal_note" text;

alter table "public"."searches" add column "removal_status" removal_status;

alter table "public"."searches" add column "search_result" jsonb;

alter table "public"."searches" add column "search_status" search_status;

create policy "Enable insert for users based on user_id"
on "public"."google"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) IN ( SELECT profiles.user_id
   FROM profiles
  WHERE (profiles.id = google.profile_id))));




