

## Fix: Secure `user_roles` table against privilege escalation

### Problem
The `user_roles` table has RLS enabled but no policies, meaning any authenticated user can INSERT a row giving themselves `admin` role — granting access to all leads and profiles.

### Solution
Add RLS policies restricting all operations on `user_roles` to existing admins only, using the `has_role()` security definer function.

### Migration SQL
```sql
-- SELECT: only admins can read roles
CREATE POLICY "Admins can view user_roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- INSERT: only admins can assign roles
CREATE POLICY "Admins can insert user_roles"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- UPDATE: only admins can change roles
CREATE POLICY "Admins can update user_roles"
ON public.user_roles FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- DELETE: only admins can remove roles
CREATE POLICY "Admins can delete user_roles"
ON public.user_roles FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
```

No code changes needed — only a database migration.

