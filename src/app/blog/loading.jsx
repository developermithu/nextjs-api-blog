import { Skeleton } from '@/components/ui/skeleton';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export default function Loading() {
    return (
        <>
            <Header />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <Skeleton className="h-10 w-64 mb-2" />
                    <Skeleton className="h-5 w-96" />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex h-full flex-col overflow-hidden rounded-lg border bg-card">
                            <Skeleton className="h-48 w-full" />
                            <div className="flex-1 p-6">
                                <Skeleton className="h-6 w-full mb-2" />
                                <Skeleton className="h-4 w-5/6 mb-4" />
                                <div className="flex items-center justify-between border-t pt-4">
                                    <div className="flex items-center space-x-2">
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <nav className="flex items-center space-x-2">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-9 w-9 rounded-md" />
                        ))}
                    </nav>
                </div>
            </div>

            <Footer />
        </>
    );
} 