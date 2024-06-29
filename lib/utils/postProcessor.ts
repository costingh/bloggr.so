import { Image } from "@/types/image.types";
import { NotionPost } from "@/types/notion.types";
import { Post } from "@/types/post.types";



const extractPostPublishDate = (post: NotionPost, mapping: any): string => {
    if (!post || !mapping) return "";
    return post?.properties?.[mapping?.publishedDate]?.date?.start || "";
};

const extractPostSlug = (post: NotionPost, mapping: any): string => {
    if (!post || !mapping) return "";
    return (
        post?.properties?.[mapping?.slug]?.rich_text?.[0]?.plain_text || ""
    );
};

const extractPostTitle = (post: NotionPost, mapping: any): string => {
    if (!post || !mapping) return "";
    return post?.properties?.[mapping?.title]?.title?.[0]?.plain_text || "";
};

const extractPostContent = (post: NotionPost, mapping: any): string => {
    if (!post || !mapping) return "";
    return (
        post?.properties?.[mapping?.content || "Content"]?.rich_text?.[0]
            ?.plain_text || ""
    );
};

const extractPostCategory = (post: NotionPost, mapping: any): string[] => {
    if (!post || !mapping) return [];
    return (
        (post?.properties?.[mapping?.category || "Category"]?.rich_text?.[0]
            ?.plain_text || "")?.split(',')
    );
};

const extractPostImage = (post: NotionPost, mapping: any): Image | null => {
    if (!post || !mapping) return null;
    const file = post?.properties?.[mapping?.image || "Image"]?.files?.[0];
    if (!file) return null;
    return {
        name: file?.name,
        type: file?.type,
        url: file?.file?.url,
        expiry_time: file?.file?.expiry_time,
    };
};

const processPost = (p: NotionPost, mapping: any): Post => {
    return {
        image: extractPostImage(p, mapping),
        date: extractPostPublishDate(p, mapping),
        categories: extractPostCategory(p, mapping),
        title: extractPostTitle(p, mapping),
        authors: ["Costin Gheorghe"],
        slug: extractPostSlug(p, mapping),
        content: extractPostContent(p, mapping),
    };
};

const isValidPost = (post: NotionPost, mapping: any): boolean => {
    return extractPostTitle(post, mapping) &&
        extractPostPublishDate(post, mapping) &&
        extractPostSlug(post, mapping)
        ? true
        : false;
};

const processPosts = (_posts: NotionPost[], mapping: any): Post[] => {
    const processedPosts = _posts
        .filter((p) => isValidPost(p, mapping))
        .map((p) => {
            return {
                image: extractPostImage(p, mapping),
                date: extractPostPublishDate(p, mapping),
                title: extractPostTitle(p, mapping),
                authors: ["Costin Gheorghe"],
                slug: extractPostSlug(p, mapping),
                content: extractPostContent(p, mapping),
                categories: extractPostCategory(p, mapping)
            };
        });
    return processedPosts;
};

const isFeatured = (post: NotionPost, mapping: any): boolean => {
    if (!post || !mapping) return false;
    return (
        post?.properties?.[mapping?.featured]?.checkbox || false
    );
};

const getFeaturedPost = (posts: NotionPost[], mapping: any) => {
    const p =
        (posts as NotionPost[]).filter((p) => isFeatured(p, mapping))?.[0] || null;
    return {
        image: extractPostImage(p, mapping),
        date: extractPostPublishDate(p, mapping),
        categories: extractPostCategory(p, mapping),
        title: extractPostTitle(p, mapping),
        authors: ["Costin Gheorghe"],
        slug: extractPostSlug(p, mapping),
        content: extractPostContent(p, mapping),
    };
}

export {
    extractPostPublishDate,
    extractPostSlug,
    extractPostTitle,
    extractPostContent,
    processPost,
    processPosts,
    getFeaturedPost
};
