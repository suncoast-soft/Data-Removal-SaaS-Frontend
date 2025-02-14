create policy "Enable insert access for all users"
on "public"."messages"
as permissive
for insert
to public
with check (true);




