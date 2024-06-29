"use client";

import { humanize, slugify } from "@/lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { Author } from "@/types/author.types";
import { Post } from "@/types/post.types";
import config from "@/config/config.json";
import { useParams, useRouter } from "next/navigation";
import { CgRead } from "react-icons/cg";
import readingTime from "reading-time";
import { useColorModeValues } from "@/lib/hooks/useColorModeValues";
import {
    Flex,
    Box,
    Text,
    Container,
    useColorModeValue,
} from "@chakra-ui/react";

interface PostCardProps {
    post: Post;
    authors: Author[];
}

const PostCard: React.FC<PostCardProps> = ({ post, authors }) => {
    const { summary_length } = config.settings;
    const router = useRouter();

    const { primaryTextColor, baseTextColor, borderColor, secondaryTextColor } =
        useColorModeValues();
    const boxBgColor = useColorModeValue("white", "transparent");
    const ctaColor = useColorModeValue("white", "brand.100");
    const ctaBgColor = useColorModeValue("brand.500", "brand.700");
    const secondaryCtaColor = useColorModeValue("brand.700", "brand.700");
    const secondaryCtaHoverColor = useColorModeValue("brand.900", "brand.900");

    const redirectTo = (link : string )=> router.push(link)

    return (
        <div className="rounded-xl cursor-pointer" onClick={() => redirectTo(`/${post.slug}`)}>
            <div
                style={{ height: "230px", overflow: "hidden" }}
                className="rounded-xl"
            >
                {post.image ? (
                    <Image
                        src={post?.image?.url || "/placeholder.png"}
                        alt={post?.image?.name || post?.title || "Not Found"}
                        width={800}
                        height={445}
                        priority={true}
                        style={{ height: "100%", objectFit: "cover" }}
                    />
                ) : (
                    <Box
                        style={{
                            width: "800px",
                            height: "445px",
                        }}
                        bgColor={borderColor}
                    ></Box>
                )}
            </div>

            <div className="">
                <Flex className="my-3 items-center gap-3">
                    <span className="mr-2 text-xs text-gray-500">
                        {post.date}
                    </span>

                    <Flex className="items-center">
                        <CgRead />
                        <Text className="ml-1 text-[13px] font-[400]" color={secondaryTextColor}>{readingTime(post.content)?.text || ''}</Text>
                    </Flex>

                    {post?.categories?.length && post?.categories?.map((category, i) => (
                        <>
                            {humanize(category) && <Link
                            href={`/categories/${slugify(category)}`}
                            className="mr-2 cursor-pointer rounded-full bg-gray-200 px-[5px] py-[2px] text-xs font-normal text-gray-500 transition hover:bg-gray-300"
                            key={`category-${i}`}
                        >
                            {humanize(category)}
                        </Link>}
                        </>
                    ))}
                </Flex>
                <h3 className="mb-3">
                   <Text color={primaryTextColor}
                        className="block text-[20px] font-[900]"
                    >
                        {post.title}
                        </Text>
                </h3>
                <Text className="text-[15px] text-[rgb(0, 0, 0)]" >
                    {post.content &&
                        post.content
                            .slice(0, Number(summary_length))
                            .replaceAll("###", "")}
                    ...
                </Text>
            </div>

            <div className="mt-8">
                {authors.map((author, i) => (
                    <Link
                        href={`/authors/${slugify(author.title)}`}
                        key={`author-${i}`}
                        className="flex items-center hover:text-indigo-600"
                    >
                        {author.image && (
                            <Image
                                src={author.image}
                                alt={author.title}
                                height={50}
                                width={50}
                                className="mr-2 h-10 w-10 rounded-full"
                            />
                        )}
                        <div className="flex flex-col items-start justify-center">
                            <Text color={primaryTextColor} className="text-[15px] font-bold ">
                                {author.title}
                            </Text>
                            <Text color={secondaryTextColor} className="text-[13px] ">
                                Founder / CEO
                            </Text>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PostCard;
