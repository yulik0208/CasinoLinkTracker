# Product Links Analytics Portal

A dynamic web portal featuring curated product links with analytics tracking, built with React, TypeScript, and Express.

## Tech Stack

- Frontend:
  - React (Vite)
  - TypeScript
  - Tailwind CSS
  - React Query for data fetching
  - shadcn/ui components

- Backend:
  - Express.js
  - PostgreSQL
  - Drizzle ORM

## Running the Project

### On Replit

1. Fork this repl to your Replit account
2. Click the "Run" button
3. The application will automatically:
   - Start the Express backend server
   - Launch the Vite development server
   - Open the web interface

The application runs on port 5000 by default.

### Local Development

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
├── client/          # Frontend React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── lib/        # Utility functions
│   │   └── pages/      # Page components
├── server/          # Backend Express server
│   ├── routes.ts    # API routes
│   └── storage.ts   # Database interface
└── shared/          # Shared types and schemas
    └── schema.ts    # Database schemas
```

## Pushing to Git

To push your Replit project to Git:

1. Initialize Git in your Replit project (if not already done):
```bash
git init
```

2. Add your remote repository:
```bash
git remote add origin your-repository-url
```

3. Stage and commit your changes:
```bash
git add .
git commit -m "Your commit message"
```

4. Push to your repository:
```bash
git push -u origin main
```

The time it takes to push depends on:
- Your project size
- Internet connection speed
- Git repository service response time

Typically, for a project of this size, it takes about 1-2 minutes to complete the push.

## Analytics Features

The portal tracks:
- Page visits
- User interactions
- Product link clicks

View analytics data in the `/analytics` route of the application.
