drop policy "Enable users to view their own data only" on "public"."pricing_plans";

alter table "public"."pricing_plans" drop constraint "pricing_plans_profile_id_fkey";

alter table "public"."pricing_plans" drop constraint "pricing_plans_pkey";

drop index if exists "public"."pricing_plans_pkey";

alter table "public"."pricing_plans" drop column "profile_id";

alter table "public"."pricing_plans" add column "user_id" uuid;

CREATE UNIQUE INDEX plans_pkey ON public.pricing_plans USING btree (id);

alter table "public"."pricing_plans" add constraint "plans_pkey" PRIMARY KEY using index "plans_pkey";

alter table "public"."pricing_plans" add constraint "plans_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."pricing_plans" validate constraint "plans_user_id_fkey";

create policy "Enable insert for users based on user_id"
on "public"."pricing_plans"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable users to view their own data only"
on "public"."pricing_plans"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));




