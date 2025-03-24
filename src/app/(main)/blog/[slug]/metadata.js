import { getPost } from '@/lib/api/posts';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);

    const description = post.excerpt || post.content.substring(0, 160);
    const ogImage = post.image_url ? [{
        url: post.image_url,
        width: 1200,
        height: 630,
        alt: post.title,
    }] : [];

    return {
        title: `${post.title} - Blog`,
        description,
        openGraph: {
            title: post.title,
            description,
            type: 'article',
            publishedTime: post.created_at,
            authors: [post.author?.name],
            images: ogImage,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description,
            images: post.image_url ? [post.image_url] : [],
        },
    };
}