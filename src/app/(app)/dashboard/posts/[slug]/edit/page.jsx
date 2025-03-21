"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getPost, updatePost } from "@/services/posts";
import InputError from "@/components/InputError";
import { toast } from "sonner";

export default function EditPost({ params }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('draft');
    const [coverImage, setCoverImage] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await getPost(params.slug);
                const post = response.data;
                
                setTitle(post.title);
                setSlug(post.slug);
                setExcerpt(post.excerpt);
                setContent(post.content);
                setStatus(post.status);
            } catch (error) {
                toast.error("Failed to fetch post");
                router.push("/dashboard/posts");
            }
        };

        fetchPost();
    }, [params.slug, router]);

    const submitForm = async event => {
        event.preventDefault();
        setLoading(true);
        setErrors([]);

        try {
            const formData = new FormData();
            formData.append('_method', 'PUT'); // This needs to be first
            formData.append('title', title);
            formData.append('slug', slug);
            formData.append('excerpt', excerpt);
            formData.append('content', content);
            formData.append('status', status);
            if (coverImage) {
                formData.append('cover_image', coverImage);
            }

            await updatePost(params.slug, formData);
            toast.success("Post updated successfully");
            router.push("/dashboard/posts");
            router.refresh();
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                toast.error("Failed to update post");
                console.error('Update error:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Edit Post</h1>
                <p className="text-gray-600 mt-1">Update your blog post details.</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <form onSubmit={submitForm} className="space-y-6">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            value={title}
                            className="block mt-2 w-full"
                            onChange={event => setTitle(event.target.value)}
                            required
                        />
                        <InputError messages={errors.title} className="mt-1" />
                    </div>

                    <div>
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            type="text"
                            value={slug}
                            className="block mt-2 w-full"
                            onChange={event => setSlug(event.target.value)}
                        />
                        <InputError messages={errors.slug} className="mt-1" />
                    </div>

                    <div>
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea
                            id="excerpt"
                            value={excerpt}
                            className="block mt-2 w-full"
                            rows={3}
                            onChange={event => setExcerpt(event.target.value)}
                            required
                        />
                        <InputError messages={errors.excerpt} className="mt-1" />
                    </div>

                    <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            value={content}
                            className="block mt-2 w-full"
                            rows={10}
                            onChange={event => setContent(event.target.value)}
                            required
                        />
                        <InputError messages={errors.content} className="mt-1" />
                    </div>

                    <div>
                        <Label htmlFor="status">Status</Label>
                        <select 
                            id="status"
                            value={status}
                            className="block mt-2 w-full rounded-md border border-gray-300 p-2"
                            onChange={event => setStatus(event.target.value)}
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                        <InputError messages={errors.status} className="mt-1" />
                    </div>

                    <div>
                        <Label htmlFor="coverImage">Cover Image</Label>
                        <Input
                            id="coverImage"
                            type="file"
                            className="block mt-2 w-full"
                            onChange={event => setCoverImage(event.target.files[0])}
                            accept="image/*"
                        />
                        <InputError messages={errors.cover_image} className="mt-1" />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/dashboard/posts")}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Update Post"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}