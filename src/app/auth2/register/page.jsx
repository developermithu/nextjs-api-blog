'use client';

import { useState } from 'react';
import { useAuth2 } from '@/hooks/auth2';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const { register } = useAuth2({
        middleware: 'guest',
        redirectIfAuthenticated: '/auth2/dashboard',
    });

    const submitForm = async event => {
        event.preventDefault();
        register({
            name,
            email,
            password,
            setErrors,
        });
    };

    return (
        <>
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Create a new account
            </h2>

            <form onSubmit={submitForm} className="mt-8 space-y-6">
                {/* Validation Errors */}
                {errors.length > 0 && (
                    <Alert variant="destructive">
                        <AlertDescription>
                            {errors.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </AlertDescription>
                    </Alert>
                )}

                <div className="space-y-4 rounded-md">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            value={name}
                            className="mt-1"
                            onChange={event => setName(event.target.value)}
                            required
                            autoFocus
                        />
                    </div>

                    <div>
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            className="mt-1"
                            onChange={event => setEmail(event.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            className="mt-1"
                            onChange={event => setPassword(event.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-sm">
                        <Link
                            href="/auth2/login"
                            className="font-medium text-blue-600 hover:text-blue-500">
                            Already have an account?
                        </Link>
                    </div>
                </div>

                <Button type="submit" className="w-full">
                    Register
                </Button>
            </form>

        </>
    );
}