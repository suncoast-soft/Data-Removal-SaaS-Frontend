set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.users (id)
  values (new.id);

  insert into public.profiles (user_id, email, phone, first_name, last_name, birth_date, gender, address, bio)
  values (new.id, new.raw_user_meta_data->>'email', new.raw_user_meta_data->>'phone', new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name', new.raw_user_meta_data->>'birth_date', new.raw_user_meta_data->>'gender', new.raw_user_meta_data->>'address', new.raw_user_meta_data->>'bio');

  return new;
end;$function$
;



