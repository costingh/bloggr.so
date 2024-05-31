import { Post } from "@/types/post.types";
import { Author } from "@/types/author.types";
import PostCard from "@/components/partials/PostCard";
import {
    Flex,
    Text
} from "@chakra-ui/react";

interface RelatedPostssProps {
    posts: Post[];
    authors: Author[];
    className?: string;
}



const RelatedPosts: React.FC<RelatedPostssProps> = ({ posts, authors, className = "" }) => {
    return (
        <Flex maxW='container.xl' mx='auto' direction='column' alignItems='center'>
                <Text
                fontSize="24px"
                fontWeight={800}
                mb="30px"
                mt='30px'
                lineHeight="24px"
            >
                Related Posts
            </Text>
            <div
                className={`grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
            >
                {posts.map((post, i) => (
                    <PostCard key={`key-${i}`} post={post} authors={authors} />
                ))}
            </div>
        </Flex>
    );
};

export default RelatedPosts;
    