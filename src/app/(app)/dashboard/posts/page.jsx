'use client';

import { Button } from '@/components/ui/button';
import { deletePost, getPosts } from '@/services/posts';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import useSWR, { mutate } from 'swr';
import { useState } from 'react';
import PostsTable from './_components/PostsTable';
import Pagination from './_components/Pagination';

export default function PostsPage() {
    const [page, setPage] = useState(1);
    const { data, error, isLoading } = useSWR(`/api/posts?page=${page}`, getPosts);
    const posts = data?.data || [];
    const pagination = data?.meta || null;

    const handleDelete = async (slug) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            await deletePost(slug);
            mutate('/api/posts');
            toast.success('Post deleted successfully!');
        } catch (error) {
            toast.error('Something went wrong!');
            console.error('Failed to delete post:', error);
        }
    };

    if (error) {
        return <div className="py-8 text-center text-red-600">Failed to load posts</div>;
    }

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Posts</h1>
                <Button asChild>
                    <Link href="/dashboard/posts/create">
                        <Plus className="h-4 w-4" />
                        New Post
                    </Link>
                </Button>
            </div>

            {isLoading ? (
                <div className="py-8 text-center">Loading...</div>
            ) : (
                <>
                    <PostsTable posts={posts} onDelete={handleDelete} />
                    <Pagination
                        pagination={pagination}
                        page={page}
                        setPage={setPage}
                    />
                </>
            )}
        </div>
    );
}
