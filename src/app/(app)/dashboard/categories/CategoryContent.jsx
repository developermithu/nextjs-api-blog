'use client';

import { Button } from '@/components/ui/button';
import { Plus, Loader2, Search } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import useSWR, { mutate } from 'swr';
import { getCategories, deleteCategory } from '@/services/categories';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import CategoryDialog from './_components/CategoryDialog';
import CategoriesTable from './_components/CategoriesTable';
import { useDebounce } from '@/hooks/useDebounce';

export default function CategoryContent() {
    const [isOpen, setIsOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    const { data, error, isLoading } = useSWR(
        `/api/categories?search=${debouncedSearch}`,
        getCategories
    );

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this category?')) return;
        try {
            await deleteCategory(id);
            mutate(`/api/categories?search=${search}`);
            toast.success('Category deleted successfully!');
        } catch (error) {
            if (error.response?.status === 409) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something went wrong!');
            }
        }
    };
    const categories = data?.data || [];

    const handleEdit = (category) => {
        setEditingCategory(category);
        setIsOpen(true);
    };

    const handleClose = () => {
        setEditingCategory(null);
        setIsOpen(false);
    };

    return (
        <div className="space-y-6 p-4 md:p-6">
            <Card>
                <CardHeader className="space-y-1">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <CardTitle className="text-2xl">Categories Management</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Manage your blog categories
                            </p>
                        </div>
                        <Button onClick={() => setIsOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            New Category
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
                        <div className="flex-1 md:max-w-sm">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search categories..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-8"
                                />
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : error ? (
                        <div className="rounded-lg bg-destructive/15 p-4 text-center text-destructive">
                            Failed to load categories. Please try again.
                        </div>
                    ) : categories.length === 0 ? (
                        <div className="rounded-lg bg-muted p-8 text-center">
                            <p className="text-muted-foreground">No categories found.</p>
                        </div>
                    ) : (
                        <CategoriesTable
                            categories={categories}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                </CardContent>
            </Card>

            <CategoryDialog
                open={isOpen}
                onClose={handleClose}
                category={editingCategory}
            />
        </div>
    );
}