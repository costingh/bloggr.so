"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/modal/provider";
import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "@/theme";

export function Providers({
    children,
    uiColorMode,
}: {
    children: React.ReactNode;
    uiColorMode: "light" | "dark";
}) {
    const theme = {
        ...customTheme,
        config: {
            ...customTheme.config,
            initialColorMode: uiColorMode,
        },
    };

    return (
        <SessionProvider>
            <Toaster className="dark:hidden" />
            <Toaster theme="dark" className="hidden dark:block" />
            <ModalProvider>
                <ChakraProvider theme={theme}>{children}</ChakraProvider>
            </ModalProvider>
        </SessionProvider>
    );
}
