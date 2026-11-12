-- Run this in the Supabase SQL editor. Messages are write-only for the public site;
-- only trusted admins should be able to read them through a separate protected workflow.
create table if not exists public.messages (
  id bigint generated always as identity primary key,
  email text not null check (char_length(email) <= 254),
  message text not null check (char_length(message) between 8 and 5000),
  created_at timestamptz not null default now()
);
alter table public.messages enable row level security;
-- Do not add an anon SELECT policy. The Netlify function writes with the server-only service role key.
