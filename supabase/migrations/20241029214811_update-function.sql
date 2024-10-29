alter table "public"."brokers" drop column "scraping_selector";

alter table "public"."brokers" add column "need_captcha" boolean default false;

alter table "public"."brokers" add column "need_vpn" boolean default false;

alter table "public"."brokers" add column "notes" text;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_search_queue()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  INSERT INTO searches (broker_id, user_id, profile_id, status)
  SELECT brokers.id, NEW.user_id, NEW.id, 'queued'
  FROM brokers;

  INSERT INTO google (user_id, profile_id, status)
  VALUES (NEW.user_id, NEW.id, 'queued');

  RETURN NEW;
END;$function$
;



