import prisma from "@/lib/prisma";
import Form from "@/components/form";
import { updateSite } from "@/lib/actions";
import { Routes } from "@/config/routes";
import { WebAppPage } from "@/components/templates/WebAppPage/WebAppPage";

export default async function SiteSettingsDomains({
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
        <WebAppPage currentPage={Routes.blogDomains} blogData={blogData} />
    );
}
