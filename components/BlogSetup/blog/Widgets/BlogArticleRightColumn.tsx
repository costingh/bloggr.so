"use client";

import {
    Flex,
    Box,
    Text,
    Container,
    useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useColorModeValues } from "@/lib/hooks/useColorModeValues";
import Link from "next/link";

function BlogArticleRightColumn() {
    const { primaryTextColor, secondaryTextColor, baseTextColor, borderColor } =
        useColorModeValues();

    return (
        <Box
            sx={{
                width: "300px",
                height: "250px", // TODO - calculate this dynamically
                position: ["sticky", "-webkit-sticky"],
                top: "100px",
                overflow: "auto",
                padding: '15px 10px',
                borderRadius: '10px'
            }}
            bgColor={borderColor}
        >
            <Text
                color={primaryTextColor}
                sx={{
                    fontSize: "17px",
                    lineHeight: "20px",
                    fontWeight: 700,
                }}
                mb='3'
            >
                Try our brand for 14 days
            </Text>
            <Text
                color={secondaryTextColor}
                sx={{
                    fontSize: "15px",
                    lineHeight: "17px",
                    fontWeight: 300,
                }}
                mb='3'
            >
                Get in-depth competitive insights, analytics, and social
                listening data.
            </Text>

            <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className={'w-full bg-gray-900 text-zinc-200 hover:bg-transparent cursor-pointer rounded-lg border  px-4 py-1 transition'}
            >
                Start Free Now
            </Link>
        </Box>
    );
}

export default BlogArticleRightColumn;
