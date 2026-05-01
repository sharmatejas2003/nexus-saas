===========================================================
NEXUS SAAS - ACCESS & ADMINISTRATION GUIDE
===========================================================

1. OVERVIEW
This platform uses role-based access control (RBAC). Users can join 
as standard 'Members' or as 'Admins' if they possess the required 
Security Secret.

2. LOGGING IN AS THE EXISTING ADMIN
If you wish to test the administrative features immediately, use 
the following pre-configured credentials:

   Email:    tejas@admin.com
   Password: admin123
   Role:     Admin

3. REGISTERING A NEW ADMIN USER (e.g., for a Teacher)
To create a new admin account:
   
   A. Navigate to the /register page.
   B. Select "Admin" from the Role dropdown menu.
   C. Enter the Admin Secret: tejas_admin_123
   D. Click "Register".

4. HOW TO UPDATE THE ADMIN SECRET
The "Admin Secret" is managed in the Backend Environment Variables. 
To change it:
   
   A. Log into your Railway Dashboard.
   B. Select the 'backend' service for Nexus SaaS.
   C. Go to the 'Variables' tab.
   D. Find or Create 'ADMIN_SECRET'.
   E. Update the value (e.g., change 'tejas_admin_123' to something else).
   F. Railway will automatically redeploy the app with the new key.

5. TROUBLESHOOTING
- Invalid Secret: Ensure the key in the form matches the Railway variable exactly.
- Stuck Loading: Ensure the backend container is "Active" in Railway.

===========================================================
Generated for the Nexus SaaS Project - 2026 Batch
===========================================================