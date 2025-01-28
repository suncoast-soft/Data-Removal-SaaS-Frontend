drop trigger if exists "create_primary_profile" on "public"."users";

drop function if exists "public"."create_primary_profile"();

alter table "public"."users" add column "email" text;

alter table "public"."users" add column "phone" text;

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

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  INSERT INTO public.users (id)
  VALUES (NEW.id);

  RETURN NEW;
END;$function$
;



