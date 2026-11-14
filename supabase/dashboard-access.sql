-- ALREADY APPLIED to your project (okkftsurstnouvjvygre). Kept here as a record.
-- The dashboard has NO login. It opens with a private link that carries a secret key.
-- Guests (the invitation website) can still only INSERT RSVPs; they cannot read them.

create table if not exists public.rsvp_dashboard_keys (
  id     int primary key default 1 check (id = 1),
  secret text not null
);
alter table public.rsvp_dashboard_keys enable row level security;   -- no policies = unreadable through the API

insert into public.rsvp_dashboard_keys (secret)
values (replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', ''))
on conflict (id) do nothing;

create or replace function public.rsvp_dashboard_list(p_key text)
returns setof public.rsvps language plpgsql stable security definer set search_path = public as $$
begin
  if p_key is null or not exists (select 1 from public.rsvp_dashboard_keys where secret = p_key) then
    raise exception 'invalid_key' using errcode = '28000';
  end if;
  return query select * from public.rsvps order by created_at desc;
end; $$;

create or replace function public.rsvp_dashboard_delete(p_key text, p_id uuid)
returns boolean language plpgsql security definer set search_path = public as $$
declare n int;
begin
  if p_key is null or not exists (select 1 from public.rsvp_dashboard_keys where secret = p_key) then
    raise exception 'invalid_key' using errcode = '28000';
  end if;
  delete from public.rsvps where id = p_id;
  get diagnostics n = row_count;
  return n > 0;
end; $$;

revoke all on function public.rsvp_dashboard_list(text) from public;
revoke all on function public.rsvp_dashboard_delete(text, uuid) from public;
grant execute on function public.rsvp_dashboard_list(text) to anon, authenticated;
grant execute on function public.rsvp_dashboard_delete(text, uuid) to anon, authenticated;

-- SEE YOUR KEY:
--   select secret from public.rsvp_dashboard_keys;
-- MAKE A NEW KEY (old links stop working):
--   update public.rsvp_dashboard_keys set secret = replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', '') where id = 1;
