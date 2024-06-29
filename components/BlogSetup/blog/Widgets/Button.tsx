import Link from "next/link";
import React from "react";
import {
    Text,
    Flex,
    Heading,
    Button as ChakraButton,
    Stack,
    Input,
    useColorModeValue,
} from "@chakra-ui/react";
import { TbArrowRight, TbCalendarDue, TbCircleCheck } from "react-icons/tb";

type ButtonProps = {
    text: string;
    link?: string;
    variant?: string;
    brandColor?: string;
};

const renderButton = ({ brandColor, text, variant }: { brandColor?: string; text: string; variant?: string }): JSX.Element => {
    return (
        <ChakraButton
            colorScheme={brandColor}
            className={`${
                variant === "outline"
                    ? `bg-transparent text-[${brandColor}] hover:bg-[${brandColor}] hover:text-slate-200`
                    : `bg-[${brandColor}] text-slate-200 hover:bg-transparent hover:text-[${brandColor}]`
            } cursor-pointer !rounded-full border border-[${brandColor}] px-8 py-[7px] text-[18px] font-[400] transition`}
            rightIcon={<TbArrowRight />}
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
        </ChakraButton>
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
