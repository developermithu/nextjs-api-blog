'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TrashFilter({ filter, onFilterChange }) {
    return (
        <Select value={filter} onValueChange={onFilterChange}>
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Posts</SelectItem>
                <SelectItem value="trash">Trashed</SelectItem>
                <SelectItem value="with_trashed">All Including Trashed</SelectItem>
            </SelectContent>
        </Select>
    );
}