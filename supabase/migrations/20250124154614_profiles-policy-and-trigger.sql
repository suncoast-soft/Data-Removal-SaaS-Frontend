alter table "public"."settings" alter column "allow_multi_device_login" set default true;

alter table "public"."settings" alter column "deleted" set default false;

alter table "public"."settings" alter column "receive_marketing_emails" set default true;

alter table "public"."settings" alter column "receive_status_updates" set default 'email'::text;

alter table "public"."settings" alter column "require_multi_factor_verification" set default false;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_user_settings()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  INSERT INTO settings (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;$function$
;

create policy "Enable insert for users based on user_id"
on "public"."settings"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable update for users based on user_id"
on "public"."settings"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = user_id))
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable users to view their own data only"
on "public"."settings"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


CREATE TRIGGER create_user_settings AFTER INSERT ON public.users FOR EACH ROW EXECUTE FUNCTION create_user_settings();



