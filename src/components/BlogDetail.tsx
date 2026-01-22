import { useBlog } from "../hooks/useBlogs";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import { ScrollArea } from "./ui/scroll-area";

interface BlogDetailProps {
    blogId: string | null;
}

export function BlogDetail({ blogId }: BlogDetailProps) {
    const { data: blog, isLoading, error } = useBlog(blogId);

    if (!blogId) {
        return (
            <div className="flex h-full items-center justify-center text-muted-foreground p-8 text-center">
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Welcome to our Blog</h2>
                    <p>Select a blog from the list to read its content.</p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="p-8 space-y-6">
                <Skeleton className="h-[300px] w-full rounded-xl" />
                <Skeleton className="h-10 w-3/4" />
                <div className="flex gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                </div>
                <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="p-8 text-center text-destructive">
                Error loading blog details.
            </div>
        );
    }

    return (
        <ScrollArea className="h-full">
            <div className="p-6 md:p-8 max-w-4xl mx-auto">
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-[300px] md:h-[400px] object-cover rounded-2xl mb-8 shadow-lg"
                />

                <div className="flex flex-wrap gap-2 mb-4">
                    {blog.category.map((cat) => (
                        <Badge key={cat} variant="default">
                            {cat}
                        </Badge>
                    ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>

                <p className="text-sm text-muted-foreground mb-8">
                    Published on {new Date(blog.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                    {blog.content.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="mb-4 text-lg leading-relaxed text-foreground/90">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </ScrollArea>
    );
}
