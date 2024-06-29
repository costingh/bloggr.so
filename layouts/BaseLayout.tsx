'use client'

import React from 'react'
import config from "@/config/config.json";
import { plainify } from "@/lib/utils/textConverter";
import { Footer1 } from "@/components/BlogSetup/blog/Footer1";

import Header from "@/components/partials/Header";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { Footer } from '@/components/landing-page/Footer';

interface BaseLayoutProps {
    title?: string;
    meta_title?: string;
    description?: string;
    image?: string;
    noindex?: boolean;
    canonical?: string;
    children: React.ReactNode;
    logo?: string;
    brandColor?: string;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
    title,
    meta_title,
    description,
    image,
    noindex,
    canonical,
    children,
    logo,
    brandColor
}) => {
    const { meta_image, meta_author, meta_description } = config.metadata;
    const { base_url } = config.site;
    const router = useRouter();

    return (
        <div className='overflow-x-hidden'>
            <Head>
                {/* title */}
                <title>
                    {plainify(
                        meta_title
                            ? meta_title
                            : title
                              ? title
                              : config.site.title,
                    )}
                </title>

                {/* canonical url */}
                {canonical && (
                    <link rel="canonical" href={canonical} itemProp="url" />
                )}

                {/* noindex robots */}
                {noindex && <meta name="robots" content="noindex,nofollow" />}

                {/* meta-description */}
                <meta
                    name="description"
                    content={plainify(
                        description ? description : meta_description,
                    )}
                />

                {/* author from config.json */}
                <meta name="author" content={meta_author} />

                {/* og-title */}
                <meta
                    property="og:title"
                    content={plainify(
                        meta_title
                            ? meta_title
                            : title
                              ? title
                              : config.site.title,
                    )}
                />

                {/* og-description */}
                <meta
                    property="og:description"
                    content={plainify(
                        description ? description : meta_description,
                    )}
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    // content={`${base_url}/${router.asPath.replace("/", "")}`}
                />

                {/* twitter-title */}
                <meta
                    name="twitter:title"
                    content={plainify(
                        meta_title
                            ? meta_title
                            : title
                              ? title
                              : config.site.title,
                    )}
                />

                {/* twitter-description */}
                <meta
                    name="twitter:description"
                    content={plainify(
                        description ? description : meta_description,
                    )}
                />

                {/* og-image */}
                <meta
                    property="og:image"
                    content={`${base_url}${image ? image : meta_image}`}
                />

                {/* twitter-image */}
                <meta
                    name="twitter:image"
                    content={`${base_url}${image ? image : meta_image}`}
                />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <Header logo={logo} brandColor={brandColor} />
            {children}
            <Footer logo={logo} />
        </div>
    );
};

export default BaseLayout;
