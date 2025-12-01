# AI-email-assistant
AI Email Reply Assistant that generates professional, context-aware responses from email threads. Built with React, Spring Boot, PostgreSQL, and OpenAI API. Includes tone selection, secure data handling, and an interface to review and edit AI-generated drafts before sending.
Full Setup Guide (Frontend + Backend + Gemini AI + Supabase)

This project uses:
- Frontend: Your existing Lovable-generated React + Vite + Tailwind frontend (unchanged)
- Backend: Supabase Edge Function rewritten to use Gemini 1.5 Pro
- Database (optional): SQL table to store reply history

Frontend is NOT modified. Only backend is replaced.

------------------------------------------------------------
🚀 QUICK START
------------------------------------------------------------

1) INSTALL DEPENDENCIES (FRONTEND)

cd <your-project-folder>
npm install
or
bun install

------------------------------------------------------------
2) CONFIGURE SUPABASE

cd supabase
supabase login

supabase link --project-ref <YOUR_SUPABASE_PROJECT_ID>

------------------------------------------------------------
3) SET GEMINI API KEY

supabase secrets set \
  GEMINI_API_KEY="YOUR_GEMINI_KEY_HERE" \
  GEMINI_MODEL="gemini-1.5-pro"

------------------------------------------------------------
4) DEPLOY EDGE FUNCTION

The backend function is located at:
supabase/functions/generate-reply/index.ts

Deploy it:

supabase functions deploy generate-reply

After deployment it runs at:
https://<PROJECT_ID>.supabase.co/functions/v1/generate-reply

Frontend already calls this function.

------------------------------------------------------------
5) RUN FRONTEND

cd <your-project-folder>
npm run dev
or
bun run dev

Open:
http://localhost:5173

------------------------------------------------------------
🧠 FRONTEND ENV SETUP (.env)
------------------------------------------------------------

VITE_SUPABASE_URL="https://<YOUR_PROJECT_ID>.supabase.co"
VITE_SUPABASE_ANON_KEY="<YOUR_ANON_PUBLIC_KEY>"

------------------------------------------------------------
🗄 OPTIONAL: SQL TABLE (reply history)
------------------------------------------------------------

Run sql:
supabase/sql/init.sql

OR paste it in Supabase Dashboard → SQL Editor.

Creates table: email_replies ( id SERIAL PRIMARY KEY, sender TEXT, subject TEXT, body TEXT, tone TEXT, generated_reply TEXT, created_at timestamptz DEFAULT NOW() )

------------------------------------------------------------
END OF README
