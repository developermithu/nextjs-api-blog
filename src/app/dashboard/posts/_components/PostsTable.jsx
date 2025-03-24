import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpCircle, MoreHorizontal, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PostsTable({ posts, onDelete, onRestore, onForceDelete, showTrashed }) {
    return (
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
                    <TableRow key={post.id} className={showTrashed ? 'bg-gray-50' : ''}>
                        <TableCell className="font-medium">
                            <Link href={`/blog/${post.slug}`} className="hover:underline" target="_blank">
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
                                className={`rounded-full px-2 py-1 text-xs ${
                                    post.status === 'published' 
                                        ? 'bg-green-100 text-green-700' 
                                        : 'bg-yellow-100 text-yellow-700'
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
                                    {showTrashed ? (
                                        <>
                                            <DropdownMenuItem onClick={() => onRestore(post.id)}>
                                                <ArrowUpCircle className="h-4 w-4 mr-2" />
                                                Restore
                                            </DropdownMenuItem>
                                            <DropdownMenuItem 
                                                className="text-red-600"
                                                onClick={() => onForceDelete(post.id)}
                                            >
                                                <Trash className="h-4 w-4 mr-2" />
                                                Delete Permanently
                                            </DropdownMenuItem>
                                        </>
                                    ) : (
                                        <>
                                            <DropdownMenuItem>
                                                <Pencil className="h-4 w-4 mr-2" />
                                                <Link href={`/dashboard/posts/${post.slug}/edit`}>
                                                    Edit
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem 
                                                className="text-red-600"
                                                onClick={() => onDelete(post.slug)}
                                            >
                                                <Trash className="h-4 w-4 mr-2" />
                                                Move to Trash
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}