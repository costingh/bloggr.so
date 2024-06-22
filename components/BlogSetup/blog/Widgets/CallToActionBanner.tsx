"use client";

import { Routes } from "@/config/routes";
import {
    Text,
    Flex,
    Heading,
    Button,
    Stack,
    useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { TbArrowRight, TbCalendarDue, TbCircleCheck } from "react-icons/tb";
import { useIsLogged } from "@/lib/hooks/useIsLogged";
import { useRouter } from "next/navigation";
import { brandName, demoCalendlyLink } from "@/config/config";
import { Section } from "@/components/atoms/Section/Section";
import { useColorModeValues } from "@/lib/hooks/useColorModeValues";

export const CallToActionBanner = () => {
    const router = useRouter();
    const { user } = useIsLogged();

    const ctaColor = useColorModeValue("white", "brand.100");
    const ctaBgColor = useColorModeValue("brand.500", "brand.700");
    const bannerBackground = useColorModeValue("blackAlpha.50", "whiteAlpha.100");

    const { primaryTextColor, secondaryTextColor } = useColorModeValues();

    const [isLoadingCta, setLoadingCta] = useState(false);
    const onGetStartedClick = () => {
        setLoadingCta(true);
        if (user) {
            router.push(Routes.dashboard);
            return;
        }
        router.push(Routes.signUp);
    };

    return (
        <Section flexDir="column" mt="80px"  >
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
                    Start making money today.
                </Heading>
                <Text
                    fontSize="14px"
                    my="8px"
                    color="blackAlpha.800"
                    maxW="600px"
                    fontWeight={500}
                    color={secondaryTextColor}
                >
                    Get started with {brandName} today.
                    Start making money with your audience.
                </Text>

                <Stack
                    direction={["column", "column", "column", "row"]}
                    mt="15px" mb="15px"
                >
                    <Flex maxW="524px" flexDir="row">
                        <Button
                            size="md"
                            variant="solid"
                            colorScheme="brand"
                            color={ctaColor}
                            bgColor={ctaBgColor}
                            h="50px"
                            minH="50px"
                            w="220px"
                            px="24px"
                            borderRadius="16px"
                            onClick={() => onGetStartedClick()}
                            isLoading={isLoadingCta}
                            rightIcon={<TbArrowRight />}
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
                            Try FREE now
                        </Button>
                    </Flex>
                </Stack>

                {getCtaFeatures("single")}
            </Flex>
        </Section>
    );
};

const getCtaFeatures = (layout: "list" | "single") => {
    const { primaryTextColor, secondaryTextColor } = useColorModeValues();

    return (
        <>
            {layout == "list" ? (
                <Stack
                    direction={["column", "column", "row"]}
                    alignItems="center"
                    fontSize="13px"
                    color="brand.300"
                    spacing={["16px", "16px", "32px"]}
                >
                    <Stack direction="row" alignItems="center">
                        <Flex minW="16px" color="brand.500">
                            <TbCircleCheck size="16px" />
                        </Flex>
                        <Text color={secondaryTextColor}>
                            Personalized onboarding
                        </Text>
                    </Stack>
                    <Stack
                        direction="row"
                        alignItems="center"
                        color="brand.500"
                    >
                        <TbCircleCheck size="16px" />
                        <Text color={secondaryTextColor}>
                            Friendly pricing as you scale
                        </Text>
                    </Stack>
                </Stack>
            ) : (
                <Text fontSize="14px"
                my="8px"
                color={secondaryTextColor}
                maxW="600px"
                fontWeight={500}>
                    No spam. Unsubscribe at any time.
                </Text>
            )}
        </>
    );
};
