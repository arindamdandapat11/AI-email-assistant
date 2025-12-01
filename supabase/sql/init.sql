-- Simple table to store email + reply history
create table if not exists email_replies (
  id bigserial primary key,
  sender text,
  subject text,
  body text,
  tone text,
  generated_reply text,
  created_at timestamptz default now()
);
