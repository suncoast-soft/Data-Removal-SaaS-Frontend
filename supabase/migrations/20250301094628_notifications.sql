
CREATE TRIGGER new_user_signup AFTER INSERT ON public.users FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('https://api.puperase.com/user', 'POST', '{"Content-type":"application/json"}', '{}', '5000');

