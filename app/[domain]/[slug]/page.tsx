import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { getPostData, getSiteData, getPostsForSite } from "@/lib/fetchers";
import BlogCard from "@/components/blog-card";
import BlurImage from "@/components/blur-image";
import MDX from "@/components/mdx";
// import { placeholderBlurhash, toDateString } from "@/lib/utils";
import { Post } from "@/types/post.types";
import { NotionPost } from "@/types/notion.types";
import { processPost, processPosts } from "@/lib/utils/postProcessor";
import readingTime from "reading-time";
// @ts-ignore
import mdxPrism from "mdx-prism";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
// @ts-ignore
import remarkCapitalize from "remark-capitalize";
import rehypeExternalLinks from "rehype-external-links";
import remarkImages from "remark-images";
import { compileMDX } from "next-mdx-remote/rsc";
// import { api } from "@/data/blog/blogData";
// import { YouTubeEmbed } from "@/components/Blog/Article/YouTubeEmbed";
// import { LoomEmbed } from "@/components/Blog/Article/LoomEmbed";
import { Metadata } from "next";
// import Article from "@/components/Blog/Article/Article";
// import { Footer } from "@/components/Footer/Footer";
import {
    openGraphImageUrl,
    twitterHandle,
    twitterMakerHandle,
    websiteUrl,
} from "@/config/config";
// import { TweetEmbed } from "@/components/Blog/Article/TweetEmbed";
import { getOpenGraph } from "@/components/SEO/OpenGraph";
import { getSEOTags } from "@/components/SEO/SEOTags";
import { Footer1 } from "@/components/BlogSetup/blog/Footer1";
import Article1 from "@/components/BlogSetup/blog/Article/Article1";
import { LoomEmbed } from "@/components/BlogSetup/blog/Article/LoomEmbed";
import { YouTubeEmbed } from "@/components/BlogSetup/blog/Article/YouTubeEmbed";
import { TweetEmbed } from "@/components/BlogSetup/blog/Article/TweetEmbed";
import Base from "@/layouts/BaseLayout";
import Header from "@/components/partials/Header";
import { FooterConfig } from "@/lib/types";

interface Section {
    sectionTitle: string;
    subsections?: Section[];
}

export async function generateMetadata({
    params,
}: {
    params: { domain: string; slug: string };
}) {
    const domain = decodeURIComponent(params.domain);
    const slug = decodeURIComponent(params.slug);
    const [data, siteData] = await Promise.all([
        getPostData(domain, slug),
        getSiteData(domain),
    ]);
    if (!data || !siteData) {
        return null;
    }

    const processedPost = processPost(data?.post, data?.mapping);

    return {
        ...getSEOTags({
            metadataBase: new URL(websiteUrl),
            title: processedPost?.title,
            description: "Description 1",
        }),
        ...getOpenGraph({
            websiteUrl: `/blog/${slug}`,
            title: processedPost?.title,
            description: "Description 1",
            imageUrl: "",
            twitterImageUrl: openGraphImageUrl,
            twitterHandle: twitterHandle,
            twitterMakerHandle: twitterMakerHandle,
        }),
        // Optional: Set canonical URL to custom domain if it exists
        ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
            siteData.customDomain && {
                alternates: {
                    canonical: `https://${siteData.customDomain}/${params.slug}`,
                },
            }),
    };
}

// export async function generateStaticParams() {
//     const allPosts = await prisma.post.findMany({
//         select: {
//             slug: true,
//             site: {
//                 select: {
//                     subdomain: true,
//                     customDomain: true,
//                 },
//             },
//         },
//         // feel free to remove this filter if you want to generate paths for all posts
//         where: {
//             site: {
//                 subdomain: "demo",
//             },
//         },
//     });

//     const allPaths = allPosts
//         .flatMap(({ site, slug }) => [
//             site?.subdomain && {
//                 domain: `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
//                 slug,
//             },
//             site?.customDomain && {
//                 domain: site.customDomain,
//                 slug,
//             },
//         ])
//         .filter(Boolean);

//     return allPaths;
// }

