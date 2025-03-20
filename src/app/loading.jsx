import { Skeleton } from '@/components/ui/skeleton';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export default function Loading() {
    return (
        <>
            <Header />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <section className="mb-16">
                    <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
                        <div>
                            <Skeleton className="h-10 w-64 mb-2" />
                            <Skeleton className="h-5 w-96" />
                        </div>
                        <Skeleton className="h-10 w-32 mt-4 md:mt-0" />
                    </div>

                    <div className="bg-card relative overflow-hidden rounded-lg border">
                        <div className="flex flex-col md:flex-row">
                            <Skeleton className="h-60 w-full md:h-auto md:w-1/2" />
                            <div className="flex flex-col justify-between p-6 md:w-1/2">
                                <div className="space-y-4">
                                    <Skeleton className="h-8 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                </div>
                                <div className="mt-6 flex flex-col space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <div>
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-3 w-24" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-10 w-32" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <Skeleton className="h-8 w-48 mb-8" />
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[...Array(3)].map((_, i) => (
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
                </section>
            </div>

            <Footer />
        </>
    );
} 