import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { serialize } from "next-mdx-remote/serialize";
import { replaceExamples, replaceTweets } from "@/lib/remark-plugins";
import { Client, APIErrorCode } from "@notionhq/client";
import { NotionPost, NotionQuery } from "@/types/notion.types";
import { extractIdFromUrl } from "@/lib/utils";

export async function getSiteData(domain: string) {
    const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
        ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
        : null;

    return await unstable_cache(
        async () => {
            return prisma.site.findUnique({
                where: subdomain ? { subdomain } : { customDomain: domain },
                include: { user: true, mapping: true },
            });
        },
        [`${domain}-metadata`],
        {
            revalidate: 900,
            tags: [`${domain}-metadata`],
        },
    )();
}

export async function getPostsForSite(domain: string, databaseId: string, category?: string, next_cursor?: string) {
    const notion = new Client({ auth: process.env.NOTION_TOKEN });

    return await unstable_cache(
        async () => {

            const QUERY: NotionQuery = {
                database_id: extractIdFromUrl(databaseId) || databaseId,
                sorts: [
                    {
                        property: "Publish Date",
                        direction: "descending",
                    },
                ],
                page_size: 100,
                ...(category && {
                    filter: {
                        property: "Category",
                        rich_text: {
                            contains: category,
                        },
                    },
                }),
                ...(next_cursor && { start_cursor: next_cursor }),
            };
            
            console.log(QUERY)

            const resp = await notion.databases.query(QUERY);

            return {
                posts: resp?.results || [],
                next_cursor: resp?.next_cursor || null,
                has_more: resp?.has_more || false
            };
        },
        [`${domain}-posts`],
        {
            revalidate: 900,
            tags: [`${domain}-posts`],
        },
    )();
}

export async function getPostData(domain: string, slug: string) {
    // const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    //     ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    //     : null;

    return await unstable_cache(
        async () => {
            const siteData = await getSiteData(domain);
            const notion = new Client({ auth: process.env.NOTION_TOKEN });
            const response = await notion.databases.query({
                database_id: extractIdFromUrl(siteData?.postsDatabaseId || ''),
                filter: {
                    property: siteData?.mapping?.slug?.toString() || '',
                    rich_text: {
                        equals: slug
                    }
                },
            });
            const post = response?.results?.[0];
            // const data = await prisma.post.findFirst({
            //     where: {
            //         site: subdomain ? { subdomain } : { customDomain: domain },
            //         slug,
            //         published: true,
            //     },
            //     include: {
            //         site: {
            //             include: {
            //                 user: true,
            //             },
            //         },
            //     },
            // });

            if (!post) return null;

            // const [mdxSource, adjacentPosts] = await Promise.all([
            //     getMdxSource(data.content!),
            //     prisma.post.findMany({
            //         where: {
            //             site: subdomain
            //                 ? { subdomain }
            //                 : { customDomain: domain },
            //             published: true,
            //             NOT: {
            //                 id: data.id,
            //             },
            //         },
            //         select: {
            //             slug: true,
            //             title: true,
            //             createdAt: true,
            //             description: true,
            //             image: true,
            //             imageBlurhash: true,
            //         },
            //     }),
            // ]);

            return {
                post: post as NotionPost,
                mapping: siteData?.mapping || null
            };

            // return {
            //     ...data,
            //     mdxSource,
            //     adjacentPosts,
            // };
        },
        [`${domain}-${slug}`],
        {
            revalidate: 900, // 15 minutes
            tags: [`${domain}-${slug}`],
        },
    )();
}

async function getMdxSource(postContents: string) {
    // transforms links like <link> to [link](link) as MDX doesn't support <link> syntax
    // https://mdxjs.com/docs/what-is-mdx/#markdown
    const content =
        postContents?.replaceAll(/<(https?:\/\/\S+)>/g, "[$1]($1)") ?? "";
    // Serialize the content string into MDX
    const mdxSource = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [replaceTweets, () => replaceExamples(prisma)],
        },
    });

    return mdxSource;
}
