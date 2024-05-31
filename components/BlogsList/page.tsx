"use client";

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

// import { TbMenu2 } from "react-icons/tb";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import axios from "axios";
// import {
// 	GetDatabaseResponse,
// } from "@notionhq/client/build/src/api-endpoints";

import { useColorModeValues } from "@/lib/hooks/useColorModeValues";
import { useRouter } from "next/navigation";
// import { Site } from "@prisma/client";
// import { useSession } from "next-auth/react";
import { Suspense } from "react";
import Sites from "@/components/sites";
import PlaceholderCard from "@/components/placeholder-card";

export const BlogsList = ({ limit }: { limit?: number }) => {
	const router = useRouter();
    // const { data: session, status } = useSession();

	// const [isValidatingMapping, setIsValidatingMapping] = useState(false);
	// const [isValidatingSubdomain, setIsValidatingSubdomain] = useState(false);
	// const [blogName, setBlogName] = useState("");
	// const [subdomainName, setSubdomainName] = useState("");
	// const [step, setStep] = useState(1);
	// const [notionDatabaseId, setNotionDatabaseId] = useState("");
	// const [isConnecting, setIsConnecting] = useState(false);
	// const [databaseConnected, setDatabaseConnected] = useState(false);
	// const [databaseInfo, setDatabaseInfo] = useState({});

	// const { borderColor, secondaryTextColor } = useColorModeValues();
	// const sectionColor = useColorModeValue("blackAlpha.900", "whiteAlpha.900");
	const spinnerColor = useColorModeValue("blackAlpha.300", "whiteAlpha.300");
	// const menuItemActiveBgColor = useColorModeValue(
	// 	"blackAlpha.50",
	// 	"whiteAlpha.50"
	// );
	// const buttonColor = useColorModeValue("blackAlpha.600", "whiteAlpha.600");
	// const buttonColorScheme = useColorModeValue("blackAlpha", "whiteAlpha");
	// const [blogsList, setBlogsList] = useState<Site[]>([]);
	// const [loadingBlogList, setLoadingBlogPost] = useState(false)

	// useEffect(() => {
	// 	if (session?.user?.id) {
	// 		setLoadingBlogPost(true)
	// 		axios
	// 			.get<GetDatabaseResponse>(
	// 				`/api/notion/get-user-blogs/${session?.user?.id}`
	// 			)
	// 			.then((response: any) => {
	// 				setBlogsList(response?.data?.sites);
	// 				console.log(response?.data?.sites)
	// 			})
	// 			.catch((error) => {
	// 			})
	// 			.finally(() => {
	// 				setLoadingBlogPost(false)
	// 			});
	// 	}
	// }, [session]);

    const handleCreateNewBlog = () => {
        router.push('/dashboard/create-new-blog')
    }

	return (
		<div style={{ padding: "40px 80px", width: '100%' }}>
			<Flex
				flexDir="row"
				alignItems="center"
				justifyContent="space-between"
				w="100%"
			>
				<h2 style={{ fontSize: "18px" }}>Your blogs</h2>
                <Button
                    isLoading={false}
                    isDisabled={false}
                    onClick={handleCreateNewBlog}
                >
                    Create new blog
                </Button>
			</Flex>

			<div className="flex flex-col space-y-6">
                {/* <div className="flex items-center justify-between">
                    <h1 className="font-cal text-3xl font-bold dark:text-white">
                        Top Sites
                    </h1>
                    <Suspense fallback={null}>
                        <OverviewSitesCTA />
                    </Suspense>
                </div> */}
                <Suspense
                    fallback={
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <PlaceholderCard key={i} />
                            ))}
                        </div>
                    }
                >
                    <Sites limit={4} />
                </Suspense>
            </div>

			{/* {loadingBlogList ? (
				<div style={{width: '100%', display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center'}}>
					<Spinner color={spinnerColor} />
				</div>
			) : (
				<Grid
					templateColumns="repeat(4, 1fr)"
					gap={4}
					mt="6"
					sx={{ width: "100%" }}
				>
					{blogsList?.map((blog) => (
						<Box
							key={blog.id}
							bg={menuItemActiveBgColor}
							p={4}
							borderRadius="md"
							onClick={() => router.push('/site/' + blog.id)}
						>
							<Text>{blog.name || "Unknown"}</Text>
							<Text fontSize="sm">{blog.subdomain ? `https://${blog.subdomain}.bloggr.so` : 'No subdomain choosen'}</Text>
							<Text fontSize="sm" color="gray.600">
								{blog?.createdAt?.toString() || '-'}
							</Text>
						</Box>
					))}
				</Grid>
			)} */}

		</div>
	);
};
