# Blog Frontend

A minimalist seo friendly blog application built with **Next.js** and **Laravel REST API**.

## Features

- 🔐 Authentication with Laravel Sanctum
- 👤 User and Admin roles
- 📝 Blog post management 
- 🎨 Modern UI with Tailwind CSS
- 🔄 Real-time data updates with SWR
- 📱 Responsive design

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Laravel backend server running

## Installation

1. Clone the repository:
   
```bash
git clone https://github.com/developermithu/nextjs-api-blog.git
cd nextjs-api-blog
```

2. Install dependencies:
   
```bash
npm install or bun install
```

3. Create a `.env.local` file in the root directory and add the following content:
   
```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

4. Start the development server:
   
```bash
npm run dev or bun dev
```

5. Open `http://localhost:3000` in your browser to view the application.


## Project Structure

```
nextjs-api-blog/
├── src/
│   ├── app/           # Next.js app router pages
│   ├── components/    # Reusable components
│   ├── hooks/         # Custom React hooks
│   ├── lib/          # Utilities and configurations
│   ├── services/     # API service functions
│   └── styles/       # Global styles
```

## Authentication

The application uses **Laravel Sanctum** for authentication. The authentication flow is handled through the `useAuth` hook, which provides:

- Login/Logout functionality
- Registration
- Password reset
- Email verification
- Role-based access control

## Dependencies

Key dependencies used in this project:

- Next.js 15 - React framework
- Tailwind CSS V4 - Utility-first CSS framework
- SWR - Data fetching and caching
- Axios - HTTP client
- Lucide React - Icon library
- Shadcn UI - UI components library