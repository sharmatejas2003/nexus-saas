# Nexus SaaS Task Management

Nexus SaaS is a full-stack project management platform designed for industrial-scale task tracking and AI-assisted workflow generation.

## Technical Stack
- Frontend: React.js with Tailwind CSS
- Backend: Node.js and Express
- Database: MongoDB via Mongoose
- AI Integration: Google Gemini 1.5 Flash (v1beta)

## Core Features
- AI Task Generation: Context-aware task creation using project metadata.
- Role-Based Access: Dedicated Admin and User dashboards.
- Progress Tracking: Real-time updates for task statuses (Pending, In Progress, Submitted, Completed).
- Bulk Operations: Single-request task creation to optimize API usage.

## 👑 Admin Access & Authentication
To test the administrative features or create a teacher account, please refer to the detailed access guide:

👉 **[View the Admin & Registration Guide](./Admin_Guide.txt)**

This file contains pre-configured credentials and instructions on how to use the "Admin Secret" for new registrations.

## Local Setup
1. Clone the repository.
2. Install dependencies in both frontend and backend folders using `npm install`.
3. Create a `.env` file in the backend folder with `MONGO_URI`, `JWT_SECRET`, and `GEMINI_API_KEY`.
4. Run `npm run dev` in both directories.

## Deployment
## Imp ->
This application is deployed on Railway. Ensure all backend environment variables (including the `ADMIN_SECRET`) are added to the Railway project settings.