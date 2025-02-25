drop trigger if exists "google_search_queued" on "public"."google_searches";

alter table "public"."brokers" add column "logo_url" text;

alter table "public"."profiles" add column "bio" text;

alter table "public"."profiles" add column "ssn" text;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_search_queue()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  INSERT INTO broker_searches (profile_id, broker_id, search_status, version)
  SELECT NEW.id, brokers.id, 'queued', TO_CHAR(NOW(), 'YYYY-MM-DD')
  FROM brokers;

  RETURN NEW;
END;$function$
;
