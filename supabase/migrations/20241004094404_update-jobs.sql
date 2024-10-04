create type "public"."removal_status" as enum ('requested', 'in_progress', 'completed', 'failed');

alter table "public"."jobs" add column "note" text;

alter table "public"."jobs" add column "removal_status" removal_status;

create policy "users can delete own data"
on "public"."jobs"
as permissive
for delete
to public
using ((auth.uid() = "user"));




