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

interface Section {
    sectionTitle: string;
    subsections?: Section[];
}

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
}: Props) => {
    const topRef = useRef(null);
    const contentRef = useRef(null);
    const blogContentRef = useRef(null);

    const { primaryTextColor, baseTextColor } = useColorModeValues();

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

    return (
        <>
            <Flex ref={topRef}></Flex>
            <ReadingProgress topRef={topRef} contentRef={contentRef}/>
            <main ref={contentRef} style={{  }}>
                <Box
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
                </Box>
                <Container maxW="container.xl">
                    <Flex sx={{ width: "100%" }}>
                        <Box
                            ref={blogContentRef}
                            sx={{
                                width: "300px",
                                height: '250px', // TODO - calculate this dynamically
                                position: ["sticky", '-webkit-sticky'],
                                top: '100px',
                                overflow: 'auto',
                            }}
                        >
                            <Text
                                color={baseTextColor[600]}
                                sx={{
                                    fontSize: "16px",
                                    lineHeight: "20px",
                                    fontWeight: 700,
                                    mb: "15px",
                                }}
                            >
                                TABLE OF CONTENTS
                            </Text>
                            {headings?.map((heading, index) => (
                                <Box key={index}>
                                    <Text
                                        sx={{
                                            color: baseTextColor[500],
                                            fontSize: "16px",
                                            fontWeight: 600,
                                            lineHeight: "20px",
                                        }}
                                        mb={2}
                                    >
                                        {heading.sectionTitle}
                                    </Text>
                                    {heading?.subsections?.map(
                                        (subsection, subIndex) => (
                                            <Box key={subIndex}>
                                                <Text
                                                    sx={{
                                                        paddingLeft: "25px",
                                                        fontSize: "16px",
                                                        fontWeight: 500,
                                                        color: baseTextColor[500],
                                                    }}
                                                >
                                                    {subsection.sectionTitle}
                                                </Text>
                                            </Box>
                                        )
                                    )}
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{ width: "100%", paddingLeft: '40px' }}>
                            <ArticleContent content={content} />
                        </Box>
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
