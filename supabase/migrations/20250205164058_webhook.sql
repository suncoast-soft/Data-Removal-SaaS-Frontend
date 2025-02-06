CREATE TRIGGER broker_search_queued AFTER INSERT ON public.broker_searches FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('https://api.puperase.com/scan/broker', 'POST', '{"Content-type":"application/json"}', '{}', '10000');

CREATE TRIGGER google_search_queued AFTER INSERT ON public.google_searches FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('https://api.puperase.com/scan/google', 'POST', '{"Content-type":"application/json"}', '{}', '10000');



