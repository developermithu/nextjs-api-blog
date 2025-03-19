import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { BlogPostCard } from '@/components/posts/BlogPostCard';
import { FeaturedPost } from '@/components/posts/FeaturedPost';
import { Button } from '@/components/ui/button';

export default function Home() {
    // In a real app, this would come from a database or CMS
    const featuredPost = {
        id: '1',
        title: 'Getting Started with Next.js 15',
        excerpt: 'Learn about the new features in Next.js 15 and how to use them in your projects.',
        date: 'March 15, 2025',
        author: {
            name: 'Jane Doe',
            avatar: 'https://placehold.co/40x40',
        },
        coverImage: 'https://placehold.co/1200x600',
        category: 'Development',
    };

    const recentPosts = [
        {
            id: '2',
            title: 'Mastering Tailwind CSS',
            excerpt: 'Discover advanced techniques for building beautiful interfaces with Tailwind CSS.',
            date: 'March 10, 2025',
            author: {
                name: 'John Smith',
                avatar: 'https://placehold.co/40x40',
            },
            coverImage: 'https://placehold.co/600x400',
            category: 'Design',
        },
        {
            id: '3',
            title: 'Building Accessible Components',
            excerpt: 'Learn how to create components that everyone can use, regardless of ability.',
            date: 'March 5, 2025',
            author: {
                name: 'Alex Johnson',
                avatar: 'https://placehold.co/40x40',
            },
            coverImage: 'https://placehold.co/600x400',
            category: 'Accessibility',
        },
        {
            id: '4',
            title: 'Server Components in Next.js',
            excerpt: 'Understanding the power of React Server Components in Next.js applications.',
            date: 'February 28, 2025',
            author: {
                name: 'Sam Wilson',
                avatar: 'https://placehold.co/40x40',
            },
            coverImage: 'https://placehold.co/600x400',
            category: 'Development',
        },
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <section className="mb-16">
                <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">Latest Articles</h1>
                        <p className="text-muted-foreground mt-2">Insights and guides for modern web development</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <Button asChild>
                            <Link href="/blog">
                                View all posts
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>

                <FeaturedPost post={featuredPost} />
            </section>
            <section>
                <h2 className="mb-8 text-2xl font-bold tracking-tight">Recent Articles</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {recentPosts.map((post) => (
                        <BlogPostCard key={post.id} post={post} />
                    ))}
                </div>
            </section>
        </div>
    );
}
