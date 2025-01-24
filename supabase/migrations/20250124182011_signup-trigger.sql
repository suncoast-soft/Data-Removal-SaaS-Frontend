CREATE UNIQUE INDEX settings_pkey ON public.settings USING btree (id);

alter table "public"."settings" add constraint "settings_pkey" PRIMARY KEY using index "settings_pkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_user_settings()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  INSERT INTO public.settings (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;$function$
;



