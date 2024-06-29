
import { getFeaturedPost, processPosts } from "@/lib/utils/postProcessor";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getPostsForSite, getSiteData } from "@/lib/fetchers";
import Image from "next/image";
import config from "@/config/config.json";

import Posts from "@/components/partials/Posts";
import { Post } from "@/types/post.types";
import { NotionPost } from "@/types/notion.types";
import HighlightedPost from "@/components/partials/HighlightedPost";
import Base from "@/layouts/BaseLayout";
import Pagination from "@/components/partials/Pagination";
import {CallToActionBanner} from "@/components/BlogSetup/blog/Widgets/CallToActionBanner";
import CategoryTabs from "@/components/BlogSetup/blog/Widgets/CategoryTabs";
import { FooterConfig } from "@/lib/types";

export async function generateStaticParams() {
    const allSites = await prisma.site.findMany({
        select: {
            subdomain: true,
            customDomain: true,
        },
    });

    const allPaths = allSites
        .flatMap(({ subdomain, customDomain }) => [
            subdomain && {
                domain: `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
            },
            customDomain && {
                domain: customDomain,
            },
        ])
        .filter(Boolean);

    return allPaths;
}

export default async function SiteHomePage({
    params,
    searchParams,
}: {
    params: { domain: string };
    searchParams: {page?: string, category?: string}
}) {

    console.log(searchParams)
    const domain = decodeURIComponent(params.domain);
    const data = await getSiteData(domain);

    if (!data) {
        notFound();
    }

    const postsPerPage = 20; // Number of posts per page
    const currentPage = searchParams?.page ? parseInt(searchParams.page as string, 20) : 1;
    const category = searchParams?.category;

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = currentPage * postsPerPage;

    const posts =
        (await getPostsForSite(domain, data?.postsDatabaseId || "", category)) || [];

    const authors = [
        {
            image: "/author.jpg",
            title: "Costin Gheorghe",
        },
    ];

    
    const currentPosts = processPosts(posts as NotionPost[], data?.mapping);

    let featuredPost = getFeaturedPost(posts as NotionPost[], data?.mapping) || currentPosts[currentPosts?.length-1];

    // Paginate posts
    const paginatedPosts = currentPosts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(currentPosts.length / postsPerPage);

    const noindex = true;
    const canonical = "true";

    const brandColor = 'rgb(0,0,255)';

    // TODO: fetch from notion

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

    return (
        <>
            <Base
                title={data?.name || 'Unknown'}
                description={
                    data?.description || data?.name || ''
                }
                meta_title={data?.name || ''}
                image={data?.image || ''}
                logo={data?.logo || ''}
                noindex={noindex}
                canonical={canonical}
                brandColor={brandColor}
                footerConfig={footerConfig}
            >
                <section className="section">
                    <div className="container">
                        {featuredPost?.title && (
                            <HighlightedPost
                                post={featuredPost}
                                authors={authors}
                            />
                        )}
                        <CategoryTabs
                            basePath={`/${params.domain}`}
                            activeCategory={category}
                        />
                        <Posts
                            className="mb-16"
                            posts={paginatedPosts}
                            authors={authors}
                        />
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            basePath={`/${params.domain}`} // Base path for pagination links
                        />
                    </div>
                    <CallToActionBanner brandColor={brandColor}/>
                </section>
            </Base>
        </>
    );
}













 {/* <div className="mb-20 w-full">
                {posts.length > 0 ? (
                    <div className="mx-auto w-full max-w-screen-xl md:mb-28 lg:w-5/6">
                        <Link
                            href={`/${posts?.[0]?.properties?.[
                                data?.mapping?.slug
                            ]?.rich_text[0].plain_text}`}
                        >
                            <div className="sm:h-150 group relative mx-auto h-80 w-full overflow-hidden lg:rounded-xl">
                                <BlurImage
                                    alt={
                                        posts?.[0]?.properties?.[
                                            data?.mapping?.title
                                        ]?.title?.[0]?.plain_text ?? ""
                                    }
                                    blurDataURL={
                                        posts[0].imageBlurhash ??
                                        placeholderBlurhash
                                    }
                                    className="h-full w-full object-cover group-hover:scale-105 group-hover:duration-300"
                                    width={1300}
                                    height={630}
                                    placeholder="blur"
                                    src={posts[0].image ?? "/placeholder.png"}
                                />
                            </div>
                            <div className="mx-auto mt-10 w-5/6 lg:w-full">
                                <h2 className="font-title my-10 text-4xl dark:text-white md:text-6xl">
                                    {
                                        posts?.[0]?.properties?.[
                                            data?.mapping?.title
                                        ]?.title?.[0]?.plain_text
                                    }
                                </h2>
                                <p className="w-full text-base dark:text-white md:text-lg lg:w-2/3">
                                    {posts[0].description} 
                                </p>
                                <div className="flex w-full items-center justify-start space-x-4">
                                    <div className="relative h-8 w-8 flex-none overflow-hidden rounded-full">
                                        {data.user?.image ? (
                                            <BlurImage
                                                alt={
                                                    data.user?.name ??
                                                    "User Avatar"
                                                }
                                                width={100}
                                                height={100}
                                                className="h-full w-full object-cover"
                                                src={data.user?.image}
                                            />
                                        ) : (
                                            <div className="absolute flex h-full w-full select-none items-center justify-center bg-stone-100 text-4xl text-stone-500">
                                                ?
                                            </div>
                                        )}
                                    </div>
                                    <p className="ml-3 inline-block whitespace-nowrap align-middle text-sm font-semibold dark:text-white md:text-base">
                                        {data.user?.name}
                                    </p>
                                    <div className="h-6 border-l border-stone-600 dark:border-stone-400" />
                                    <p className="m-auto my-5 w-10/12 text-sm font-light text-stone-500 dark:text-stone-400 md:text-base">
                                        {toDateString(
                                            posts?.[0]?.properties?.[
                                                data?.mapping?.publishedDate
                                            ]?.title?.[0]?.plain_text,
                                        )}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Image
                            alt="missing post"
                            src="https://illustrations.popsy.co/gray/success.svg"
                            width={400}
                            height={400}
                            className="dark:hidden"
                        />
                        <Image
                            alt="missing post"
                            src="https://illustrations.popsy.co/white/success.svg"
                            width={400}
                            height={400}
                            className="hidden dark:block"
                        />
                        <p className="font-title text-2xl text-stone-600 dark:text-stone-400">
                            No posts yet.
                        </p>
                    </div>
                )}
            </div>

            {posts.length > 1 && (
                <div className="mx-5 mb-20 max-w-screen-xl lg:mx-24 2xl:mx-auto">
                    <h2 className="font-title mb-10 text-4xl dark:text-white md:text-5xl">
                        More stories
                    </h2>
                    <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
                        {posts.slice(1).map((metadata: any, index: number) => (
                            <BlogCard key={index} data={metadata} />
                        ))}
                    </div>
                </div>
            )} */}

















//

// import config from "@/config/config.json";
// import NotFound from "@/layouts/404";
// import About from "@/components/partials/About";
// import Base from "@/layouts/BaseLayout";
// import Contact from "@/components/partials/Contact";
// import Default from "@/components/partials/Default";
// import PostSingle from "@/components/partials/PostSingle";
// import { getRegularPage, getSinglePage } from "@/lib/contentParser";
// const { blog_folder } = config.settings;

// // for all regular pages
// const RegularPages = ({ slug, data, postSlug, authors, posts }) => {
//     const {
//         title,
//         meta_title,
//         description,
//         image,
//         noindex,
//         canonical,
//         layout,
//     } = data.frontmatter;
//     const { content } = data;

//     return (
//         <Base
//             title={title}
//             description={description ? description : content.slice(0, 120)}
//             meta_title={meta_title}
//             image={image}
//             noindex={noindex}
//             canonical={canonical}
//         >
//             {/* single post */}
//             {postSlug.includes(slug) ? (
//                 <PostSingle
//                     slug={slug}
//                     post={data}
//                     authors={authors}
//                     posts={posts}
//                 />
//             ) : layout === "404" ? (
//                 <NotFound data={data} />
//             ) : layout === "about" ? (
//                 <About data={data} />
//             ) : layout === "contact" ? (
//                 <Contact data={data} />
//             ) : (
//                 <Default data={data} />
//             )}
//         </Base>
//     );
// };
// export default RegularPages;

// // for regular page routes
// export const getStaticPaths = async () => {
//     const regularSlugs = getSinglePage("content");
//     const postSlugs = getSinglePage(`content/${blog_folder}`);
//     const allSlugs = [...regularSlugs, ...postSlugs];
//     const paths = allSlugs.map((item) => ({
//         params: {
//             regular: item.slug,
//         },
//     }));

//     return {
//         paths,
//         fallback: false,
//     };
// };

// // for regular page data
// export const getStaticProps = async ({ params }) => {
//     const { regular } = params;
//     const allPages = await getRegularPage(regular);

//     // get posts folder slug for filtering
//     const getPostSlug = getSinglePage(`content/${blog_folder}`);
//     const postSlug = getPostSlug.map((item) => item.slug);
//     // aughor data
//     const authors = getSinglePage("content/authors");
//     // all single pages
//     const posts = getSinglePage(`content/${blog_folder}`);

//     return {
//         props: {
//             slug: regular,
//             data: allPages,
//             postSlug: postSlug,
//             authors: authors,
//             posts: posts,
//         },
//     };
// };
