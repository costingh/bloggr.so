"use client";

import Image from "next/image";
import LoginButton from "./login-button";
import { Suspense } from "react";
import {
	Button,
	Flex,
	Input,
	Link,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";

import { TbArrowNarrowLeft } from "react-icons/tb";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { brandName, signInCallbackUrl } from "@/config/config";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useColorModeValues } from "@/lib/hooks/useColorModeValues";

export default function LoginPage() {
	const router = useRouter();

    const { primaryTextColor, borderColor, baseTextColor } = useColorModeValues();
	const boxBgColor = useColorModeValue("white", "transparent");

    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onEmailSignIn = async () => {
		// setSigningInWithEmail(true);
		// onSignInWithEmailAndPassword(email, password);
	};
    
    return (
        <Flex
        w="100vw"
        minH="100vh"
        alignItems="center"
        justifyContent="flex-start"
        flexDir="column"
    >
        <Button
            position="absolute"
            top="8px"
            left="8px"
            variant="ghost"
            leftIcon={<TbArrowNarrowLeft />}
            onClick={() => router.push("/")}
            _hover={{
                bgColor: "transparent",
            }}
        >
            Back
        </Button>
        <Flex
            w="100vw"
            h="100vh"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
        >
            <Flex
                flexDir="column"
                p="0 60px 40px"
                borderRadius="24px"
                boxShadow={["none", "lg"]}
                border={["0", "1px solid"]}
                borderColor={[borderColor, borderColor]}
                alignItems="flex-start"
                position="relative"
                bgColor={boxBgColor}
                w="400px"
            >
                <Flex
                    alignItems="center"
                    justifyContent="center"
                    alignSelf="center"
                    color="white"
                    fontSize="18px"
                    mb="64px"
                    mt="-60px"
                    ml="0px"
                >
                    <Flex w="32px" h="32px" as="a" href="/">
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width={32}
                            height={32}
                        />
                    </Flex>
                    <Text
                        color={primaryTextColor}
                        fontWeight="extrabold"
                        ml="8px"
                    >
                        {brandName}
                    </Text>
                </Flex>
                <Text
                    textAlign="left"
                    fontSize="18px"
                    fontWeight="semibold"
                    as="h1"
                    color={primaryTextColor}
                >
                    Sign in to your account
                </Text>

                <Button
                    my="24px"
                    h="36px"
                    variant="solid"
                    size="sm"
                    w="100%"
                    leftIcon={<FcGoogle />}
                    bgColor="transparent"
                    border="1px solid"
                    borderColor="brand.400"
                    _hover={{
                        bgColor: "transparent",
                        borderColor: "brand.300",
                    }}
                    // onClick={onGoogleSignIn}
                    // isLoading={isSigningInWithGoogle}
                    color={primaryTextColor}
                >
                    Continue with Google
                </Button>

                <Suspense
                    fallback={
                        <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
                    }
                >
                    <LoginButton />
                </Suspense>

                <Stack
                    direction="row"
                    w="100%"
                    alignItems="center"
                    spacing="16px"
                    fontSize="12px"
                    color={baseTextColor[500]}
                >
                    <Flex
                        w="100%"
                        h="1px"
                        bgColor={baseTextColor[100]}
                    ></Flex>
                    <Flex>OR</Flex>
                    <Flex
                        w="100%"
                        h="1px"
                        bgColor={baseTextColor[100]}
                    ></Flex>
                </Stack>

                <Text mt="24px" fontSize="13px" fontWeight="semibold">
                    Email
                </Text>
                <Input
                    mt="4px"
                    size="sm"
                    borderRadius="4px"
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

                <Text mt="24px" fontSize="13px" fontWeight="semibold">
                    Password
                </Text>
                <Input
                    mt="4px"
                    size="sm"
                    borderRadius="4px"
                    borderColor={borderColor}
                    onChange={(e) => setPassword(e.target.value)}
                    _focusWithin={{
                        boxShadow: "none",
                        borderColor: "brand.200",
                    }}
                    _placeholder={{
                        color: baseTextColor[500],
                    }}
                    placeholder="********"
                    type="password"
                />

                {/* {!isEmail.validate(email) && (
                    <div
                        style={{
                            color: "red",
                            fontSize: "13px",
                            marginTop: "5px",
                        }}
                    >
                        Invalid email address
                    </div>
                )} */}

                {password?.length < 6 && (
                    <div
                        style={{
                            color: "red",
                            fontSize: "13px",
                            marginTop: "5px",
                        }}
                    >
                        Password must be at least 6 characters long
                    </div>
                )}

                <Button
                    color="white"
                    size="sm"
                    h="36px"
                    bgColor="brand.400"
                    w="100%"
                    mt="24px"
                    onClick={() => onEmailSignIn()}
                    // isLoading={isSigningInWithEmail}
                    // isDisabled={
                    //     !isEmail.validate(email) || password.length < 6
                    // }
                    _hover={{
                        bgColor: "brand.300",
                    }}
                    _active={{
                        bgColor: "brand.200",
                    }}
                >
                    Log in
                </Button>

                <Text mt="16px" fontSize="13px" color={baseTextColor[600]}>
                    Don&apos;t have an account?
                    <Link href="/signup" ml="4px" color="brand.500">
                        Sign up
                    </Link>
                </Text>
            </Flex>
        </Flex>
    </Flex>
    );
}


{/* <div className="mx-5 border border-stone-200 py-10 dark:border-stone-700 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md">
<Image
    alt="Platforms Starter Kit"
    width={100}
    height={100}
    className="relative mx-auto h-12 w-auto dark:scale-110 dark:rounded-full dark:border dark:border-stone-400"
    src="/logo.png"
/>
<h1 className="font-cal mt-6 text-center text-3xl dark:text-white">
    Platforms Starter Kit
</h1>
<p className="mt-2 text-center text-sm text-stone-600 dark:text-stone-400">
    Build multi-tenant applications with custom domains. <br />
    <a
        className="font-medium text-black hover:text-stone-800 dark:text-stone-300 dark:hover:text-stone-100"
        href="https://vercel.com/blog/platforms-starter-kit"
        rel="noreferrer"
        target="_blank"
    >
        Read the announcement.
    </a>
</p>

<div className="mx-auto mt-4 w-11/12 max-w-xs sm:w-full">
    <Suspense
        fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
        }
    >
        <LoginButton />
    </Suspense>
</div>
</div> */}