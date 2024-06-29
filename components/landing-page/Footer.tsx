"use client";

import {
    Flex,
    Spacer,
    Stack,
    Text,
    Tooltip,
    VStack,
    HStack,
} from "@chakra-ui/react";
import { TbBrandDiscord, TbBrandX, TbBrandYoutube } from "react-icons/tb";
import { Section } from "../atoms/Section/Section";
import { Link } from "@chakra-ui/next-js";
import {
    discordLink,
    twitterLink,
    youTubeLink,
} from "@/config/config";
import Image from "next/image";
import { useColorModeValues } from "@/lib/hooks/useColorModeValues";
import { Routes } from "@/config/routes";
import { FooterConfig } from "@/lib/types";
import Logo from "../Logo";

export const Footer = ({logo, footerConfig} : {logo?: string | undefined, footerConfig: FooterConfig}) => {
    const { secondaryTextColor, borderColor, primaryTextColor } = useColorModeValues();

    return (
        <Section flexDir="column" mt="80px">
            <Flex
                sx={{ width: "100%" }}
                maxW="container.xl"
                flexDir="column"
                fontSize="12px"
                color={secondaryTextColor}
            >
                <Flex
                    borderTop="1px solid gray"
                    borderColor={borderColor}
                    mt="32px"
                    mb="80px"
                />

                <Flex
                    mb="40px"
                    alignItems="flex-start"
                    flexDir={["column", "column", "row"]}
                >
                    <Stack alignItems="flex-start" mr="32px">
                        <Stack direction="row" alignItems="center">
                            <Flex>
                                <Logo
                                    src={logo}
                                    // redirectUrl={
                                    //     logo?.redirectUrl
                                    // }
                                />
                            </Flex>
                            {footerConfig?.brandName && <Text fontWeight={700} fontSize="18px" color={primaryTextColor}>
                                {footerConfig?.brandName}
                            </Text>}
                        </Stack>
                        {footerConfig?.slogan && (
                            <Text fontWeight={500} fontSize="15px">
                                {footerConfig?.slogan}
                            </Text>
                        )}
                    </Stack>
                    <Spacer />
                    <Stack
                        direction={["column", "column", "row"]}
                        spacing="24px"
                        alignItems="flex-start"
                        mt={["16px", "16px", "0"]}
                    >
                        {footerConfig?.columns.map((col) => (
                            <VStack
                                key={col.columnTitle}
                                mr="8px"
                                alignItems="flex-start"
                            >
                                <Text
                                    fontWeight="bold"
                                    textTransform="uppercase"
                                    fontSize="15px"
                                >
                                    {col.columnTitle}
                                </Text>
                                {col.links?.map((link) => (
                                    <Link href={link.url} mr="8px" fontSize="15px">
                                        {link.name}
                                    </Link>
                                ))}

                                {col.socials && (
                                    <HStack>
                                        {col.socials?.map((soc) => (
                                            <Tooltip
                                                label={soc.tooltip}
                                                placement="top"
                                            >
                                                <Link
                                                    href={soc.url}
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    {soc.platform.toLowerCase() ==
                                                        "discord" && (
                                                        <TbBrandDiscord size="20px" />
                                                    )}
                                                    {soc.platform.toLowerCase() ==
                                                        "x" && (
                                                        <TbBrandX size="20px" />
                                                    )}
                                                    {soc.platform.toLowerCase() ==
                                                        "youtube" && (
                                                        <TbBrandYoutube size="20px" />
                                                    )}
                                                </Link>
                                            </Tooltip>
                                        ))}
                                    </HStack>
                                )}
                            </VStack>
                        ))}
                    </Stack>
                </Flex>

                <Text fontSize="14px" color={secondaryTextColor} mb="40px">
                    <br /> {footerConfig?.copyright}
                </Text>
            </Flex>
        </Section>
    );
};
