import BlurImage from "@/components/blur-image";
// import { placeholderBlurhash, random } from "@/lib/utils";
import { Post, Site, Mapping } from "@prisma/client";
import { BarChart, ExternalLink } from "lucide-react";
import Link from "next/link";

type SiteType = Site & {
    mapping: Mapping
}
export default function PostCard({
    post, site
}: {
    post: any, site: SiteType | undefined
}) {
    const url = `${site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${post?.properties?.[site?.mapping?.slug]?.rich_text[0]?.plain_text}`;

    return (
        <div className="relative rounded-lg border border-stone-200 pb-10 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
            <Link
                href={`/post/${post.id}`}
                className="flex flex-col overflow-hidden rounded-lg"
            >
                <div className="relative h-44 overflow-hidden">
                    {/* <BlurImage
                        alt={post.title ?? "Card thumbnail"}
                        width={500}
                        height={400}
                        className="h-full object-cover"
                        src={data.image ?? "/placeholder.png"}
                        placeholder="blur"
                        blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
                    /> */}
                    {site?.mapping?.draft && !post?.properties?.[site?.mapping?.draft]?.checkbox && (
                        <span className="absolute bottom-2 right-2 rounded-md border border-stone-200 bg-white px-3 py-0.5 text-sm font-medium text-stone-600 shadow-md">
                            Draft
                        </span>
                    )}
                </div>
                <div className="border-t border-stone-200 p-4 dark:border-stone-700">
                    <h3 className="font-cal my-0 truncate text-xl font-bold tracking-wide dark:text-white dark:text-white">
                        {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
                        {post.description}
                    </p>
                </div>
            </Link>
            <div className="absolute bottom-4 flex w-full px-4">
                <a
                    href={
                        process.env.NEXT_PUBLIC_VERCEL_ENV
                            ? `https://${url}`
                            : `http://${site?.subdomain}.localhost:3000/${post?.properties?.[site?.mapping?.slug]?.rich_text[0]?.plain_text}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
                >
                    {url} ↗
                </a>
            </div>
        </div>
    );
}
