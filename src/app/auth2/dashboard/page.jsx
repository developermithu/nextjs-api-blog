'use client';

import { useAuth2 } from '@/hooks/auth2';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();

    const { user, logout } = useAuth2({
        middleware: 'auth',
    });

    if (!user) {
        router.push('/auth2/login');
    }

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Loading...</CardTitle>
                        <CardDescription>Please wait while we verify your authentication.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Welcome, {user?.name}!</CardTitle>
                    <CardDescription>You are logged in with token-based authentication.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Email</p>
                            <p className="text-sm text-gray-900">{user?.email}</p>
                        </div>
                        <Button
                            onClick={logout}
                            variant="destructive"
                            className="w-full">
                            Sign Out
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}