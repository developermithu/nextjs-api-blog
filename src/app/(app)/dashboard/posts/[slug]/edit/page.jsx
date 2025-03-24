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
import { getCategories } from "@/services/categories";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import TipTapEditor from "@/components/TipTapEditor";

export default function EditPostPage({ params }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('draft');
    const [coverImage, setCoverImage] = useState(null);

    // Add new state variables
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [existingImage, setExistingImage] = useState(null);

    // Update useEffect to fetch both post and categories
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postResponse, categoriesResponse] = await Promise.all([
                    getPost(params.slug),
                    getCategories()
                ]);

                if (!postResponse.data) {
                    throw new Error('Post not found');
                }

                const post = postResponse.data;
                setTitle(post.title);
                setSlug(post.slug);
                setExcerpt(post.excerpt);
                setContent(post.content || '');
                setStatus(post.status);
                setCategoryId(post.category_id ? post.category_id.toString() : '');
                setIsFeatured(post.is_featured === 1 || post.is_featured === true);
                setExistingImage(post.image_url);
                setCategories(categoriesResponse.data);


            } catch (error) {
                console.error('Fetch error:', error);
                toast.error(error.message || "Failed to fetch data");
                router.push("/dashboard/posts");
            }
        };

        fetchData();
    }, [params.slug, router]);

    // Add image preview handler
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setCoverImage(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Update form submission
    const submitForm = async event => {
        event.preventDefault();
        setLoading(true);
        setErrors([]);

        try {
            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('title', title);
            formData.append('slug', slug || title.toLowerCase().replace(/ /g, '-'));
            formData.append('excerpt', excerpt);
            formData.append('content', content);
            formData.append('status', status);
            formData.append('category_id', categoryId);
            formData.append('is_featured', isFeatured ? '1' : '0'); // Fix boolean value
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
        <div className="p-6">
            <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Edit Post</h1>
                    <p className="text-muted-foreground">Update your blog post details.</p>
                </div>
                <div className="flex items-center space-x-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/dashboard/posts")}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading} form="post-form">
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </div>

            <form id="post-form" onSubmit={submitForm}>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Content - Takes 2 columns */}
                    <div className="space-y-6 lg:col-span-2">
                        <div className="rounded-lg border bg-card p-6">
                            <div className="space-y-6">
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={title}
                                        className="mt-2"
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
                                        className="mt-2"
                                        onChange={event => setSlug(event.target.value)}
                                    />
                                    <InputError messages={errors.slug} className="mt-1" />
                                </div>

                                <div>
                                    <Label htmlFor="excerpt">Excerpt</Label>
                                    <Textarea
                                        id="excerpt"
                                        value={excerpt}
                                        className="mt-2"
                                        rows={3}
                                        onChange={event => setExcerpt(event.target.value)}
                                        required
                                    />
                                    <InputError messages={errors.excerpt} className="mt-1" />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border bg-card p-6">
                            <Label htmlFor="content">Content</Label>
                            <div className="mt-2">
                                <TipTapEditor content={content} onChange={setContent} />
                            </div>
                            <InputError messages={errors.content} className="mt-1" />
                        </div>
                    </div>

                    {/* Sidebar - Takes 1 column */}
                    <div className="space-y-6">
                        <div className="rounded-lg border bg-card p-6">
                            <h3 className="mb-4 text-lg font-medium">Publishing Options</h3>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={status} onValueChange={setStatus}>
                                        <SelectTrigger className="mt-2 w-full">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError messages={errors.status} className="mt-1" />
                                </div>

                                <div>
                                    <Label htmlFor="category">Category</Label>
                                    <Select value={categoryId} onValueChange={setCategoryId}>
                                        <SelectTrigger className="mt-2 w-full">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Categories</SelectLabel>
                                                {categories?.map(category => (
                                                    <SelectItem key={category.id} value={category.id.toString()}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <InputError messages={errors.category_id} className="mt-1" />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="isFeatured"
                                        checked={isFeatured}
                                        onCheckedChange={setIsFeatured}
                                    />
                                    <Label htmlFor="isFeatured">Featured Post</Label>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border bg-card p-6">
                            <h3 className="mb-4 text-lg font-medium">Cover Image</h3>
                            <div className="space-y-4">
                                <Input
                                    id="coverImage"
                                    type="file"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                                {(imagePreview || existingImage) && (
                                    <div className="mt-2 overflow-hidden rounded-md border">
                                        <Image
                                            src={imagePreview || existingImage}
                                            alt="Preview"
                                            width={400}
                                            height={200}
                                            className="h-[200px] w-full object-cover"
                                            unoptimized
                                        />
                                    </div>
                                )}
                                <InputError messages={errors.cover_image} className="mt-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}