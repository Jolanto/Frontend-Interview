import { useBlogs } from "../hooks/useBlogs";
import { BlogCard } from "./BlogCard";
import { Skeleton } from "./ui/skeleton";

interface BlogListProps {
    selectedBlogId: string | null;
    onBlogSelect: (id: string) => void;
}

export function BlogList({ selectedBlogId, onBlogSelect }: BlogListProps) {
    const { data: blogs, isLoading, error } = useBlogs();

    if (isLoading) {
        return (
            <div className="space-y-4 p-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex flex-col space-y-3">
                        <Skeleton className="h-[125px] w-full rounded-xl" />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center text-destructive">
                <p className="font-semibold">Error loading blogs</p>
                <p className="text-sm">Please check if the server is running.</p>
            </div>
        );
    }

    if (!blogs || blogs.length === 0) {
        return (
            <div className="p-8 text-center text-muted-foreground">
                No blogs found.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 p-4 overflow-y-auto">
            {blogs.map((blog) => (
                <BlogCard
                    key={blog.id}
                    blog={blog}
                    isSelected={selectedBlogId === blog.id}
                    onClick={() => onBlogSelect(blog.id)}
                />
            ))}
        </div>
    );
}
