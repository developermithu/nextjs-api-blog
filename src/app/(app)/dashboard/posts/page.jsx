'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { deletePost, getPosts } from '@/services/posts';
import { MoreHorizontal, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import useSWR, { mutate } from 'swr';
import { useState } from 'react';

// Update the SWR hook to handle pagination
export default function PostsPage() {
    const [page, setPage] = useState(1);
    const { data, error, isLoading } = useSWR(`/api/posts?page=${page}`, getPosts);
    const posts = data?.data || [];
    const pagination = data?.meta || null; // Add fallback value

    // Handle delete post
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
                        <Plus className="mr-2 h-4 w-4" />
                        New Post
                    </Link>
                </Button>
            </div>

            {isLoading ? (
                <div className="py-8 text-center">Loading...</div>
            ) : (
                <>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">Title</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Published At</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell className="font-medium">
                                        <Link href={`/dashboard/posts/${post.id}`} className="hover:underline">
                                            {post.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {post.image_url ? (
                                            <Image
                                                src={post.image_url}
                                                alt={post.title}
                                                width={45}
                                                height={40}
                                                className="rounded-md object-cover"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="w-14 h-14 bg-gray-200 rounded-md flex items-center justify-center">
                                                <span className="text-gray-500 text-xs">No img</span>
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}
                                        >
                                            {post.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>{post.category?.name}</TableCell>
                                    <TableCell>{post.author?.name}</TableCell>
                                    <TableCell>{post.created_at}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/dashboard/posts/${post.slug}/edit`}>Edit</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(post.slug)}>
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Add pagination controls */}
                    {pagination && (
                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                                Showing {pagination.from} to {pagination.to} of {pagination.total} results
                            </div>
                            <div className="flex space-x-2">
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    disabled={page === 1}
                                    onClick={() => setPage(page - 1)}
                                >
                                    Previous
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    disabled={page >= pagination.last_page}
                                    onClick={() => setPage(page + 1)}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
