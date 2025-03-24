import { Button } from "@/components/ui/button";

export default function Pagination({ pagination, page, setPage }) {
    if (!pagination) return null;

    return (
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
    );
}