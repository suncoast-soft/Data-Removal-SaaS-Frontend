create policy "Enable read access for all users"
on "public"."messages"
as permissive
for select
to public
using (true);




