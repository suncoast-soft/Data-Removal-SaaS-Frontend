alter table "public"."pricing" add column "user_id" uuid;

alter table "public"."pricing" add constraint "pricing_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."pricing" validate constraint "pricing_user_id_fkey";

create policy "Can view own data"
on "public"."pricing"
as permissive
for select
to public
using ((auth.uid() = user_id));


create policy "Enable insert for users based on user_id"
on "public"."pricing"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = user_id));




