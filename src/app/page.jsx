import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PostCard } from '@/components/posts/PostCard';
import { FeaturedPost } from '@/components/posts/FeaturedPost';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { getFeaturedPost, getPosts } from '@/lib/api/posts';
import Loading from './loading';

export const metadata = {
    title: 'Blog - Latest Articles',
    description: 'Discover the latest insights and guides for modern web development.',
};

export default async function Home() {
    try {
        const [featuredPost, postsResponse] = await Promise.all([
            getFeaturedPost(),
            getPosts(1, 3)
        ]);

        const recentPosts = postsResponse.data;

        return (
            <>
                <Header />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

                        {featuredPost && (
                            <FeaturedPost post={featuredPost} />
                        )}
                    </section>
                    <section>
                        <h2 className="mb-8 text-2xl font-bold tracking-tight">Recent Articles</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {recentPosts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </section>
                </div>

                <Footer />
            </>
        );
    } catch (error) {
        console.error('Error loading home page:', error);
        return <Loading />;
    }
}
