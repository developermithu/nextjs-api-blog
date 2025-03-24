'use client';

import { Button } from '@/components/ui/button';
import { deletePost, getPosts, restorePost, forceDeletePost } from '@/services/posts';
import { Plus, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import useSWR, { mutate } from 'swr';
import { useState } from 'react';
import PostsTable from './_components/PostsTable';
import Pagination from './_components/Pagination';
import StatusFilter from './_components/StatusFilter';
import TrashFilter from './_components/TrashFilter';
import { useAuth } from '@/hooks/auth';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';

export default function PostContent() {
    const { isAdmin } = useAuth();
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('all');
    const [status, setStatus] = useState('all');
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    const { data, error, isLoading } = useSWR(
        `/api/posts?page=${page}&filter=${filter}&status=${status}&search=${debouncedSearch}`,
        getPosts
    );
    const posts = data?.data || [];
    const pagination = data?.meta || null;

    const handleDelete = async (slug) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        try {
            await deletePost(slug);
            mutate(`/api/posts?page=${page}&filter=${filter}&status=${status}`);
            toast.success('Post deleted successfully!');
        } catch (error) {
            toast.error('Something went wrong!');
        }
    };

    const handleRestore = async (id) => {
        try {
            await restorePost(id);
            mutate(`/api/posts?page=${page}&filter=${filter}&status=${status}`);
            toast.success('Post restored successfully!');
        } catch (error) {
            toast.error('Failed to restore post');
        }
    };

    const handleForceDelete = async (id) => {
        if (!confirm('This action cannot be undone. Are you sure?')) return;
        try {
            await forceDeletePost(id);
            mutate(`/api/posts?page=${page}&filter=${filter}&status=${status}`);
            toast.success('Post permanently deleted!');
        } catch (error) {
            toast.error('Failed to delete post');
        }
    };

    if (!isAdmin) {
        redirect('/dashboard');
    }

    return (
        <div className="space-y-6 p-4 md:p-6">
            <Card>
                <CardHeader className="space-y-1">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <CardTitle className="text-2xl">Posts Management</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Create, edit, and manage your blog posts
                            </p>
                        </div>
                        <Button asChild>
                            <Link href="/dashboard/posts/create">
                                <Plus className="mr-2 h-4 w-4" />
                                New Post
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
                        <div className="flex-1 md:max-w-sm">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search posts..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-8"
                                />
                            </div>
                        </div>
                        <TrashFilter
                            filter={filter}
                            onFilterChange={setFilter}
                        />
                        <StatusFilter
                            status={status}
                            onStatusChange={setStatus}
                        />
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : error ? (
                        <div className="rounded-lg bg-destructive/15 p-4 text-center text-destructive">
                            Failed to load posts. Please try again.
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="rounded-lg bg-muted p-8 text-center">
                            <p className="text-muted-foreground">No posts found.</p>
                            {filter === 'trash' && (
                                <p className="mt-2 text-sm text-muted-foreground">
                                    The trash is empty.
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="rounded-lg border">
                                <PostsTable
                                    posts={posts}
                                    onDelete={handleDelete}
                                    onRestore={handleRestore}
                                    onForceDelete={handleForceDelete}
                                    showTrashed={filter === 'trash'}
                                />
                            </div>
                            <Pagination
                                pagination={pagination}
                                page={page}
                                setPage={setPage}
                            />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
