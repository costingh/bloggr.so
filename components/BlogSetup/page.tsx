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
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { GetDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { useColorModeValues } from "@/lib/hooks/useColorModeValues";
import { useRouter } from "next/navigation";
import { createSite } from "@/lib/actions";
import va from "@vercel/analytics";
import { extractIdFromUrl } from "@/lib/utils";

type MappingType = {
	draft: string;
	featured: string;
	publishedDate: string;
	slug: string;
	title: string;
	category?: string;
} | null;

export type FormDataType = {
	name: string;
	description: string;
	subdomain: string;
	mapping: MappingType;
	postsDatabaseId: string;
} | null;

type FieldMapping = {
	name: string;
	description: string;
	type?: string;
}[];

const fieldMappings = [
	{
		name: "Title",
		description: "The title of the post",
		type: "mandatory",
	},
	{
		name: "Published Date",
		description: "The date when the post will be published",
		type: "mandatory",
	},
	{
		name: "Slug",
		description:
			"Slug for the post, or autogenerated from title if left empty",
	},
	{
		name: "Draft",
		description: "Indicates if the post is a draft or ready to be posted",
	},
	{
		name: "Featured",
		description: "Indicates if the post is featured on the first page",
	},
	{
        name: "Category",
        description: "Name of the topic/category the post is part of",
    },
];

const initialState = {};
fieldMappings.forEach((field) => {
	//@ts-ignore
	initialState[field.name] = null;
});

export const BlogSetup = () => {
	const router = useRouter();
	const [pending, setPending] = useState(false);

	const [isValidatingMapping, setIsValidatingMapping] = useState(false);
	const [isValidatingSubdomain, setIsValidatingSubdomain] = useState(false);
	const [step, setStep] = useState(1);
	const [notionDatabaseId, setNotionDatabaseId] = useState("");
	const [isConnecting, setIsConnecting] = useState(false);
	const [databaseConnected, setDatabaseConnected] = useState(false);
	const [databaseInfo, setDatabaseInfo] = useState({});
	const [mapping, setMapping] = useState(initialState);
	const [blogId, setBlogId] = useState("");
	const [data, setData] = useState<FormDataType>({
		name: "",
		subdomain: "",
		description: "",
		mapping: null,
		postsDatabaseId: "",
	});
	const { borderColor, secondaryTextColor } = useColorModeValues();
	const sectionColor = useColorModeValue("blackAlpha.900", "whiteAlpha.900");
	const menuItemActiveBgColor = useColorModeValue(
		"blackAlpha.50",
		"whiteAlpha.50"
	);
	const buttonColor = useColorModeValue("blackAlpha.600", "whiteAlpha.600");
	const buttonColorScheme = useColorModeValue("blackAlpha", "whiteAlpha");

	useEffect(() => {
		//@ts-ignore
		setData((prev) => ({
			...prev,
			subdomain: prev?.name
				.toLowerCase()
				.trim()
				.replace(/[\W_]+/g, "-"),
		}));
	}, [data?.name]);

	const handleDatabaseIdChange = (e: any) => {
		const val = extractIdFromUrl(e.target.value);
		setNotionDatabaseId(val);
		// @ts-ignore
		setData({ ...data, postsDatabaseId: val });
	};

	// const extractIdFromUrl = (url: string): string => {
	// 	const pattern = /([a-fA-F0-9]{32})/;
	// 	const match = url.match(pattern);
	// 	if (match) {
	// 		return match[1];
	// 	} else {
	// 		return "";
	// 	}
	// };

	const connectNotionDatabase = async () => {
		setIsConnecting(true);

		axios
			.get<GetDatabaseResponse>(
				`/api/notion/${extractIdFromUrl(notionDatabaseId)}`
			)
			.then((response: any) => {
				setDatabaseConnected(true);
				setStep(2);
				setDatabaseInfo(response?.data?.databaseInfo);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setIsConnecting(false);
			});
	};

	useEffect(() => {
		if ((databaseInfo as any)?.properties) {
			const automaticMapping = extractMapping(
				(databaseInfo as any)?.properties
			);
			setMapping(automaticMapping);
			console.log(automaticMapping);
		}
	}, [databaseInfo]);

	const _DATABASES_LIST = [
		{
			title: "Content Database",
			description: "This is where your content data is stored",
		},
		{
			title: "Pages Database",
			description: "This is where data about pages is stored",
		},
	];

	const extractOptions = (columnName: string) => {
		try {
			//@ts-ignore
			return Object.keys(databaseInfo?.properties).map((key) => (
				<option value={key}>{key}</option>
			));
		} catch (error) {
			return null;
		}
	};

	const extractMapping = (notionDatabaseProperties: any) => {
		const _mapping: { [key: string]: string } = {};

		fieldMappings.forEach((field) => {
			const possibleFieldNames = getPossibleFieldNames(field.name);
			const notionPropertyName = Object.keys(
				notionDatabaseProperties
			).find((propertyName) => possibleFieldNames.includes(propertyName));
			if (notionPropertyName) {
				_mapping[field.name] = notionPropertyName;
			} else {
				console.log(
					`No matching property found for field "${field.name}"`
				);
			}
		});

		return _mapping;
	};

	const getPossibleFieldNames = (fieldName: string): string[] => {
		switch (fieldName) {
			case "Title":
				return [
					"Name",
					"Article name",
					"Blog title",
					"Title",
					"Post title",
					"Heading",
				];
			case "Published Date":
				return [
					"Published Date",
					"Publish Date",
					"Date",
					"Release Date",
				];
			case "Slug":
				return ["Slug", "URL Slug", "Post Slug"];
			case "Category":
				return ["Category", "category", "Categories", "categories", "Topics", "topics"];
			case "Draft":
				return ["Draft", "Is Draft", "Draft Status"];
			case "Featured":
				return ["Featured", "Is Featured", "Featured Post"];
			default:
				return [fieldName]; // Default to the original field name
		}
	};

	const handleChangeMapping = (e: Event, column: string) => {
		//@ts-ignore
		setMapping((prev) => ({ ...prev, [column]: e.target.value }));
	};

	useEffect(() => {
		if (databaseConnected) {
			const areMappingsValid = checkValidMappings(mapping);
			setIsMappingValid(areMappingsValid);
		}
	}, [mapping, databaseConnected]);

	const [isMappingValid, setIsMappingValid] = useState(false);

	const checkValidMappings = (_mapping: any) => {
		let isValid = true;
		fieldMappings.map((mp) => {
			if (mp.type === "mandatory" && !_mapping[mp.name]) {
				isValid = false;
			}
		});
		return isValid;
	};

	const saveUserMappings = () => {
		setIsValidatingMapping(true);
		const userMappings: MappingType = {
			draft: (mapping as any)["Draft"],
			featured: (mapping as any)["Featured"],
			publishedDate: (mapping as any)["Published Date"],
			slug: (mapping as any)["Slug"],
			title: (mapping as any)["Title"],
			category: (mapping as any)["Category"],
		  };
	  
		  //@ts-ignore
		  setData({ ...data, mapping: userMappings });
		  setIsValidatingMapping(false);
		  setStep(3);
	};

	const createBlog = async () => {
		setPending(true);
		createSite(data as any).then((res: any) => {
			if (res.error) {
				toast.error(res.error);
			} else {
				va.track("Created Site");
				const { id } = res;
				router.refresh();
				router.push(`/site/${id}`);
				toast.success(`Successfully created site!`);
			}
			setPending(false);
		});
	};

	return (
		<>
			{step == 1 && (
				<Flex
					alignItems="center"
					flexDirection="column"
					gap={3}
					justifyContent="center"
					w="100vw"
				>
					<h2 style={{ fontSize: "18px" }}>
						Start connecting your Notion database
					</h2>
					<span>Enter your database URL below:</span>

					{/* <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '15px'}}>
									{_DATABASES_LIST.map((db) => (
										<div key={db.title} style={{border: `1px solid ${borderColor}`, borderRadius: '15px', display: 'block', width: '500px', height: '145px', padding: '15px 25px', cursor: 'pointer'}}>
											<p>{db.title}</p>
											<div style={{fontSize: '14px', marginTop: '10px'}}>{db.description}</div>
										</div>
									))}
								</div> */}
					<Input
						type="text"
						placeholder="c668b7eed8e64b06a0caefa1bbc22101"
						onChange={handleDatabaseIdChange}
						maxW="350px"
					/>
					<Button
						isLoading={isConnecting}
						isDisabled={!notionDatabaseId}
						onClick={connectNotionDatabase}
					>
						Connect
					</Button>
				</Flex>
			)}

			{step == 2 && (
				<Flex
					alignItems="center"
					flexDirection="column"
					gap={3}
					justifyContent="center"
					w="100vw"
				>
					<Flex
						alignItems="flex-start"
						flexDirection="column"
						gap={6}
						justifyContent="center"
						bgColor={menuItemActiveBgColor}
						padding="30px 40px"
						borderRadius="20px"
					>
						<h2
							style={{
								fontSize: "18px",
								fontWeight: 700,
							}}
						>
							Map your fields
						</h2>

						<p
							style={{
								fontWeight: 600,
								fontSize: "15px",
							}}
						>
							This are mandatory fields you need in your database
						</p>

						<Divider
							orientation="horizontal"
							color={sectionColor}
						/>

						{fieldMappings.map((field, index) => (
							<>
								{index == 2 && (
									<>
										<p
											style={{
												fontWeight: 600,
												fontSize: "15px",
												marginTop: "20px",
											}}
										>
											This are nice to have
										</p>

										<Divider
											orientation="horizontal"
											color={sectionColor}
										/>
									</>
								)}
								<Flex
									as="article"
									flexDir="row"
									gap={6}
									key={field.name}
								>
									<div style={{ width: "260px" }}>
										<div
											style={{
												fontWeight: 500,
												fontSize: "15px",
											}}
										>
											{field.name}
										</div>
										<div
											style={{
												fontSize: "12px",
												fontWeight: 300,
											}}
										>
											{field.description}{" "}
											{field.type === "mandatory" && "*"}
										</div>
									</div>
									<div style={{ width: "150px" }}>
										<Select
											variant="filled"
											value={
												//@ts-ignore
												mapping[field.name]
											}
											onChange={(e) =>
												handleChangeMapping(
													e as any,
													field.name
												)
											}
										>
											<option value="">
												Notion field name
											</option>
											{extractOptions(field.name)}
										</Select>
									</div>
								</Flex>
							</>
						))}

						{databaseConnected && !isMappingValid && (
							<span
								style={{
									fontSize: "13px",
									fontWeight: 400,
									color: "red",
								}}
							>
								Please select correct mapping for mandatory
								fields
							</span>
						)}
						{databaseConnected && (
							<Button
								isLoading={isValidatingMapping}
								isDisabled={!isMappingValid}
								onClick={saveUserMappings}
								sx={{ marginLeft: "auto" }}
							>
								Next
							</Button>
						)}
					</Flex>
				</Flex>
			)}

			{step == 3 && (
				<Flex
					alignItems="center"
					flexDirection="column"
					gap={3}
					justifyContent="center"
					w="100vw"
				>
					<div style={{ maxWidth: "500px" }}>
						<h2
							style={{
								fontSize: "22px",
								fontWeight: 700,
								textAlign: "center",
								marginBottom: "20px",
							}}
						>
							Choose your subdomain
						</h2>
						<p
							style={{
								fontWeight: 600,
								fontSize: "15px",
								textAlign: "center",
								padding: "0px 40px",
								marginBottom: "20px",
							}}
						>
							Type your preferred subdomain. You can change this
							later or even add your own domain.
						</p>
						<Flex
							alignItems="flex-start"
							flexDirection="column"
							gap={6}
							justifyContent="center"
							bgColor={menuItemActiveBgColor}
							padding="30px 40px"
							borderRadius="20px"
						>
							<Divider
								orientation="horizontal"
								color={sectionColor}
							/>

							<Flex
								flexDir="column"
								gap={2}
								sx={{ width: "100%" }}
							>
								<div style={{ display: "flex" }}>
									<div
										style={{
											fontWeight: 500,
											fontSize: "15px",
										}}
									>
										Enter your blog's name
									</div>
									<div
										style={{
											fontSize: "12px",
											fontWeight: 300,
											color: "red",
											paddingRight: "10px",
										}}
									>
										*
									</div>
								</div>
								<div>
									<Input
										type="text"
										placeholder="My blog"
										variant="filled"
										sx={{ width: "100%" }}
										onChange={(e) =>
											//@ts-ignore
											setData((prev) => ({
												...prev,
												name: e.target.value
											}))
										}
									/>
								</div>
								<div
									style={{
										display: "flex",
										marginTop: "20px",
									}}
								>
									<div
										style={{
											fontWeight: 500,
											fontSize: "15px",
										}}
									>
										Enter your desired subdomain
									</div>
									<div
										style={{
											fontSize: "12px",
											fontWeight: 300,
											color: "red",
											paddingRight: "10px",
										}}
									>
										*
									</div>
								</div>
								<div style={{ position: "relative" }}>
									<Input
										type="text"
										placeholder="my-personal-blog"
										required
										autoCapitalize="off"
										pattern="[a-zA-Z0-9\-]+" // only allow lowercase letters, numbers, and dashes
										variant="filled"
										sx={{
											width: "100%",
											padding: "0px 83px 0 66px",
										}}
										onChange={(e) =>
											//@ts-ignore
											setData((prev) => ({
												...prev,
												subdomain: e.target.value
											}))
										}
									/>
									<span
										style={{
											position: "absolute",
											left: "10px",
											top: "8px",
											color: "#ccc",
										}}
									>
										https://
									</span>
									<span
										style={{
											position: "absolute",
											right: "10px",
											top: "8px",
											color: "#ccc",
										}}
									>
										.{process.env.NEXT_PUBLIC_ROOT_DOMAIN}
									</span>
								</div>
							</Flex>

							{/* {databaseConnected && !isMappingValid && (
										<span
											style={{
												fontSize: "13px",
												fontWeight: 400,
												color: "red",
											}}
										>
											Please select correct mapping for
											mandatory fields
										</span>
									)} */}
							<Button
								isLoading={isValidatingSubdomain}
								isDisabled={!data?.subdomain || !data?.name}
								onClick={createBlog}
								sx={{ marginLeft: "auto" }}
							>
								Next
							</Button>
						</Flex>
					</div>
				</Flex>
			)}
		</>
	);
};
