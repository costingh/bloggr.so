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

function BlogAppearance({ blogData }: Props) {
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

            <SiteSettingsNav activeTab='appearance'/>

            <div className="flex flex-col space-y-6 pt-5">
                <Form
                   title="Thumbnail image"
                   description="The thumbnail image for your site. Accepted formats: .png, .jpg, .jpeg"
                   helpText="Max file size 50MB. Recommended size 1200x630."
                   inputAttrs={{
                       name: "image",
                       type: "file",
                       defaultValue: blogData?.siteData?.image!,
                   }}
                    handleSubmit={() => {}}
                />
                <Form
                     title="Logo"
                     description="The logo for your site. Accepted formats: .png, .jpg, .jpeg"
                     helpText="Max file size 50MB. Recommended size 400x400."
                     inputAttrs={{
                         name: "logo",
                         type: "file",
                         defaultValue: blogData?.siteData?.logo!,
                     }}
                    handleSubmit={() => {}}
                />
                <Form
                title="Font"
                description="The font for the heading text your site."
                helpText="Please select a font."
                inputAttrs={{
                    name: "font",
                    type: "select",
                    defaultValue: blogData?.siteData?.font!,
                }}
                handleSubmit={() => {}}

            />
            <Form
                title="404 Page Message"
                description="Message to be displayed on the 404 page."
                helpText="Please use 240 characters maximum."
                inputAttrs={{
                    name: "message404",
                    type: "text",
                    defaultValue: blogData?.siteData?.message404!,
                    placeholder:
                        "Blimey! You've found a page that doesn't exist.",
                    maxLength: 240,
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

export default BlogAppearance;
