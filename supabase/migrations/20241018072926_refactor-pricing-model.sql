create type "public"."search_status" as enum ('queued', 'in_progress', 'completed', 'failed');

drop policy "users can read own data" on "public"."credits";

drop policy "Enable insert for authenticated users only" on "public"."jobs";

drop policy "users can delete own data" on "public"."jobs";

drop policy "users can update own data" on "public"."jobs";

drop policy "users can view own data" on "public"."jobs";

drop policy "Allow public read-only access." on "public"."prices";

drop policy "Allow public read-only access." on "public"."products";

drop policy "Can only view own subs data." on "public"."subscriptions";

revoke delete on table "public"."credits" from "anon";

revoke insert on table "public"."credits" from "anon";

revoke references on table "public"."credits" from "anon";

revoke select on table "public"."credits" from "anon";

revoke trigger on table "public"."credits" from "anon";

revoke truncate on table "public"."credits" from "anon";

revoke update on table "public"."credits" from "anon";

revoke delete on table "public"."credits" from "authenticated";

revoke insert on table "public"."credits" from "authenticated";

revoke references on table "public"."credits" from "authenticated";

revoke select on table "public"."credits" from "authenticated";

revoke trigger on table "public"."credits" from "authenticated";

revoke truncate on table "public"."credits" from "authenticated";

revoke update on table "public"."credits" from "authenticated";

revoke delete on table "public"."credits" from "service_role";

revoke insert on table "public"."credits" from "service_role";

revoke references on table "public"."credits" from "service_role";

revoke select on table "public"."credits" from "service_role";

revoke trigger on table "public"."credits" from "service_role";

revoke truncate on table "public"."credits" from "service_role";

revoke update on table "public"."credits" from "service_role";

revoke delete on table "public"."customers" from "anon";

revoke insert on table "public"."customers" from "anon";

revoke references on table "public"."customers" from "anon";

revoke select on table "public"."customers" from "anon";

revoke trigger on table "public"."customers" from "anon";

revoke truncate on table "public"."customers" from "anon";

revoke update on table "public"."customers" from "anon";

revoke delete on table "public"."customers" from "authenticated";

revoke insert on table "public"."customers" from "authenticated";

revoke references on table "public"."customers" from "authenticated";

revoke select on table "public"."customers" from "authenticated";

revoke trigger on table "public"."customers" from "authenticated";

revoke truncate on table "public"."customers" from "authenticated";

revoke update on table "public"."customers" from "authenticated";

revoke delete on table "public"."customers" from "service_role";

revoke insert on table "public"."customers" from "service_role";

revoke references on table "public"."customers" from "service_role";

revoke select on table "public"."customers" from "service_role";

revoke trigger on table "public"."customers" from "service_role";

revoke truncate on table "public"."customers" from "service_role";

revoke update on table "public"."customers" from "service_role";

revoke delete on table "public"."jobs" from "anon";

revoke insert on table "public"."jobs" from "anon";

revoke references on table "public"."jobs" from "anon";

revoke select on table "public"."jobs" from "anon";

revoke trigger on table "public"."jobs" from "anon";

revoke truncate on table "public"."jobs" from "anon";

revoke update on table "public"."jobs" from "anon";

revoke delete on table "public"."jobs" from "authenticated";

revoke insert on table "public"."jobs" from "authenticated";

revoke references on table "public"."jobs" from "authenticated";

revoke select on table "public"."jobs" from "authenticated";

revoke trigger on table "public"."jobs" from "authenticated";

revoke truncate on table "public"."jobs" from "authenticated";

revoke update on table "public"."jobs" from "authenticated";

revoke delete on table "public"."jobs" from "service_role";

revoke insert on table "public"."jobs" from "service_role";

revoke references on table "public"."jobs" from "service_role";

revoke select on table "public"."jobs" from "service_role";

revoke trigger on table "public"."jobs" from "service_role";

revoke truncate on table "public"."jobs" from "service_role";

revoke update on table "public"."jobs" from "service_role";

revoke delete on table "public"."prices" from "anon";

revoke insert on table "public"."prices" from "anon";

revoke references on table "public"."prices" from "anon";

revoke select on table "public"."prices" from "anon";

revoke trigger on table "public"."prices" from "anon";

revoke truncate on table "public"."prices" from "anon";

revoke update on table "public"."prices" from "anon";

revoke delete on table "public"."prices" from "authenticated";

revoke insert on table "public"."prices" from "authenticated";

revoke references on table "public"."prices" from "authenticated";

revoke select on table "public"."prices" from "authenticated";

revoke trigger on table "public"."prices" from "authenticated";

revoke truncate on table "public"."prices" from "authenticated";

revoke update on table "public"."prices" from "authenticated";

revoke delete on table "public"."prices" from "service_role";

revoke insert on table "public"."prices" from "service_role";

revoke references on table "public"."prices" from "service_role";

revoke select on table "public"."prices" from "service_role";

revoke trigger on table "public"."prices" from "service_role";

