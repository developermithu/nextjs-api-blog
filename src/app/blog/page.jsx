import { PostCard } from '@/app/blog/_components/PostCard';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { getPosts } from '@/lib/api/posts';
import Loading from './loading';

export const metadata = {
    title: 'Blog - All Articles',
    description: 'Browse all our articles and guides for modern web development.',
};

export default async function BlogPage(props) {
    const searchParams = await props.searchParams;
    try {
        const page = Number(searchParams.page) || 1;
        const postsResponse = await getPosts(page);

        return (
            <>
                <Header />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold tracking-tight">All Articles</h1>
                        <p className="text-muted-foreground mt-2">Browse all our articles and guides</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {postsResponse.data.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>

                    {postsResponse.meta.last_page > 1 && (
                        <div className="mt-8 flex justify-center">
                            <nav className="flex items-center space-x-2">
                                {Array.from({ length: postsResponse.meta.last_page }, (_, i) => i + 1).map((pageNum) => (
                                    <a
                                        key={pageNum}
                                        href={`/blog?page=${pageNum}`}
                                        className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 w-9 ${pageNum === page
                                            ? 'bg-primary text-primary-foreground shadow hover:bg-primary/90'
                                            : 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground'
                                            }`}
                                    >
                                        {pageNum}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    )}
                </div>

                <Footer />
            </>
        );
    } catch (error) {
        console.error('Error loading blog page:', error);
        return <Loading />;
    }
} 