import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getPost } from '@/lib/api/posts';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock } from 'lucide-react';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);

    return {
        title: `${post.title} | Blog`,
        description: post.excerpt || post.content.substring(0, 160),
        openGraph: {
            title: post.title,
            description: post.excerpt || post.content.substring(0, 160),
            type: 'article',
            publishedTime: post.created_at,
            authors: [post.author?.name],
            images: post.cover_image ? [
                {
                    url: post.cover_image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                }
            ] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt || post.content.substring(0, 160),
            images: post.cover_image ? [post.cover_image] : [],
        },
    };
}

export default async function PostPage({ params }) {
    try {
        const { slug } = await params;
        const post = await getPost(slug);

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
                                <div className="flex items-center">
                                    <Calendar className="mr-1 h-4 w-4" />
                                    {post.created_at}
                                </div>
                                <div className="flex items-center">
                                    <Clock className="mr-1 h-4 w-4" />
                                    5 min reads time
                                </div>
                            </div>
                        </div>

                        <div className="relative aspect-video mb-10 overflow-hidden rounded-lg">
                            <Image src={post.cover_image || "https://placehold.co/1200x600"} alt={post.title} fill className="object-cover"  />
                        </div>

                        <div
                            className="prose prose-lg dark:prose-invert max-w-none mb-10"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        <div className="border-t pt-8">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={post.author?.avatar} alt={post.author?.name} />
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

                <Footer />
            </>
        );
    } catch (error) {
        notFound();
    }
}