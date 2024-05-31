import type { Metadata } from "next";
import {
    blogOpenGraphImageUrl,
    landingPageDescription,
    landingPageTitle,
    openGraphImageUrl,
    twitterHandle,
    twitterMakerHandle,
    websiteUrl,
} from "@/config/config";
import { getOpenGraph } from "@/components/SEO/OpenGraph";
import { getSEOTags } from "@/components/SEO/SEOTags";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
    ...getSEOTags({
        metadataBase: new URL(websiteUrl),
        title: `${landingPageTitle} | Blog`,
        description: landingPageDescription,
    }),
    ...getOpenGraph({
        title: landingPageTitle,
        description: landingPageDescription,
        imageUrl: blogOpenGraphImageUrl,
        websiteUrl,
        twitterImageUrl: openGraphImageUrl,
        twitterHandle: twitterHandle,
        twitterMakerHandle: twitterMakerHandle,
    }),
};

// TODO: implement color mode switch for subdomain blogs
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
       <>{children}</>
    );
}
