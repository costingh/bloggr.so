"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Box } from "@chakra-ui/react";

type ButtonProps = {
    text: string;
    link?: string;
    variant?: string;
    brandColor?: string;
};

const renderButton = ({
    brandColor,
    text,
    variant,
}: {
    brandColor?: string;
    text: string;
    variant?: string;
}): JSX.Element => {
    const [hover, setHover] = useState(false);
    const buttonStyles = {
        borderColor: brandColor,
        color: variant === "outline" ? brandColor : "#fff",
        backgroundColor: variant === "outline" ? "transparent" : brandColor,
        cursor: "pointer",
        borderRadius: "9999px",
        borderWidth: "1px",
        padding: "7px 32px",
        fontSize: "18px",
        fontWeight: 400,
        transition: "all 0.2s",
    };

    const hoverStyles = {
        backgroundColor: variant === "outline" ? brandColor : "transparent",
        color: variant === "outline" ? "slategray" : brandColor,
    };
    return (
        <Box
            style={
                hover
                    ? { ...buttonStyles, ...hoverStyles }
                    : { ...buttonStyles }
            }
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            // onClick={() =>
            //     handleCtaButtonCLick(CallToActionContent?.button?.type)
            // }
            // isLoading={isLoadingCta}
            sx={{
                svg: {
                    transition: "all .15s linear",
                    transform: "translateX(0px)",
                },
            }}
            _hover={{
                svg: {
                    transform: "translateX(4px)",
                },
            }}
        >
            {text}
        </Box>
    );
};

function Button({ text, link, variant, brandColor }: ButtonProps) {
    return link ? (
        <Link href={link} target="_blank" rel="noopener noreferrer">
            {renderButton({ brandColor, text, variant })}
        </Link>
    ) : (
        renderButton({ brandColor, text, variant })
    );
}

export default Button;
