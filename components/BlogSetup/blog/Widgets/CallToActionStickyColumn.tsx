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
import { Section } from "@/lib/types";

type CallToActionProps = {
    headings?: Section[]
}

function CallToActionStickyColumn({headings} : CallToActionProps) {
    const blogContentRef = useRef(null);

    const { primaryTextColor, secondaryTextColor, baseTextColor, borderColor } =
        useColorModeValues();

    return (
        <Box
            ref={blogContentRef}
            sx={{
                width: "300px",
                height: "250px", // TODO - calculate this dynamically
                position: ["sticky", "-webkit-sticky"],
                top: "100px",
                overflow: "auto",
            }}
        >
            <Text
                color={primaryTextColor}
                sx={{
                    fontSize: "18px",
                    lineHeight: "20px",
                    fontWeight: 700,
                }}
            >
                Table of Contents
            </Text>

            <Box
                borderBottom="1px solid #ccc"
                borderColor={borderColor}
                style={{ margin: "30px 0px" }}
            ></Box>
            {headings?.map((heading, index) => (
                <Box key={index}>
                    <Text
                        sx={{
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "20px",
                            marginBottom: "10px",
                        }}
                        color={primaryTextColor}
                        mb={2}
                    >
                        {heading.sectionTitle}
                    </Text>
                    {heading?.subsections?.map((subsection, subIndex) => (
                        <Box key={subIndex}>
                            <Text
                                sx={{
                                    paddingLeft: "18px",
                                    fontSize: "16px",
                                    fontWeight: 400,
                                    color: baseTextColor[700],
                                    marginBottom: "8px",
                                }}
                            >
                                {subsection.sectionTitle}
                            </Text>
                        </Box>
                    ))}
                </Box>
            ))}
        </Box>
    );
}

export default CallToActionStickyColumn;
