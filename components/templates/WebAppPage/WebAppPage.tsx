"use client";

import Nav, { sidebarWidth } from "@/components/Sidebar/nav";
import { Routes } from "@/config/routes";
import { useMobile } from "@/lib/hooks/useMobile";
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
} from "@chakra-ui/react";

import { useSession } from "next-auth/react";

import { TbMenu2 } from "react-icons/tb";
import { BlogsList } from "@/components/BlogsList/page";
import { BlogSetup } from "@/components/BlogSetup/page";
import BlogTemplateConfiguration from "@/components/BlogSetup/BlogTemplateConfiguration/page";
import BlogDomainsSettingsTab from "@/components/BlogSetup/BlogDomainsSettingsTab/page";
import BlogAppearance from "@/components/BlogSetup/BlogAppearance/page";

type WebAppPageProps = {
	currentPage: Routes;
	blogData?: any;
};

export const WebAppPage = ({ currentPage, blogData }: WebAppPageProps) => {
	const isMobile = useMobile();

    const { data: session, status } = useSession();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const buttonColor = useColorModeValue("blackAlpha.600", "whiteAlpha.600");
	const buttonColorScheme = useColorModeValue("blackAlpha", "whiteAlpha");
	
	return (
		<Center minH="100vh">
			{status === "loading" && <Spinner color="brand.500" />}
			{status === "unauthenticated" && (
				<Stack>
					<Text>Sign in to access</Text>
					<Button as="a" href="/login" colorScheme="brand">
						Sign in
					</Button>
				</Stack>
			)}
			{status === "authenticated" && (
				<>
					{isMobile && (
						<Flex
							boxShadow="sm"
							w="100vw"
							alignItems="flex-start"
							justifyContent="start"
							position="fixed"
							top="0"
							left="0"
							p="8px"
						>
							<IconButton
								icon={<TbMenu2 />}
								aria-label={"menu"}
								variant="ghost"
								colorScheme={buttonColorScheme}
								color={buttonColor}
								mr="8px"
								size="sm"
								onClick={onOpen}
							/>
						</Flex>
					)}
					<Drawer
						isOpen={isOpen}
						placement="left"
						onClose={onClose}
						size="xs"
					>
						<DrawerOverlay />
						<DrawerContent w={sidebarWidth} maxW={sidebarWidth}>
							<DrawerCloseButton
								colorScheme={buttonColorScheme}
								color={buttonColor}
								size="sm"
								zIndex="1000"
								position="fixed"
							/>

							<DrawerBody>
								<Nav currentPage={currentPage} />
							</DrawerBody>
						</DrawerContent>
					</Drawer>
					{!isMobile && <Nav currentPage={currentPage} />}
					<Flex
						minW="100vw"
						w="100vw"
						minH="100vh"
						margin="0"
						padding="0"
						pt={isMobile ? "48px" : "0"}
						flexGrow={1}
						justifyContent="flex-start"
						pl={isMobile ? 0 : sidebarWidth}
						style={{
							marginInlineStart: "0",
							marginInlineEnd: "0",
						}}
					>
						{currentPage === Routes.dashboard && <BlogsList/>}
						{currentPage === Routes.createNewBlog && <BlogSetup/> }
						{currentPage === Routes.blogHome && <BlogTemplateConfiguration blogData={blogData}/> }
						{currentPage === Routes.blogSettings && <BlogTemplateConfiguration blogData={blogData}/> }
						{currentPage === Routes.blogDomains && <BlogDomainsSettingsTab blogData={blogData}/> }
						{currentPage === Routes.blogAppearance && <BlogAppearance blogData={blogData}/> }
					</Flex>
				</>
			)}
		</Center>
	);
};
