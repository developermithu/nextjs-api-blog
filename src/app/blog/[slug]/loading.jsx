import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Loading() {
    return (
        <>
            <Header />

            <article className="container mx-auto px-4 py-12">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-8 text-center">
                        <Skeleton className="h-6 w-24 mx-auto mb-4" /> {/* Category badge */}
                        <Skeleton className="h-12 w-3/4 mx-auto mb-4" /> {/* Title */}
                        <Skeleton className="h-6 w-2/3 mx-auto mb-6" /> {/* Excerpt */}
                        
                        <div className="flex items-center justify-center gap-4">
                            <Skeleton className="h-5 w-32" /> {/* Created date */}
                            <Skeleton className="h-5 w-32" /> {/* Reading time */}
                        </div>
                        <Skeleton className="h-4 w-40 mx-auto mt-2" /> {/* Updated date */}
                    </div>

                    <Skeleton className="aspect-video w-full rounded-lg mb-10" /> {/* Featured image */}

                    <div className="space-y-4 mb-10"> {/* Content */}
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-5/6" />
                        <Skeleton className="h-6 w-4/5" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                    </div>

                    <div className="border-t pt-8"> {/* Author section */}
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div>
                                <Skeleton className="h-5 w-32 mb-2" />
                                <Skeleton className="h-4 w-48" />
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </>
    );
}