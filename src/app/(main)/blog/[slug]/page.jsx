import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getPost } from '@/lib/api/posts';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock } from 'lucide-react';
import { formatDistance } from 'date-fns';
import SharePost from './_components/SharePost';
import { Toaster } from 'sonner';

// Page Metadata for SEO
export { generateMetadata } from './metadata';

export default async function PostPage({ params }) {
    try {
        const { slug } = await params;
        const post = await getPost(slug);

        // Format dates
        const createdDate = new Date(post.created_at);
        const updatedDate = new Date(post.updated_at);
        const timeAgo = formatDistance(createdDate, new Date(), { addSuffix: true });
        const lastUpdated = formatDistance(updatedDate, new Date(), { addSuffix: true });

        return (
            <>
                <Header />

                <article className="container mx-auto px-4 py-12">
                    <div className="mx-auto max-w-3xl">
                        <div className="mb-8 text-center">
                            <Badge className="mb-4">{post.category?.name}</Badge>
                            <h1 className="text-4xl font-bold tracking-tight mb-4 md:text-5xl">{post.title}</h1>
                            <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>
                            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center" title={createdDate.toLocaleDateString()}>
                                    <Calendar className="mr-1 h-4 w-4" />
                                    {timeAgo}
                                </div>
                                <div className="flex items-center">
                                    <Clock className="mr-1 h-4 w-4" />
                                    {post.reading_time_in_min} min read
                                </div>
                            </div>
                            {post.updated_at !== post.created_at && (
                                <div className="mt-2 text-sm text-muted-foreground">
                                    Last updated {lastUpdated}
                                </div>
                            )}
                        </div>

                        <div className="relative aspect-video mb-10 overflow-hidden rounded-lg">
                            <Image src={post.image_url || "https://placehold.co/1200x600"} alt={post.title} fill className="object-cover" />
                        </div>

                        <div
                            className="prose prose-lg dark:prose-invert max-w-none mb-10"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        <SharePost 
                            title={post.title}
                            url={typeof window !== 'undefined' ? window.location.href : `${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.slug}`}
                        />

                        <div className="border-t pt-8">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={post.author?.avatar_url} alt={post.author?.name} />
                                    <AvatarFallback>{post.author?.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{post.author?.name}</p>
                                    <p className="text-sm text-muted-foreground">{post.author?.bio}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                <Toaster position="top-center" richColors theme="light" />

                <Footer />
            </>
        );
    } catch (error) {
        notFound();
    }
}