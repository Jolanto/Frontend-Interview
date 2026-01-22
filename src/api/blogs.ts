import type { Blog, CreateBlogInput } from "../types/blog";

const BASE_URL = "http://localhost:3001";

export async function getAllBlogs(): Promise<Blog[]> {
    const response = await fetch(`${BASE_URL}/blogs`);
    if (!response.ok) {
        throw new Error("Failed to fetch blogs");
    }
    return response.json();
}

export async function getBlogById(id: string): Promise<Blog> {
    const response = await fetch(`${BASE_URL}/blogs/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch blog with id ${id}`);
    }
    return response.json();
}

export async function createBlog(data: CreateBlogInput): Promise<Blog> {
    const response = await fetch(`${BASE_URL}/blogs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error("Failed to create blog");
    }
    return response.json();
}
