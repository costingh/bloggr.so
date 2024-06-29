"use client";

import { Routes } from "@/config/routes";
import {
    Text,
    Flex,
    Heading,
    Button,
    Stack,
    Input,
    useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { TbArrowRight, TbCalendarDue, TbCircleCheck } from "react-icons/tb";
import { useIsLogged } from "@/lib/hooks/useIsLogged";
import { useRouter } from "next/navigation";
import { brandName, demoCalendlyLink } from "@/config/config";
import { Section } from "@/components/atoms/Section/Section";
import { useColorModeValues } from "@/lib/hooks/useColorModeValues";

import ButtonComponent from "@/components/BlogSetup/blog/Widgets/Button";

type FeaturesType = {
    text?: string;
    list?: string[];
};

type CallToActionContentType = {
    heading: string;
    description: string;
    button: {
        type: "subscribe" | "link";
        action: string;
        text: string;
    };
    features: FeaturesType;
};

export const CallToActionBanner = ({brandColor} : {brandColor?: string}) => {
    const router = useRouter();
    const { user } = useIsLogged();

    const [email, setEmail] = useState("");

    const ctaColor = useColorModeValue("white", "brand.100");
    const ctaBgColor = useColorModeValue("brand.500", "brand.700");
    const bannerBackground = useColorModeValue(
        "blackAlpha.50",
        "whiteAlpha.100",
    );

    const { primaryTextColor, secondaryTextColor, borderColor, baseTextColor } =
        useColorModeValues();

    const [isLoadingCta, setLoadingCta] = useState(false);
    const handleCtaButtonCLick = (type: string) => {
        setLoadingCta(true);
        if(type === 'link') {
            router.push(CallToActionContent?.button?.action)
        } else {
            console.log(email + ' has just subscribed!')
        }
    };

    const CallToActionContent: CallToActionContentType = {
        heading: "Start making money today.",
        description:
            "Get started with Bloggr today. Start making money with your audience.",
        button: {
            text: "Try FREE now",
            action: "",
            type: "link",
        },
        features: {
            text: "No spam. Unsubscribe at any time.",

            // type: 'list',
            // list: ['Personalized onboarding', 'Friendly pricing as you scale']
        },
    };

    return (
        <Section flexDir="column" mt="80px">
            <Flex
                p="80px 24px"
                flexDir="column"
                w="100%"
                minW={["100%", "90%", "90%", "800px"]}
                maxW="100%"
                alignItems="center"
                textAlign="center"
                bg={bannerBackground}
                color="blackAlpha.900"
            >
                <Heading
                    fontSize={["22px", "26px", "32px", "44px"]}
                    mb="8px"
                    fontWeight="extrabold"
                    color={primaryTextColor}
                >
                    {CallToActionContent?.heading || "-"}
                </Heading>
                <Text
                    fontSize="16px"
                    my="8px"
                    maxW="600px"
                    fontWeight={500}
                    color={secondaryTextColor}
                >
                    {CallToActionContent?.description || ""}
                </Text>

                <Stack
                    direction={["column", "column", "column", "row"]}
                    mt="15px"
                    mb="15px"
                >
                    <Flex maxW="524px" flexDir="row">
                        {CallToActionContent?.button?.type !== "link" && (
                            <Input
                                size="md"
                                mr={4}
                                px="15px"
                                py="15px"
                                borderRadius="13px"
                                borderColor={borderColor}
                                onChange={(e) => setEmail(e.target.value)}
                                _focusWithin={{
                                    boxShadow: "none",
                                    borderColor: "brand.200",
                                }}
                                _placeholder={{
                                    color: baseTextColor[500],
                                }}
                                placeholder="john@doe.com"
                            />
                        )}

                        <ButtonComponent
                            brandColor={brandColor}
                            text={CallToActionContent?.button?.text || "-"} 
                        />

                       
                    </Flex>
                </Stack>

                {getCtaFeatures(CallToActionContent)}
            </Flex>
        </Section>
    );
};

const getCtaFeatures = (CallToActionContent: CallToActionContentType) => {
    const { primaryTextColor, secondaryTextColor } = useColorModeValues();

    return (
        <>
            {CallToActionContent?.features?.list ? (
                <Stack
                    direction={["column", "column", "row"]}
                    alignItems="center"
                    fontSize="13px"
                    color="brand.300"
                    spacing={["16px", "16px", "32px"]}
                >
                    {CallToActionContent?.features?.list.map((item) => (
                        <Stack direction="row" alignItems="center">
                            <Flex minW="16px" color="brand.500">
                                <TbCircleCheck size="16px" />
                            </Flex>
                            <Text color={secondaryTextColor}>{item}</Text>
                        </Stack>
                    ))}
                </Stack>
            ) : (
                <Text
                    fontSize="14px"
                    my="8px"
                    color={secondaryTextColor}
                    maxW="600px"
                    fontWeight={500}
                >
                    {CallToActionContent?.features?.text}
                </Text>
            )}
        </>
    );
};
