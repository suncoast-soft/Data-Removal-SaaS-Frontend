set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_search_queue()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  INSERT INTO searches (profile_id, broker_type, broker_id, search_status)
  SELECT NEW.id, 'broker_site', brokers.id, 'queued'
  FROM brokers;

  INSERT INTO searches (profile_id, broker_type, search_status)
  VALUES (NEW.id, 'google', 'queued');

  RETURN NEW;
END;$function$
;

create policy "Enable insert for authenticated users only"
on "public"."searches"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) IN ( SELECT profiles.user_id
   FROM profiles
  WHERE (profiles.id = searches.profile_id))));




