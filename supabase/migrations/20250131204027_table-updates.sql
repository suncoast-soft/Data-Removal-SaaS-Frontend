set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_search_queue()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  INSERT INTO broker_searches (profile_id, broker_id, search_status, version)
  SELECT NEW.id, brokers.id, 'queued', TO_CHAR(NOW(), 'YYYY-MM-DD')
  FROM brokers;

  INSERT INTO google_searches (profile_id, search_status, version)
  VALUES (NEW.id, 'queued', TO_CHAR(NOW(), 'YYYY-MM-DD'));

  RETURN NEW;
END;$function$
;

create policy "Enable insert for authenticated users only"
on "public"."google_searches"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read for authenticated users only"
on "public"."google_searches"
as permissive
for select
to authenticated
using (true);