revoke truncate on table "public"."prices" from "service_role";

revoke update on table "public"."prices" from "service_role";

revoke delete on table "public"."products" from "anon";

revoke insert on table "public"."products" from "anon";

revoke references on table "public"."products" from "anon";

revoke select on table "public"."products" from "anon";

revoke trigger on table "public"."products" from "anon";

revoke truncate on table "public"."products" from "anon";

revoke update on table "public"."products" from "anon";

revoke delete on table "public"."products" from "authenticated";

revoke insert on table "public"."products" from "authenticated";

revoke references on table "public"."products" from "authenticated";

revoke select on table "public"."products" from "authenticated";

revoke trigger on table "public"."products" from "authenticated";

revoke truncate on table "public"."products" from "authenticated";

revoke update on table "public"."products" from "authenticated";

revoke delete on table "public"."products" from "service_role";

revoke insert on table "public"."products" from "service_role";

revoke references on table "public"."products" from "service_role";

revoke select on table "public"."products" from "service_role";

revoke trigger on table "public"."products" from "service_role";

revoke truncate on table "public"."products" from "service_role";

revoke update on table "public"."products" from "service_role";

revoke delete on table "public"."subscriptions" from "anon";

revoke insert on table "public"."subscriptions" from "anon";

revoke references on table "public"."subscriptions" from "anon";

revoke select on table "public"."subscriptions" from "anon";

revoke trigger on table "public"."subscriptions" from "anon";

revoke truncate on table "public"."subscriptions" from "anon";

revoke update on table "public"."subscriptions" from "anon";

revoke delete on table "public"."subscriptions" from "authenticated";

revoke insert on table "public"."subscriptions" from "authenticated";

revoke references on table "public"."subscriptions" from "authenticated";

revoke select on table "public"."subscriptions" from "authenticated";

revoke trigger on table "public"."subscriptions" from "authenticated";

revoke truncate on table "public"."subscriptions" from "authenticated";

revoke update on table "public"."subscriptions" from "authenticated";

revoke delete on table "public"."subscriptions" from "service_role";

revoke insert on table "public"."subscriptions" from "service_role";

revoke references on table "public"."subscriptions" from "service_role";

revoke select on table "public"."subscriptions" from "service_role";

revoke trigger on table "public"."subscriptions" from "service_role";

revoke truncate on table "public"."subscriptions" from "service_role";

revoke update on table "public"."subscriptions" from "service_role";

alter table "public"."credits" drop constraint "credits_user_fkey";

alter table "public"."credits" drop constraint "credits_user_id_fkey";

alter table "public"."customers" drop constraint "customers_id_fkey";

alter table "public"."jobs" drop constraint "jobs_broker_fkey";

alter table "public"."jobs" drop constraint "jobs_user_fkey";

alter table "public"."prices" drop constraint "prices_currency_check";

alter table "public"."prices" drop constraint "prices_product_id_fkey";

alter table "public"."subscriptions" drop constraint "subscriptions_price_id_fkey";

alter table "public"."subscriptions" drop constraint "subscriptions_user_id_fkey";

alter table "public"."credits" drop constraint "credits_pkey";

alter table "public"."customers" drop constraint "customers_pkey";

alter table "public"."jobs" drop constraint "jobs_pkey";

alter table "public"."prices" drop constraint "prices_pkey";

alter table "public"."products" drop constraint "products_pkey";

alter table "public"."subscriptions" drop constraint "subscriptions_pkey";

drop index if exists "public"."credits_pkey";

drop index if exists "public"."customers_pkey";

drop index if exists "public"."jobs_pkey";

drop index if exists "public"."prices_pkey";

drop index if exists "public"."products_pkey";

drop index if exists "public"."subscriptions_pkey";

drop table "public"."credits";

drop table "public"."customers";

drop table "public"."jobs";

drop table "public"."prices";

drop table "public"."products";

drop table "public"."subscriptions";

alter type "public"."pricing_type" rename to "pricing_type__old_version_to_be_dropped";

create type "public"."pricing_type" as enum ('one_year', 'two_year', 'annual_recurring');

alter type "public"."removal_status" rename to "removal_status__old_version_to_be_dropped";

create type "public"."removal_status" as enum ('queued', 'in_progress', 'need_customer_action', 'completed', 'failed');

create table "public"."pricing" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "profile_id" bigint,
    "type" pricing_type
);


alter table "public"."pricing" enable row level security;

create table "public"."profiles" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid,
    "first_name" text,
    "last_name" text,
    "birth_date" date,
    "gender" character varying default 'male'::character varying,
    "city" text,
    "state" text
);


alter table "public"."profiles" enable row level security;

create table "public"."removal" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "search_id" bigint,
    "status" removal_status,
    "note" text
);


alter table "public"."removal" enable row level security;

create table "public"."search" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "profile_id" bigint,
    "broker_id" bigint,
    "status" search_status,
    "result" jsonb
);


alter table "public"."search" enable row level security;

