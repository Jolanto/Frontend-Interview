import { useState } from "react";
import { useCreateBlog } from "../hooks/useBlogs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Loader2 } from "lucide-react";

interface CreateBlogFormProps {
    onSuccess: () => void;
}

const CATEGORIES = ["FINANCE", "TECH", "CAREER", "EDUCATION", "REGULATIONS", "LIFESTYLE"];

export function CreateBlogForm({ onSuccess }: CreateBlogFormProps) {
    const { mutate: createBlog, isPending } = useCreateBlog();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        coverImage: "",
        categories: [] as string[],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.categories.length === 0) {
            alert("Please select at least one category");
            return;
        }

        createBlog({
            title: formData.title,
            description: formData.description,
            content: formData.content,
            coverImage: formData.coverImage || "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
            category: formData.categories,
            date: new Date().toISOString(),
        }, {
            onSuccess: () => {
                onSuccess();
            }
        });
    };

    const toggleCategory = (cat: string) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.includes(cat)
                ? prev.categories.filter(c => c !== cat)
                : [...prev.categories, cat]
        }));
    };

    return (
        <DialogContent className="sm:max-w-[600px]">
            <form onSubmit={handleSubmit}>
                <DialogHeader>
                    <DialogTitle>Create New Blog</DialogTitle>
                    <DialogDescription>
                        Share your insights with the community. Fill in the details below.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="The Future of..."
                            required
                            value={formData.title}
                            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Categories</Label>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map(cat => (
                                <Button
                                    key={cat}
                                    type="button"
                                    variant={formData.categories.includes(cat) ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => toggleCategory(cat)}
                                    className="rounded-full px-4"
                                >
                                    {cat}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Short Description</Label>
                        <Input
                            id="description"
                            placeholder="Brief summary of your blog post..."
                            required
                            value={formData.description}
                            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="coverImage">Cover Image URL</Label>
                        <Input
                            id="coverImage"
                            placeholder="https://images.pexels.com/..."
                            value={formData.coverImage}
                            onChange={e => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="content">Full Content</Label>
                        <Textarea
                            id="content"
                            placeholder="Write your blog post here..."
                            className="min-h-[200px]"
                            required
                            value={formData.content}
                            onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button type="submit" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isPending ? "Creating..." : "Create Blog"}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
