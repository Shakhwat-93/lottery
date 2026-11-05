create table public.vip_code_settings (
  id text primary key default 'main' check (id = 'main'),
  first_date date not null,
  second_date date not null,
  vip_code text not null check (vip_code ~ '^[0-9]{5}$'),
  updated_at timestamptz not null default now(),
  constraint vip_code_settings_distinct_dates check (first_date <> second_date)
);

alter table public.vip_code_settings enable row level security;

grant select on public.vip_code_settings to anon, authenticated;
grant update on public.vip_code_settings to authenticated;

create policy "Public can read VIP code settings"
  on public.vip_code_settings
  for select
  to anon, authenticated
  using (true);

create policy "Admins can update VIP code settings"
  on public.vip_code_settings
  for update
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

insert into public.vip_code_settings (id, first_date, second_date, vip_code)
values ('main', date '2026-11-01', date '2026-11-16', '17248');
