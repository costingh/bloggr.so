"use client";

import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type ReadingProgressProps = {
    topRef: React.RefObject<HTMLDivElement>;
    contentRef: React.RefObject<HTMLDivElement>;
    brandColor?: string;
};

export const ReadingProgress = ({
    topRef,
    contentRef,
    brandColor
}: ReadingProgressProps) => {
    const [width, setWidth] = useState(0);

    const scrollHeight = () => {
        const scrollTop = window.scrollY;

        const topRefHeight = topRef?.current?.scrollHeight || 0;
        const scrollHeight = contentRef?.current?.scrollHeight || 0;

        const percent = (scrollTop / (scrollHeight - topRefHeight)) * 100;

        setWidth(percent);
    };

    useEffect(() => {
        window.addEventListener("scroll", scrollHeight);
        return () => window.removeEventListener("scroll", scrollHeight);
    });

    return (
        <Flex w="100vw" position="fixed" top="80px" left="0" sx={{zIndex: 100}}>
            <Flex w={`${width}%`} h="3px" bg={brandColor || 'brand.500'} />
        </Flex>
    );
};
