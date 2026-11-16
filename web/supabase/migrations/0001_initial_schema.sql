-- Initial schema for the founder curriculum platform.
-- Curriculum tables mirror src/content (the repo is the source of truth for now; seed.sql keeps them in sync).
-- User tables (profiles, progress, deliverables, subscriptions) are owned by Supabase Auth users.

create extension if not exists "pgcrypto";

-- ───────────── Curriculum ─────────────

create table pillars (
  id uuid primary key default gen_random_uuid(),
  number int not null unique,
  slug text not null unique,
  title text not null,
  color text not null,
  tagline text,
  core_question text,
  deliverable text,
  is_published boolean not null default false
);

create table modules (
  id uuid primary key default gen_random_uuid(),
  pillar_id uuid not null references pillars(id) on delete cascade,
  number int not null,
  title text not null,
  is_free boolean not null default false,
  deliverable_title text,
  unique (pillar_id, number)
);

create table tracks (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references modules(id) on delete cascade,
  number int not null,
  slug text not null,
  title text not null,
  kind text not null check (kind in ('cinematic', 'screen')),
  story text,
  video_id text,
  duration_min int,
  is_published boolean not null default false,
  refresh_due_at date,
  unique (module_id, number)
);

create table quiz_questions (
  id uuid primary key default gen_random_uuid(),
  track_id uuid not null references tracks(id) on delete cascade,
  question text not null,
  options text[] not null,
  answer_index int not null,
  explanation text
);

-- ───────────── Users ─────────────

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  username text unique,
  phone text,
  persona text check (persona in ('student', 'professional', 'school')),
  plan text not null default 'free' check (plan in ('free', 'pro', 'founding', 'student', 'school')),
  created_at timestamptz not null default now()
);

create table progress (
  user_id uuid not null references profiles(id) on delete cascade,
  track_id uuid not null references tracks(id) on delete cascade,
  status text not null check (status in ('started', 'completed')),
  completed_at timestamptz,
  primary key (user_id, track_id)
);

create table deliverables (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  module_id uuid not null references modules(id) on delete cascade,
  content jsonb not null default '{}'::jsonb,
  files text[] not null default '{}',
  ai_feedback text,
  is_public boolean not null default false,
  submitted_at timestamptz not null default now()
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  plan text not null,
  razorpay_subscription_id text unique,
  status text not null,
  current_period_end timestamptz
);

-- ───────────── Row-level security ─────────────

alter table pillars enable row level security;
alter table modules enable row level security;
alter table tracks enable row level security;
alter table quiz_questions enable row level security;
alter table profiles enable row level security;
alter table progress enable row level security;
alter table deliverables enable row level security;
alter table subscriptions enable row level security;

-- Curriculum is public to read.
create policy "curriculum readable" on pillars for select using (true);
create policy "curriculum readable" on modules for select using (true);
create policy "curriculum readable" on tracks for select using (true);
create policy "curriculum readable" on quiz_questions for select using (true);

-- Users manage their own rows.
create policy "own profile" on profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "own progress" on progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own deliverables" on deliverables for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "public deliverables readable" on deliverables for select using (is_public);
-- Subscriptions are written only by the server (Razorpay webhook, service role); users can read theirs.
create policy "read own subscription" on subscriptions for select using (auth.uid() = user_id);

-- ───────────── Pillars ─────────────

insert into pillars (number, slug, title, color, tagline, is_published) values
  (1, 'problem', 'Problem', '#E4572E', 'Find a problem worth solving.', true),
  (2, 'solution', 'Solution', '#F2A541', 'Build the smallest thing that truly solves it.', true),
  (3, 'market-research', 'Market Research', '#2A9D8F', 'Who pays, how much, who supplies, who competes.', true),
  (4, 'build-with-ai', 'Build with AI', '#3A6EA5', 'Build your business infrastructure yourself.', true),
  (5, 'branding', 'Branding', '#8E5BB5', 'What you stand for, and how you look and sound.', true),
  (6, 'marketing', 'Marketing', '#D1495B', 'Get found by the right people, again and again.', true),
  (7, 'sales', 'Sales', '#1F7A4D', 'Close revenue through every channel.', true),
  (8, 'money-and-ops', 'Money & Ops', '#5C6B73', 'Make the numbers work and stay legal.', false);
