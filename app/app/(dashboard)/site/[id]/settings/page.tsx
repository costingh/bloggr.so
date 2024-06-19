import prisma from "@/lib/prisma";
import { updateSite } from "@/lib/actions";
import { WebAppPage } from "@/components/templates/WebAppPage/WebAppPage";
import { Routes } from "@/config/routes";

export default async function SiteSettingsIndex({
    params,
}: {
    params: { id: string };
}) {
    const data = await prisma.site.findUnique({
        where: {
            id: decodeURIComponent(params.id),
        },
    });

    const url = `${data?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

    const blogData = {
        url,
        siteData: data
    }

    return (
        <WebAppPage currentPage={Routes.blogSettings} blogData={blogData} />
    );
}