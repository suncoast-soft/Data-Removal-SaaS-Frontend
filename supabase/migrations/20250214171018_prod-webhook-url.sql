drop trigger if exists "broker_search_queued" on "public"."broker_searches";

drop trigger if exists "google_search_queued" on "public"."google_searches";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_welcome_notification()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  INSERT INTO notifications (user_id, title, description)
  VALUES (
    NEW.id, 
    'Welcome to Pup Erase', 
    '<p>We are here to help remove your personal information from the internet. 
    To learn more about protecting your privacy, please visit our 
    <a href="/blog">Blog page</a>.</p>'
  );

  RETURN NEW;
END;$function$
;

CREATE TRIGGER create_welcome_notification AFTER INSERT ON public.users FOR EACH ROW EXECUTE FUNCTION create_welcome_notification();

CREATE TRIGGER broker_search_queued AFTER INSERT ON public.broker_searches FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('https://api.puperase.com/scan/broker', 'POST', '{"Content-type":"application/json"}', '{}', '10000');

CREATE TRIGGER google_search_queued AFTER INSERT ON public.google_searches FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('https://api.puperase.com/scan/google', 'POST', '{"Content-type":"application/json"}', '{}', '10000');



