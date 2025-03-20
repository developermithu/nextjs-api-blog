import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Loading() {
    return (
        <>
            <Header />

            <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="mb-8">
                    <Skeleton className="h-12 w-3/4 mb-4" />
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div>
                                <Skeleton className="h-4 w-32 mb-1" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </header>

                <Skeleton className="aspect-video w-full rounded-lg mb-8" />

                <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/5" />
                </div>
            </article>

            <Footer />
        </>
    );
}