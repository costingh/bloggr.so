"use client";

import {
    Flex,
    Box,
    Text,
    Container,
    useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import ArticleContent from "@/components/BlogSetup/blog/Article/ArticleContent";
import Header from "@/components/partials/Header";
import { CtaBox } from "@/components/landing-page/CtaBox";
import { ReadingProgress } from "../ReadingProgress/ReadingProgress";
import { useColorModeValues } from "@/lib/hooks/useColorModeValues";
import { Post } from "@/types/post.types";
import RelatedPosts from "./RelatedPosts";
import PostHeaderReverse from "@/components/partials/PostHeaderReverse";
import { Section } from "@/lib/types";
import CallToActionStickyColumn from "../Widgets/CallToActionStickyColumn";
import BlogArticleRightColumn from "../Widgets/BlogArticleRightColumn";

interface Props {
    readingTime: {
        text: string;
    };
    title: string;
    description: string;
    date: string;
    ogImage: {
        url: string;
    };
    content: React.ReactNode;
    slug: string;
    categories?: string[];
    relatedPosts?: Post[];
    headings?: Section[];
    post: Post;
    brandColor?: string;
}

const Article1 = ({
    readingTime,
    title,
    description,
    date,
    ogImage,
    content,
    categories,
    relatedPosts,
    headings,
    post,
    brandColor
}: Props) => {
    const topRef = useRef(null);
    const contentRef = useRef(null);
    // const blogContentRef = useRef(null);

    const { primaryTextColor, secondaryTextColor, baseTextColor, borderColor } = useColorModeValues();

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (blogContentRef.current) {
    //             const rect = blogContentRef.current.getBoundingClientRect();
    //             console.log(rect.bottom);
    //             const isVisible = rect.top <= 80;
    //             console.log(isVisible);
    //         }
    //     };

    //     window.addEventListener("scroll", handleScroll);
    //     handleScroll();

    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //     };
    // }, []);

    const authors = [
        {
            image: "/author.jpg",
            title: "Costin Gheorghe",
        },
    ];
    return (
        <>
            <Flex ref={topRef}></Flex>
            <ReadingProgress topRef={topRef} contentRef={contentRef} brandColor={brandColor}/>
            <main ref={contentRef} style={{  }}>
                <div className="mt-[50px]"></div>
                <PostHeaderReverse
                    post={post}
                    authors={authors}
                />
                {/* <Box
                    sx={{ width: "100%" }}
                    background={baseTextColor[50]}
                    mb={14}
                >
                    <Flex
                        direction="column"
                        maxW="container.xl"
                        alignItems="center"
                        mx="auto"
                    >
                        <Flex
                            as="article"
                            flexDir="column"
                            overflow="hidden"
                            mb="0"
                            mt="48px"
                            maxW="container.md"
                            mx="auto"
                        >
                            <Flex flexDir="column" w="100%" alignItems="center">
                                <Text
                                    fontSize="45px"
                                    fontWeight={800}
                                    mb="16px"
                                    lineHeight="42px"
                                    textAlign="center"
                                >
                                    {title}
                                </Text>

                                <Text
                                    as="p"
                                    color="gray.600"
                                    mb="16px"
                                    fontSize="22px"
                                >
                                    {description}
                                </Text>

                                <Flex
                                    flexDir="row"
                                    mb="16px"
                                    color="gray.500"
                                    fontSize="16px"
                                >
                                    <p>{readingTime.text}</p>

                                    <Box mx="8px">•</Box>

                                    <p>{date}</p>

                                    {categories && <Box mx="8px">•</Box>}
                                    {categories &&
                                        categories.map((category, index) => (
                                            <Box
                                                key={index}
                                                bgGradient="linear(15deg, brand.100, brand.300)"
                                                sx={{
                                                    padding: "1px 4px",
                                                    borderRadius: "10px",
                                                    fontWeight: "bold",
                                                    fontSize: "12px",
                                                }}
                                                color="blackAlpha.900"
                                                mx="8px"
                                            >
                                                {category}
                                            </Box>
                                        ))}
                                </Flex>
                            </Flex>
                        </Flex>
                        <Box h="16px" />
                        {ogImage.url && (
                            <Flex
                                borderTopLeftRadius="12px"
                                borderTopRightRadius="12px"
                                overflow="hidden"
                                maxW="1216px"
                                mb={14}
                            >
                                <img
                                    src={ogImage.url}
                                    alt="Image for article"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        objectFit: "contain",
                                    }}
                                    className="responsive-image"
                                />
                            </Flex>
                        )}
                    </Flex>
                </Box> */}
                <div className="mt-[150px]"></div>
                <Container maxW="container.xl">
                    <Flex sx={{ width: "100%" }}>
                        <CallToActionStickyColumn headings={headings}/>
                        <Box sx={{ width: "100%", padding: '0px 40px' }}>
                            <ArticleContent content={content} />
                        </Box>
                        <BlogArticleRightColumn/>
                    </Flex>
                </Container>
            </main>
            <Box h="64px" />

            <hr />
            <Box h="32px" />
            {relatedPosts && <RelatedPosts posts={relatedPosts} authors={[]} />}
        </>
    );
};

export default Article1;
