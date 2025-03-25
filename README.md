# Next.js + Laravel Rest API

A minimalist seo friendly blog application built with **Next.js** and **Laravel REST API**.

## Features

- 🔐 Authentication with Laravel Sanctum
- 👤 User and Admin roles
- 📝 Blog post management 
- 🎨 Modern UI with Tailwind CSS
- 🔄 Real-time data updates with SWR
- 📱 Responsive design

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
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

4. Start the development server:
   
```bash
npm run dev or bun dev
```

5. Open `http://localhost:3000` in your browser to view the application.

<!-- dummy login credentials -->

## Login with the following credentials:


```bash
# Admin Info:
Email: admin@gmail.com
Password: admin

# User Info:
Email: user@gmail.com
Password: user
```

## Project Structure

```nextjs-api-blog/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Authentication routes
│   │   ├── (main)/              # Public routes
│   │   ├── dashboard/           # Protected dashboard routes
│   │   ├── styles/              # Global styles
│   │   ├── layout.jsx           # Root layout
│   │   └── page.jsx             # Home page
│   ├── components/              # Reusable components
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utilities and configurations
│   └── services/                # API service functions
```

## Authentication

The application uses **Laravel Sanctum** for authentication. The authentication flow is handled through the `useAuth` hook, which provides:

- **Login**, **Register** and **Logout** functionality

## Dependencies

Key dependencies used in this project: 

- [Backend](https://github.com/developermithu/api-blog-laravel) - Laravel + Sanctum
- [Next.js 15](https://nextjs.org/) - React framework
- [Tailwind CSS V4](https://tailwindcss.com/) - Utility-first CSS framework
- [SWR](https://swr.vercel.app/) - Data fetching and caching
- [Axios](https://axios-http.com/) - HTTP client
- [Lucide React](https://lucide.dev/) - Icon library
- [Shadcn UI](https://ui.shadcn.com/) - UI components library

Made with ❤️ by [developermithu](https://developermithu.com)