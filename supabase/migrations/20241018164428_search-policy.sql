alter table "public"."search" add column "updated_at" timestamp with time zone default now();

alter table "public"."search" add column "user_id" uuid;

alter table "public"."search" add constraint "search_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."search" validate constraint "search_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_search_queue()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  INSERT INTO search (broker_id, user_id, profile_id, status)
  SELECT brokers.id, NEW.user_id, NEW.id, 'queued'
  FROM brokers;

  RETURN NEW;
END;$function$
;

create policy "Can view own data"
on "public"."search"
as permissive
for select
to public
using ((auth.uid() = user_id));


create policy "Enable insert for users based on user_id"
on "public"."search"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = user_id));


CREATE TRIGGER create_search_queue AFTER INSERT ON public.profiles FOR EACH ROW EXECUTE FUNCTION create_search_queue();



