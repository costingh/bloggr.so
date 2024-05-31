import { Image } from "./image.types";
export type Post = {
    image: Image | null;
    date: string;
    categories: string[];
    title: string;
    authors: string[];
    slug: string;
    content: string;
}