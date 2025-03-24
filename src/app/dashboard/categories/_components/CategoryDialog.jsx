'use client';

import InputError from '@/components/InputError';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createCategory, updateCategory } from '@/services/categories';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { mutate } from 'swr';

export default function CategoryDialog({ open, onClose, category = null }) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (category) {
            setName(category.name || '');
            setSlug(category.slug || '');
        } else {
            setName('');
            setSlug('');
        }
    }, [category]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            if (category) {
                await updateCategory(category.id, { name, slug });
                toast.success('Category updated successfully!');
            } else {
                await createCategory({ name, slug });
                toast.success('Category created successfully!');
            }
            mutate('/api/categories');
            handleClose();
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                toast.error('Something went wrong!');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setName('');
        setSlug('');
        setErrors({});
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{category ? 'Edit Category' : 'Create Category'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-3" />
                        <InputError messages={errors.name} className="mt-1" />
                    </div>

                    <div>
                        <Label htmlFor="slug">Slug (optional)</Label>
                        <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-3" />
                        <InputError messages={errors.slug} className="mt-1" />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>

                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : category ? 'Save Changes' : 'Submit'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
