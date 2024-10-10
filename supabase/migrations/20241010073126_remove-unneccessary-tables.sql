drop policy "Allow public read-only access." on "public"."prices";

drop policy "Allow public read-only access." on "public"."products";

drop policy "Can only view own subs data." on "public"."subscriptions";

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

alter table "public"."prices" drop constraint "prices_currency_check";

alter table "public"."prices" drop constraint "prices_product_id_fkey";

alter table "public"."subscriptions" drop constraint "subscriptions_price_id_fkey";

alter table "public"."subscriptions" drop constraint "subscriptions_user_id_fkey";

alter table "public"."prices" drop constraint "prices_pkey";

alter table "public"."products" drop constraint "products_pkey";

alter table "public"."subscriptions" drop constraint "subscriptions_pkey";

drop index if exists "public"."prices_pkey";

drop index if exists "public"."products_pkey";

drop index if exists "public"."subscriptions_pkey";

drop table "public"."prices";

drop table "public"."products";

drop table "public"."subscriptions";

alter table "public"."users" drop column "billing_address";

alter table "public"."users" drop column "payment_method";



