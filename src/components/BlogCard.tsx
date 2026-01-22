import type { Blog } from "../types/blog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";

interface BlogCardProps {
    blog: Blog;
    isSelected: boolean;
    onClick: () => void;
}

export function BlogCard({ blog, isSelected, onClick }: BlogCardProps) {
    return (
        <Card
            className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                isSelected ? "border-primary ring-1 ring-primary" : "hover:border-primary/50"
            )}
            onClick={onClick}
        >
            <CardHeader className="p-4">
                <div className="flex flex-wrap gap-2 mb-2">
                    {blog.category.map((cat) => (
                        <Badge key={cat} variant="secondary" className="text-[10px]">
                            {cat}
                        </Badge>
                    ))}
                </div>
                <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
                <CardDescription className="text-xs">
                    {new Date(blog.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-3">
                    {blog.description}
                </p>
            </CardContent>
        </Card>
    );
}
