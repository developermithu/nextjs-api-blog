'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/auth';
import { Loader2 } from 'lucide-react';

export default function Dashboard() {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user?.name}!</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isAdmin ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Posts Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Manage your blog posts, including drafts and published content.</p>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View the latest published posts on our blog.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}