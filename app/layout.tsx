// "use client";

import "@/styles/style.scss";
// import { cal, inter } from "@/styles/fonts";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

import config from "@/config/config.json";
import theme from "@/config/theme.json";
// import { JsonContext } from "context/state";
import Head from "next/head";
// import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";
import { GeistSans } from "geist/font/sans";
import { getOpenGraph } from "@/components/SEO/OpenGraph";
import { getSEOTags } from "@/components/SEO/SEOTags";
import {
    landingPageDescription,
    landingPageTitle,
    openGraphImageUrl,
    twitterHandle,
    twitterMakerHandle,
    websiteUrl,
} from "@/config/config";
import pkg from 'semantic-ui-react/package.json'

// const title =
//     "Platforms Starter Kit – The all-in-one starter kit for building multi-tenant applications.";
// const description =
//     "The Platforms Starter Kit is a full-stack Next.js app with multi-tenancy and custom domain support. Built with Next.js App Router, Vercel Postgres and the Vercel Domains API.";
// const image = "https://vercel.pub/thumbnail.png";

// export const metadata: Metadata = {
//     title,
//     description,
//     icons: ["https://vercel.pub/favicon.ico"],
//     openGraph: {
//         title,
//         description,
//         images: [image],
//     },
//     twitter: {
//         card: "summary_large_image",
//         title,
//         description,
//         images: [image],
//         creator: "@vercel",
//     },
//     metadataBase: new URL("https://vercel.pub"),
// };

export const metadata: Metadata = {
    ...getSEOTags({
        metadataBase: new URL(websiteUrl),
        title: landingPageTitle,
        description: landingPageDescription,
    }),
    ...getOpenGraph({
        title: landingPageTitle,
        description: landingPageDescription,
        imageUrl: openGraphImageUrl,
        websiteUrl,
        twitterImageUrl: openGraphImageUrl,
        twitterHandle: twitterHandle,
        twitterMakerHandle: twitterMakerHandle,
    }),
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const uiColorMode = "light";

    // import google font css
    // const pf = theme.fonts.font_family.primary;
    // const sf = theme.fonts.font_family.secondary;
    // const [fontcss, setFontcss] = useState();
    // useEffect(() => {
    //     fetch(
    //         `https://fonts.googleapis.com/css2?family=${pf}${
    //             sf ? "&family=" + sf : ""
    //         }&display=swap`,
    //     ).then((res) => res.text().then((css) => setFontcss(css)));
    // }, [pf, sf]);

    // google tag manager (gtm)
    // const tagManagerArgs = {
    //     gtmId: config.params.tag_manager_id,
    // };
    // useEffect(() => {
    //     setTimeout(() => {
    //         config.params.tag_manager_id &&
    //             TagManager.initialize(tagManagerArgs);
    //     }, 5000);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <>
            <html
                lang="en"
                suppressHydrationWarning
                // data-theme={uiColorMode}
                // style={{ colorScheme: uiColorMode }}
                // className={uiColorMode}
            >
                <Head>
                    {/* google font css */}
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        // crossOrigin="true"
                    />
                    {/* <style
                        dangerouslySetInnerHTML={{
                            __html: `${fontcss}`,
                        }}
                    /> */}
                    {/* responsive meta */}
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, maximum-scale=5"
                    />

                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link
                        rel="mask-icon"
                        href="/safari-pinned-tab.svg"
                        color="#5bbad5"
                    />
                    <meta name="msapplication-TileColor" content="#00aba9" />
                    <meta name="theme-color" content="#ffffff" />
                    <script
                        defer
                        type="text/javascript"
                        src="/pirsch-extended.js"
                        id="pirschextendedjs"
                        data-code="wqba0G9hASlUPaBapzBI9x1IsdLnjEzj"
                    />
                </Head>
                <body
                    // className={`chakra-ui-${uiColorMode} ${GeistSans.className}`}
                    className={`${GeistSans.className}`}
                    style={{
                        overflowX: "hidden",
                    }}
                >
                    {" "}
                    {/* className={cn(cal.variable, inter.variable)} */}
                    <Providers uiColorMode={uiColorMode}>
                        {children}
                        <Analytics />
                    </Providers>
                </body>
            </html>
        </>
    );
}
