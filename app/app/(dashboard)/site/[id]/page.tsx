import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Posts from "@/components/posts";
import CreatePostButton from "@/components/create-post-button";
import { WebAppPage } from "@/components/templates/WebAppPage/WebAppPage";
import { Routes } from "@/config/routes";

export default async function SitePosts({
    params,
}: {
    params: { id: string };
}) {
    const session = await getSession();
    if (!session) {
        redirect("/login");
    }
    const data = await prisma.site.findUnique({
        where: {
            id: decodeURIComponent(params.id),
        },
    });

    if (!data || data.userId !== session.user.id) {
        notFound();
    }

    const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

    const blogData = {
        url,
        siteData: data
    }

    return (
        <>
            <WebAppPage currentPage={Routes.blogHome} blogData={blogData} />

            {/* <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:space-y-0 w-full min-h-[100vh]">
                <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <h1 className="font-cal w-60 truncate text-xl font-bold dark:text-white sm:w-auto sm:text-3xl">
                        All Posts for {data.name}
                    </h1>
                    <a
                        href={
                            process.env.NEXT_PUBLIC_VERCEL_ENV
                                ? `https://${url}`
                                : `http://${data.subdomain}.localhost:3000`
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
                    >
                        {url} ↗
                    </a>
                </div>
            </div>
            <Posts siteId={decodeURIComponent(params.id)} /> */}
        </>
    );
}
