import React from "react";

import {
    Button,
    Center,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Flex,
    FormLabel,
    IconButton,
    Input,
    Spinner,
    Stack,
    Text,
    useColorModeValue,
    useDisclosure,
    FormControl,
    Select,
    Divider,
    Grid,
    Box,
} from "@chakra-ui/react";
import Form from "@/components/form";
import { updateSite } from "@/lib/actions";
import AnalyticsMockup from "@/components/analytics";

import SiteSettingsNav from "@/app/app/(dashboard)/site/[id]/settings/nav";

type Props = {
    blogData?: any;
};

function BlogAnalytics({ blogData }: Props) {
    return (
        <div style={{ padding: "40px 80px", width: "100%" }}>
            <Flex
                flexDir="row"
                alignItems="center"
                justifyContent="space-between"
                w="100%"
            >
                <h2 style={{ fontSize: "16px" }}>
                    Configure blog - {blogData?.siteData?.name}
                </h2>
                <a
                    href={
                        process.env.NEXT_PUBLIC_VERCEL_ENV
                            ? `https://${blogData?.url}`
                            : `http://${blogData?.siteData?.subdomain}.localhost:3000`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="truncate rounded-md bg-stone-200 px-3 py-2 text-sm font-medium text-stone-500 transition-colors hover:bg-stone-100 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
                >
                    {blogData?.url} ↗
                </a>
            </Flex>

            <SiteSettingsNav activeTab="analytics" />

            <div className="flex flex-col space-y-6 pt-5">
                <AnalyticsMockup />
            </div>
        </div>
    );
}

export default BlogAnalytics;
