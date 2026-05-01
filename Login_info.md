NEXUS SAAS - ACCESS & ADMINISTRATION GUIDE

1. OVERVIEW
This platform uses role-based access control (RBAC). Users can join 
as standard 'Members' or as 'Admins' if they possess the required 
Security Secret.

2. LOGGING IN AS THE EXISTING ADMIN
If you wish to test the administrative features immediately, use 
the following pre-configured credentials:

   Email:    tejas@admin.com
   Password: admin123
   Role:      Admin

3. REGISTERING A NEW ADMIN USER
To create a new, unique admin account (e.g., for a Teacher):
   
   A. Navigate to the /register page.
   B. Fill in the Name, Email, and Password.
   C. Select "Admin" from the Role dropdown menu.
   D. Enter the "Admin Secret" (Configured in the system environment).
   E. Click "Register".

4. SECURITY NOTE
The "Admin Secret" is a backend environment variable (ADMIN_SECRET) 
that prevents unauthorized users from granting themselves admin 
privileges. Standard users should register as "Member" and do not 
require a secret key.

5. TROUBLESHOOTING
- If the login is stuck, ensure the backend is active on Railway.
- Localhost credentials do not sync with the deployed app; 
  new accounts must be registered on the live URL.
