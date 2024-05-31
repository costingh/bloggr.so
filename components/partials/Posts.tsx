import { Post } from "@/types/post.types";
import { Author } from "@/types/author.types";
import PostCard from "@/components/partials/PostCard";

interface PostsProps {
    posts: Post[];
    authors: Author[];
    className?: string;
}

const Posts: React.FC<PostsProps> = ({ posts, authors, className = "" }) => {
    return (
        <div
            className={`grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
        >
            {posts.map((post, i) => (
                <PostCard key={`key-${i}`} post={post} authors={authors} />
            ))}
        </div>
    );
};

export default Posts;
