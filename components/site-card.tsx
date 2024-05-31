import BlurImage from "@/components/blur-image";
import { placeholderBlurhash, random } from "@/lib/utils";
import { Site } from "@prisma/client";
import { BarChart, ExternalLink } from "lucide-react";
import Link from "next/link";

import {
	useColorModeValue,
    Box
} from "@chakra-ui/react";

export default function SiteCard({ data }: { data: Site }) {
    const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
    const menuItemActiveBgColor = useColorModeValue(
		"blackAlpha.50",
		"whiteAlpha.50"
	);

    return (
        <Box  bg={menuItemActiveBgColor} sx={{ overflow: 'hidden'}} className="relative rounded-xl pb-10 shadow-md transition-all hover:shadow-xl">
            <Link
                href={`/site/${data.id}`}
                className="flex flex-col overflow-hidden rounded-lg"
            >
                <BlurImage
                    alt={data.name ?? "Card thumbnail"}
                    width={500}
                    height={400}
                    className="h-44 object-cover"
                    src={data.image ?? "/placeholder.png"}
                    placeholder="blur"
                    blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
                />
                <div className="p-4">
                    <h3 className="font-cal my-0 truncate text-[17px] font-medium tracking-wide dark:text-stone-400">
                        {data.name}
                    </h3>
                    <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
                        {data.description}
                    </p>
                </div>
            </Link>
            <div className="absolute bottom-4 flex w-full justify-between space-x-4 px-4" >
                <a
                    href={
                        process.env.NEXT_PUBLIC_VERCEL_ENV
                            ? `https://${url}`
                            : `http://${data.subdomain}.localhost:3000`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="truncate rounded-xl bg-stone-100 px-2 py-1 text-sm font-medium text-stone-500 transition-colors hover:bg-stone-200 dark:bg-stone-600 dark:text-stone-400 dark:hover:bg-stone-700"
                >
                    {url} ↗
                </a>
                <Link
                    href={`/site/${data.id}/analytics`}
                    className="flex items-center rounded-md bg-green-100 px-2 py-1 text-sm font-medium text-green-600 transition-colors hover:bg-green-200 dark:bg-green-900 dark:bg-opacity-50 dark:text-green-400 dark:hover:bg-green-800 dark:hover:bg-opacity-50"
                >
                    <BarChart height={16} />
                    {/* <p>{random(10, 40)}%</p> */}
                </Link>
            </div>
        </Box>
    );
}
