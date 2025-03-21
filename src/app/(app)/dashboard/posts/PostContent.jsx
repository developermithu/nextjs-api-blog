'use client';

import { Button } from '@/components/ui/button';
import { deletePost, getPosts, restorePost, forceDeletePost } from '@/services/posts';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';
import { toast } from 'sonner';
import useSWR, { mutate } from 'swr';
import { useState } from 'react';
import PostsTable from './_components/PostsTable';
import Pagination from './_components/Pagination';
import StatusFilter from './_components/StatusFilter';
import TrashFilter from './_components/TrashFilter';
import { useAuth } from '@/hooks/auth';
import { redirect } from 'next/navigation';

export default function PostContent() {
    const { isAdmin } = useAuth();
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('all');
    const [status, setStatus] = useState('');
    const { data, error, isLoading } = useSWR(
        `/api/posts?page=${page}&filter=${filter}&status=${status}`,
        getPosts
    );
    const posts = data?.data || [];
    const pagination = data?.meta || null;

    const handleDelete = async (slug) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        try {
            await deletePost(slug);
            mutate(`/api/posts?page=${page}&filter=${filter}`);
            toast.success('Post deleted successfully!');
        } catch (error) {
            toast.error('Something went wrong!');
        }
    };

    const handleRestore = async (id) => {
        try {
            await restorePost(id);
            mutate(`/api/posts?page=${page}&filter=${filter}`);
            toast.success('Post restored successfully!');
        } catch (error) {
            toast.error('Failed to restore post');
        }
    };

    const handleForceDelete = async (id) => {
        if (!confirm('This action cannot be undone. Are you sure?')) return;
        try {
            await forceDeletePost(id);
            mutate(`/api/posts?page=${page}&filter=${filter}`);
            toast.success('Post permanently deleted!');
        } catch (error) {
            toast.error('Failed to delete post');
        }
    };

    if (!isAdmin) {
        redirect('/dashboard');
    }

    return (
        <>
            <Head>
                <title>Posts Management - Blog Admin</title>
                <meta name="description" content="Manage your blog posts - create, edit, delete, and restore posts." />
            </Head>

            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold">Posts</h1>
                        <TrashFilter
                            filter={filter}
                            onFilterChange={setFilter}
                        />

                        <StatusFilter
                            status={status}
                            onStatusChange={setStatus}
                        />
                    </div>

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
                        <PostsTable
                            posts={posts}
                            onDelete={handleDelete}
                            onRestore={handleRestore}
                            onForceDelete={handleForceDelete}
                            showTrashed={filter === 'trash'}
                        />
                        <Pagination
                            pagination={pagination}
                            page={page}
                            setPage={setPage}
                        />
                    </>
                )}
            </div>
        </>
    );
}
