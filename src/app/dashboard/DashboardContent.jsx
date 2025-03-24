'use client';

import { useAuth } from '@/hooks/auth';
import { Loader2 } from 'lucide-react';
import UserProfile from './_components/UserProfile';

export default function DashboardContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="p-6 space-y-8">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>

        <UserProfile />
      </div>
    </>
  );
}