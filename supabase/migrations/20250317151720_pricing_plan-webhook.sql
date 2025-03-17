CREATE TRIGGER new_pupguard_signup AFTER INSERT ON public.pricing_plans FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('https://api.puperase.com/pupguard', 'POST', '{"Content-type":"application/json"}', '{}', '5000');



