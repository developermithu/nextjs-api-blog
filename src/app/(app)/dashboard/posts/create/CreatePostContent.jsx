"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createPost } from "@/services/posts";
import InputError from "@/components/InputError";

// Add new imports
import { useEffect } from "react";
import { getCategories } from "@/services/categories";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import TipTapEditor from "@/components/TipTapEditor";

import { 
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue 
} from "@/components/ui/select";

export default function CreatePostContent() {
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

    // Add useEffect to fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    // Update the form data in submitForm
    const submitForm = async event => {
        event.preventDefault();
        setLoading(true);
        setErrors([]); // Reset errors

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('slug', slug || title.toLowerCase().replace(/ /g, '-'));
            formData.append('excerpt', excerpt);
            formData.append('content', content);
            formData.append('status', status);
            formData.append('category_id', categoryId);
            formData.append('is_featured', isFeatured ? '1' : '0'); 
            if (coverImage) {
                formData.append('cover_image', coverImage);
            }

            await createPost(formData);
            router.push("/dashboard/posts");
            router.refresh();
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error creating post:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    // Add image preview handler
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setCoverImage(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Create New Post</h1>
                    <p className="text-muted-foreground">Fill in the details to create a new blog post.</p>
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
                        {loading ? "Submitting..." : "Create Post"}
                    </Button>
                </div>
            </div>

            <form id="post-form" onSubmit={submitForm}>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Form */}
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

                    {/* Right Form */}
                    <aside className="space-y-6">
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
                                {imagePreview && (
                                    <div className="mt-2 overflow-hidden rounded-md border">
                                        <Image
                                            src={imagePreview}
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
                    </aside>
                </div>
            </form>
        </div>
    );
}