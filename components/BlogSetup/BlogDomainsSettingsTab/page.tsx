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

import SiteSettingsNav from "@/app/app/(dashboard)/site/[id]/settings/nav";

type Props = {
    blogData?: any;
};

function BlogDomainsSettingsTab({ blogData }: Props) {
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

            <SiteSettingsNav activeTab='domains'/>

            <div className="flex flex-col space-y-6 pt-5">
                <Form
                    title="Subdomain"
                    description="The subdomain for your site."
                    helpText="Please use 32 characters maximum."
                    inputAttrs={{
                        name: "subdomain",
                        type: "text",
                        defaultValue: blogData?.siteData?.subdomain!,
                        placeholder: "subdomain",
                        maxLength: 32,
                    }}
                    handleSubmit={() => {}}
                />
                <Form
                    title="Custom Domain"
                    description="The custom domain for your site."
                    helpText="Please enter a valid domain."
                    inputAttrs={{
                        name: "customDomain",
                        type: "text",
                        defaultValue: blogData?.siteData?.customDomain!,
                        placeholder: "yourdomain.com",
                        maxLength: 64,
                        pattern:
                            "^[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}$",
                    }}
                    handleSubmit={() => {}}
                />

                {/* <DeleteSiteForm siteName={data?.name!} /> */}
                {/* <Suspense
                    fallback={
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <PlaceholderCard key={i} />
                            ))}
                        </div>
                    }
                >
                    <Sites limit={4} />
                </Suspense> */}
            </div>
        </div>
    );
}

export default BlogDomainsSettingsTab;
