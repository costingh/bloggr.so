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
}

function BlogTemplateConfiguration({blogData} : Props) {
    return (
        <div style={{ padding: "40px 80px", width: "100%" }}>
            <Flex
                flexDir="row"
                alignItems="center"
                justifyContent="space-between"
                w="100%"
            >
                <h2 style={{ fontSize: "16px" }}>Configure blog - {blogData?.siteData?.name}</h2>
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

            <SiteSettingsNav activeTab='settings'/>

            <div className="flex flex-col space-y-6 pt-5">
                <Form
                    title="Name"
                    description="The name of your site. This will be used as the meta title on Google as well."
                    helpText="Please use 32 characters maximum."
                    inputAttrs={{
                        name: "name",
                        type: "text",
                        defaultValue: blogData?.siteData?.name!,
                        placeholder: "My Awesome Site",
                        maxLength: 32,
                    }}
                    handleSubmit={() =>{}}
                />

                <Form
                    title="Description"
                    description="The description of your site. This will be used as the meta description on Google as well."
                    helpText="Include SEO-optimized keywords that you want to rank for."
                    inputAttrs={{
                        name: "description",
                        type: "text",
                        defaultValue: blogData?.description!,
                        placeholder: "A blog about really interesting things.",
                    }}
                    handleSubmit={() =>{}}
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

export default BlogTemplateConfiguration;