export default async function SitePostPage({
    params,
}: {
    params: { domain: string; slug: string };
}) {
    const domain = decodeURIComponent(params.domain);
    const slug = decodeURIComponent(params.slug);

    const [data, siteData] = await Promise.all([
        getPostData(domain, slug),
        getSiteData(domain),
    ]);

    if (!data?.post) {
        notFound();
    }

    const post = processPost(data?.post, data?.mapping);

    const customComponents = {
        YouTube: YouTubeEmbed,
        Tweet: TweetEmbed,
        Loom: LoomEmbed,
    };

    const mdxSource = await compileMDX({
        source: post?.content,
        components: customComponents,
        options: {
            mdxOptions: {
                remarkPlugins: [remarkCapitalize, remarkImages],
                rehypePlugins: [
                    mdxPrism,
                    rehypeAutolinkHeadings,
                    rehypeSlug,
                    rehypeCodeTitles,
                    rehypeExternalLinks,
                ],
            },
        },
    });

    const relatedPostsList = await getPostsForSite(
        domain,
        siteData?.postsDatabaseId || "",
    );
    const relatedPosts = processPosts(
        (relatedPostsList as NotionPost[]) || [],
        data?.mapping,
    );

    const extractHeadingsFromMDX = (mdxContent: string): Section[] => {
        const headings: Section[] = [];
        let currentSection: Section = { sectionTitle: "" };
        let currentLevel = 0;
        
        // Regular expression to match MDX headings
        const headingRegex = /^(#+)\s+(.*)$/gm;
    
        // Match headings in the content
        let match;
        while ((match = headingRegex.exec(mdxContent)) !== null) {
            const level = match[1].length;
            const headingText = match[2];
            
            if (level > currentLevel) {
                // Move to a deeper level
                const lastSubsection = currentSection.subsections ? currentSection.subsections[currentSection.subsections.length - 1] : null;
                if (lastSubsection) {
                    currentSection = lastSubsection;
                }
                currentLevel = level;
            } else if (level < currentLevel) {
                // Move to a higher level
                let diff = currentLevel - level;
                while (diff > 0 && currentSection) {
                    currentSection = headings[headings.length - diff];
                    diff--;
                }
                currentLevel = level;
            }
    
            const newSection: Section = { sectionTitle: headingText };
            if (!currentSection.subsections) {
                currentSection.subsections = [];
            }
            currentSection.subsections.push(newSection);
    
            // If it's a top-level heading, add to the headings array
            if (level === 1) {
                headings.push(newSection);
            }
        }
    
        return headings;
    };

    const title = "By blog";
    const description = "My blog amazing description";
    const content =
        "asdas das dasd klasjdklaks jdlkasjkldj hqiwsjdkla skldaskd;laslkjdf klwqehkljf jsk ldflkjwjadiofg sdlkfgkljsd";
    const meta_title = "My blog";
    const image = "image";
    const noindex = true;
    const canonical = "true";
    const authors = [
        {
            image: "/author.jpg",
            title: "Costin Gheorghe",
        },
    ];

    // TODO: fetch from database
    const footerConfig: FooterConfig = {
        brandName: 'Bloggr',
        logo: {
            src: '',
            redirectUrl: "/",
        },
        slogan: "Setup your blog in minutes",
        copyright: "© Copyright " + (new Date().getFullYear()) + " Bloggr. All rights reserved.",
        columns: [
            {
                columnTitle: "LINKS",
                links: [
                    {
                        name: "Blog",
                        url: "https://......",
                    },
                    {
                        name: "Pricing",
                        url: "https://......",
                    },
                    {
                        name: "Affiliate - Earn 30%",
                        url: "https://......",
                    },
                ],
            },
            {
                columnTitle: "LEGAL",
                links: [
                    {
                        name: "Privacy Policy",
                        url: "https://......",
                    },
                    {
                        name: "Terms and Conditions",
                        url: "https://......",
                    },
                ],
            },
            {
                columnTitle: "SOCIAL",
                socials: [
                    {
                        platform: "Discord",
                        tooltip: "Join Discord Community",
                        url: "https://......",
                    },
                    {
                        platform: "X",
                        tooltip: "Follow X Account",
                        url: "https://......",
                    },
                    {
                        platform: "YouTube",
                        tooltip: "Join YouTube Channel",
                        url: "https://......",
                    },
                ],
            },
        ],
    };
    
    // TODO
    const brandColor = 'rgb(0,0,255)';

    return (
        <Base
            title={title}
            description={
                description ? description : content.slice(0, 120)
            }
            meta_title={meta_title}
            image={image}
            noindex={noindex}
            canonical={canonical}
            logo={siteData?.logo || ''}
            footerConfig={footerConfig}
            brandColor={brandColor}
        >
            <Article1
                readingTime={{ text: readingTime(mdxSource?.content || '')?.text }}
                title={post.title}
                description={post?.description || "description"}
                date={post.date}
                content={mdxSource.content}
                ogImage={{ url: post?.image?.url || null }}
                slug={slug}
                categories={post?.categories || null}
                relatedPosts={relatedPosts}
                post={post}
                headings={extractHeadingsFromMDX(post?.content)}
                brandColor={brandColor}
            />
        </Base>
    );
}