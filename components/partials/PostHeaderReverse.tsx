"use client";

import config from "@/config/config.json";
import { humanize, slugify, markdownify } from "@/lib/utils/textConverter";
import { Author } from "@/types/author.types";
import { Post } from "@/types/post.types";
import Image from "next/image";
import Link from "next/link";
import { useColorModeValues } from "@/lib/hooks/useColorModeValues";
import {
    Flex,
    Box,
    Text,
    Container,
    useColorModeValue,
} from "@chakra-ui/react";
import { CgRead } from "react-icons/cg";
import readingTime from "reading-time";

type HighlightedPostType = {
    post: Post;
    authors: Author[];
};

function PostHeaderReverse({ post, authors }: HighlightedPostType) {
    const { primaryTextColor, baseTextColor, borderColor, secondaryTextColor } =
        useColorModeValues();
    const boxBgColor = useColorModeValue("white", "transparent");
    const ctaColor = useColorModeValue("white", "brand.100");
    const ctaBgColor = useColorModeValue("brand.500", "brand.700");
    const secondaryCtaColor = useColorModeValue("brand.700", "brand.700");
    const secondaryCtaHoverColor = useColorModeValue("brand.900", "brand.900");

    const { summary_length } = config.settings;

    return (
        <div className="container">
            <div className="mb-20 grid place-items-center lg:grid-cols-2">
                <div className="mb-5 pl-0 lg:mb-0">
                    {/* <span className="font-[500]">Resources</span> */}

                    <Text
                        className="hover:text-underline block text-[25px] font-[800] leading-[1.25em] lg:text-[40px]"
                        color={primaryTextColor}
                    >
                        {post.title}
                    </Text>
                    <Text className="text-[rgb(0, 0, 0)] my-[20px] text-[18px] font-[400] leading-[1.5rem]">
                        {post.content &&
                            post.content.slice(0, Number(summary_length))}
                        ...
                    </Text>
                    <div className="my-2 flex items-center gap-5 lg:mb-4 lg:mt-6">
                        <Text
                            className="inline text-[14px] font-[400]"
                            color={secondaryTextColor}
                        >
                            {post.date}
                        </Text>
                        <Flex className="items-center">
                            <CgRead />
                            <Text
                                className="ml-1 text-[14px] font-[400]"
                                color={secondaryTextColor}
                            >
                                {readingTime(post.content)?.text || ""}
                            </Text>
                        </Flex>
                        {post?.categories?.length &&
                            post?.categories?.map((category, i) => (
                                <>
                                    {humanize(category) && (
                                        <Link
                                            href={`/categories/${slugify(
                                                category,
                                            )}`}
                                            className="mr-2 cursor-pointer rounded-full bg-gray-200 px-[5px] py-[2px] text-xs font-normal text-gray-500 transition hover:bg-gray-300"
                                            key={`category-${i}`}
                                        >
                                            {humanize(category)}
                                        </Link>
                                    )}
                                </>
                            ))}
                    </div>
                    <div className="mt-[15px] flex items-center gap-4 lg:mt-[30px]">
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
                                        className="mr-2 h-10 w-10 rounded-[17px]"
                                    />
                                )}
                                <div className="flex flex-col items-start justify-center">
                                    <Text
                                        color={primaryTextColor}
                                        className="text-[15px] font-extrabold text-zinc-900"
                                    >
                                        By: {author.title}
                                    </Text>
                                    <Text
                                        color={secondaryTextColor}
                                        className="text-[13px] text-gray-500"
                                    >
                                        Founder / CEO
                                    </Text>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="w-full overflow-hidden">
                    {post.image ? (
                        <Image
                            src={post?.image?.url || "/placeholder.png"}
                            alt={
                                post?.image?.name || post?.title || "Not Found"
                            }
                            width={600}
                            height={400}
                            priority={true}
                            style={{ height: "100%", objectFit: "cover" }}
                        />
                    ) : (
                        <div
                            style={{
                                width: "100%",
                                maxWidth: "800px",
                                height: "445px",
                                background: "rgb(79, 70, 229)",
                            }}
                        ></div>
                    )}
                    {/* <img
                    style={{ objectFit: "cover" }}
                    src={post?.image?.url || '/placeholder.png'}
                    alt={post?.image?.name || 'Not Found'}
                /> */}
                </div>
            </div>
        </div>
    );
}

export default PostHeaderReverse;
