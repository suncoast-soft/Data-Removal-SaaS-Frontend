create policy "Can view own data"
on "public"."profiles"
as permissive
for select
to public
using ((auth.uid() = user_id));


create policy "Enable insert for users based on user_id"
on "public"."profiles"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = user_id));




