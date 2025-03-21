'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TrashFilter({ filter, onFilterChange }) {
    return (
        <Select defaultValue="all" value={filter} onValueChange={onFilterChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter posts" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Posts</SelectItem>
                <SelectItem value="trash">Trash</SelectItem>
            </SelectContent>
        </Select>
    );
}