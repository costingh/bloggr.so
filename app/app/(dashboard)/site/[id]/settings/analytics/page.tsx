import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { WebAppPage } from "@/components/templates/WebAppPage/WebAppPage";
import { Routes } from "@/config/routes";

export default async function SiteAnalytics({
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
        <WebAppPage currentPage={Routes.blogAnalytics} blogData={blogData} />
    );
}
