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

// Add new imports similar to create page

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

    // Add new state variables
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [existingImage, setExistingImage] = useState(null);

    // Update useEffect to fetch both post and categories
    // In the useEffect where we set post data
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
                setContent(post.content);
                setStatus(post.status);
                // Make sure to convert category_id to string
                setCategoryId(post.category_id ? post.category_id.toString() : '');
                setIsFeatured(post.is_featured === 1 || post.is_featured === true);
                setExistingImage(post.image_url);
                setCategories(categoriesResponse.data);

                console.log("Post category ID:", post.category_id, typeof post.category_id);
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
                        <Label htmlFor="category">Category</Label>
                        <Select
                            value={categoryId}
                            onValueChange={(value) => setCategoryId(value)}
                        >
                            <SelectTrigger className="w-full mt-2">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Categories</SelectLabel>
                                    {categories.map(category => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError messages={errors.category_id} className="mt-1" />
                    </div>

                    <div>
                        <div>
                            <div className="flex items-center space-x-2 py-6">
                                <Checkbox
                                    id="isFeatured"
                                    checked={isFeatured}
                                    onCheckedChange={setIsFeatured}
                                />
                                <label
                                    htmlFor="isFeatured"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Featured Post
                                </label>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="coverImage">Cover Image</Label>
                            <Input
                                id="coverImage"
                                type="file"
                                className="block mt-2 w-full"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                            {(imagePreview || existingImage) && (
                                <div className="mt-2">
                                    <Image
                                        src={imagePreview || existingImage}
                                        alt="Preview"
                                        width={200}
                                        height={200}
                                        className="rounded-md object-cover"
                                        unoptimized
                                    />
                                </div>
                            )}
                            <InputError messages={errors.cover_image} className="mt-1" />
                        </div>
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