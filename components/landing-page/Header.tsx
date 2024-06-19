"use client";

import React, { useState } from "react";
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Flex,
    HStack,
    IconButton,
    Spacer,
    VStack,
    Text,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { Routes } from "@/config/routes";
import { brandName } from "@/config/config";
import { TbMenu2 } from "react-icons/tb";
import { useIsLogged } from "@/lib/hooks/useIsLogged";
import { useRouter } from "next/navigation";
// import { useProfile } from "@/hooks/useProfile";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useColorModeValues } from "@/lib/hooks/useColorModeValues";
import { DarkModeSwitch } from "@/components/DarkModeSwitch/DarkModeSwitch";

type HeaderProps = {};

export const Header = ({}: HeaderProps) => {
    const router = useRouter();
    const { isLoading, isLogged } = useIsLogged();
    // const { profile } = useProfile();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const { primaryTextColor, secondaryTextColor, borderColor, baseTextColor } = useColorModeValues();

    return (
        <Flex
            w="100vw"
            p="16px 24px"
			pr="30px"
            alignItems="center"
            flexDir="row"
            justifyContent="center"
            borderBottom="1px solid"
            borderColor={borderColor}
        >
            <Flex w="100%" alignItems="center">
                <Flex alignItems="center">
                    <Image
                        src="/logo2.png"
                        alt="logo"
                        width={30}
                        height={50}
                        style={{ marginRight: "10px" }}
                    />
                    <Link
                        w="auto"
                        mr="8px"
                        href={Routes.root}
                        cursor="pointer"
                        fontWeight="extrabold"
                    >
                        {brandName}
                    </Link>
                    <Text
                        fontSize="13px"
                        color={secondaryTextColor}
                        display={["none", null, "block"]}
                    >
                        — Stories, products, articles, and more.
                    </Text>
                </Flex>
                <Spacer />
                <HStack
                    fontSize="14px"
                    spacing={["16px", "16px", "16px", "16px"]}
                    fontWeight={500}
                >
                    <DarkModeSwitch />

                    {!isLogged && (
                        <Link href={Routes.login}>
                             <Button
								size="sm"
								variant="outline"
								colorScheme="brand"
							>
								Login
							</Button>
                        </Link>
                    )}
                    <Button
                        size="sm"
                        variant="solid"
                        colorScheme="brand"
                        isLoading={isLoading}
                        onClick={() => {
                            if (isLogged) {
                                router.push(Routes.dashboard);
                                return;
                            }
                            router.push(Routes.signUp);
                        }}
                    >
                        {isLogged ? "Dashboard" : "Sign up"}
                    </Button>
                    {isLogged && (
                        <Button
                            size="sm"
                            variant="outline"
                            w="100%"
                            onClick={() => {
                                signOut({
                                    redirect: true,
                                    callbackUrl: "/",
                                });
                            }}
                        >
                            Log out
                        </Button>
                    )}
                    <Flex display={["flex", "none"]}>
                        <IconButton
                            aria-label={"menu"}
                            icon={<TbMenu2 />}
                            onClick={() => setMenuOpen(true)}
                            bgColor="transparent"
                        />
                    </Flex>

                    <Drawer
                        isOpen={isMenuOpen}
                        placement="right"
                        onClose={() => setMenuOpen(false)}
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />

                            <DrawerBody mt="40px">
                                <VStack spacing="24px" w="100%">
                                    {/* {profile?.name && (
                    <Link href={Routes.profile}>{profile.name}</Link>
                  )}
                  {!profile?.name && <Link href={Routes.login}>Login</Link>} */}
                                    <Button
                                        size="md"
                                        w="100%"
                                        variant="solid"
                                        colorScheme="brand"
                                        isLoading={isLoading}
                                        onClick={() => {
                                            if (isLogged) {
                                                router.push(Routes.dashboard);
                                                return;
                                            }
                                            router.push(Routes.signUp);
                                        }}
                                    >
                                        {isLogged ? "Dashboard" : "Sign up"}
                                    </Button>
                                    <Button
                                        size="md"
                                        variant="outline"
                                        w="100%"
                                        onClick={() => {
                                            signOut({
                                                redirect: true,
                                                callbackUrl: "/",
                                            });
                                        }}
                                    >
                                        Log out
                                    </Button>
                                </VStack>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </HStack>
            </Flex>
        </Flex>
    );
};
