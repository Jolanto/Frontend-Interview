import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllBlogs, getBlogById, createBlog } from "../api/blogs";
import type { CreateBlogInput } from "../types/blog";

export function useBlogs() {
    return useQuery({
        queryKey: ["blogs"],
        queryFn: getAllBlogs,
    });
}

export function useBlog(id: string | null) {
    return useQuery({
        queryKey: ["blog", id],
        queryFn: () => getBlogById(id!),
        enabled: !!id,
    });
}

export function useCreateBlog() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateBlogInput) => createBlog(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });
}
