

## Plan: Create Admin Account

### Steps

1. **Create a one-time edge function** (`create-admin`) that:
   - Uses the `SUPABASE_SERVICE_ROLE_KEY` (already configured) to create the user via `supabase.auth.admin.createUser()`
   - Email: `admin@viz.pt`, Password: `18062011`, email auto-confirmed
   - Inserts a row into `user_roles` with `role = 'admin'` for the new user
   - Returns success/error response

2. **Invoke the edge function** to create the account

3. **Delete the edge function** immediately after — it's a one-time setup utility and should not remain in the codebase

### Files changed
- `supabase/functions/create-admin/index.ts` — created, then deleted after use

### Security
- The edge function uses the service role key (already stored as a secret) — no credentials are hardcoded
- The function is deleted immediately after invocation
- You should change your password after first login since it was shared in chat