drop type "public"."pricing_type__old_version_to_be_dropped";

drop type "public"."removal_status__old_version_to_be_dropped";

alter table "public"."users" drop column "billing_address";

alter table "public"."users" drop column "birth_date";

alter table "public"."users" drop column "city";

alter table "public"."users" drop column "first_name";

alter table "public"."users" drop column "gender";

alter table "public"."users" drop column "last_name";

alter table "public"."users" drop column "payment_method";

alter table "public"."users" drop column "state";

alter table "public"."users" add column "stripe_customer_id" text;

drop type "public"."job_status";

drop type "public"."pricing_plan_interval";

drop type "public"."subscription_status";

CREATE UNIQUE INDEX pricing_pkey ON public.pricing USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX removal_pkey ON public.removal USING btree (id);

CREATE UNIQUE INDEX search_pkey ON public.search USING btree (id);

alter table "public"."pricing" add constraint "pricing_pkey" PRIMARY KEY using index "pricing_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."removal" add constraint "removal_pkey" PRIMARY KEY using index "removal_pkey";

alter table "public"."search" add constraint "search_pkey" PRIMARY KEY using index "search_pkey";

alter table "public"."pricing" add constraint "pricing_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) not valid;

alter table "public"."pricing" validate constraint "pricing_profile_id_fkey";

alter table "public"."profiles" add constraint "profiles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."profiles" validate constraint "profiles_user_id_fkey";

alter table "public"."removal" add constraint "removal_search_id_fkey" FOREIGN KEY (search_id) REFERENCES search(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."removal" validate constraint "removal_search_id_fkey";

alter table "public"."search" add constraint "search_broker_id_fkey" FOREIGN KEY (broker_id) REFERENCES brokers(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."search" validate constraint "search_broker_id_fkey";

alter table "public"."search" add constraint "search_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."search" validate constraint "search_profile_id_fkey";

grant delete on table "public"."pricing" to "anon";

grant insert on table "public"."pricing" to "anon";

grant references on table "public"."pricing" to "anon";

grant select on table "public"."pricing" to "anon";

grant trigger on table "public"."pricing" to "anon";

grant truncate on table "public"."pricing" to "anon";

grant update on table "public"."pricing" to "anon";

grant delete on table "public"."pricing" to "authenticated";

grant insert on table "public"."pricing" to "authenticated";

grant references on table "public"."pricing" to "authenticated";

grant select on table "public"."pricing" to "authenticated";

grant trigger on table "public"."pricing" to "authenticated";

grant truncate on table "public"."pricing" to "authenticated";

grant update on table "public"."pricing" to "authenticated";

grant delete on table "public"."pricing" to "service_role";

grant insert on table "public"."pricing" to "service_role";

grant references on table "public"."pricing" to "service_role";

grant select on table "public"."pricing" to "service_role";

grant trigger on table "public"."pricing" to "service_role";

grant truncate on table "public"."pricing" to "service_role";

grant update on table "public"."pricing" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."removal" to "anon";

grant insert on table "public"."removal" to "anon";

grant references on table "public"."removal" to "anon";

grant select on table "public"."removal" to "anon";

grant trigger on table "public"."removal" to "anon";

grant truncate on table "public"."removal" to "anon";

grant update on table "public"."removal" to "anon";

grant delete on table "public"."removal" to "authenticated";

grant insert on table "public"."removal" to "authenticated";

grant references on table "public"."removal" to "authenticated";

grant select on table "public"."removal" to "authenticated";

grant trigger on table "public"."removal" to "authenticated";

grant truncate on table "public"."removal" to "authenticated";

grant update on table "public"."removal" to "authenticated";

grant delete on table "public"."removal" to "service_role";

grant insert on table "public"."removal" to "service_role";

grant references on table "public"."removal" to "service_role";

grant select on table "public"."removal" to "service_role";

grant trigger on table "public"."removal" to "service_role";

grant truncate on table "public"."removal" to "service_role";

grant update on table "public"."removal" to "service_role";

grant delete on table "public"."search" to "anon";

grant insert on table "public"."search" to "anon";

grant references on table "public"."search" to "anon";

grant select on table "public"."search" to "anon";

grant trigger on table "public"."search" to "anon";

grant truncate on table "public"."search" to "anon";

grant update on table "public"."search" to "anon";

grant delete on table "public"."search" to "authenticated";

grant insert on table "public"."search" to "authenticated";

grant references on table "public"."search" to "authenticated";

grant select on table "public"."search" to "authenticated";

grant trigger on table "public"."search" to "authenticated";

grant truncate on table "public"."search" to "authenticated";

grant update on table "public"."search" to "authenticated";

grant delete on table "public"."search" to "service_role";

grant insert on table "public"."search" to "service_role";

grant references on table "public"."search" to "service_role";

grant select on table "public"."search" to "service_role";

grant trigger on table "public"."search" to "service_role";

grant truncate on table "public"."search" to "service_role";

grant update on table "public"."search" to "service_role";



