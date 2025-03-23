'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="text-center px-4">
                <div
                // initial={{ opacity: 0, y: 20 }}
                // animate={{ opacity: 1, y: 0 }}
                // transition={{ duration: 0.5 }}
                >
                    <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">404</h1>
                    <div className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                            Page Not Found
                        </h2>

                        <p className="text-gray-600 dark:text-gray-400 mt-2 mb-8">
                            The page you are looking for doesn't exist or has been moved.
                        </p>

                        <div className="flex gap-4 justify-center">
                            <Button
                                onClick={() => router.back()}
                                variant="outline"
                                className="hover:shadow-md transition-shadow"
                            >
                                Go Back
                            </Button>

                            <Button
                                onClick={() => router.push('/')}
                                className="hover:shadow-md transition-shadow"
                            >
                                Home Page
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}