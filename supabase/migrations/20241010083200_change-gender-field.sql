alter table "public"."users" alter column "gender" drop default;

alter table "public"."users" alter column "gender" set data type character varying using "gender"::character varying;



