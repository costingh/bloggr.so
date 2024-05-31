"use server";

import prisma from "@/lib/prisma";
import { Post, Site } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { withPostAuth, withSiteAuth } from "./auth";
import { getSession } from "@/lib/auth";
import {
    addDomainToVercel,
    // getApexDomain,
    removeDomainFromVercelProject,
    // removeDomainFromVercelTeam,
    validDomainRegex,
} from "@/lib/domains";
import { put } from "@vercel/blob";
import { customAlphabet } from "nanoid";
// import { getBlurDataURL } from "@/lib/utils";
import { FormDataType } from "@/components/modal/create-site";

const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    7,
); // 7-character random string

export const createSite = async (formData: FormDataType) => {
    const session = await getSession();
    if (!session?.user.id) {
        return {
            error: "Not authenticated",
        };
    }
    const name = formData?.name || '';
    const description = formData?.description || '';
    const subdomain = formData?.subdomain || '';
    const postsDatabaseId = formData?.postsDatabaseId || '';
    const mapping = formData?.mapping || undefined;

    try {
        if(mapping) {
            const mappingResponse = await prisma.mapping.create({
                data: {...mapping}
            });

            if(mappingResponse) {
                const response = await prisma.site.create({
                    data: {
                        name,
                        description,
                        subdomain,
                        mapping : {
                            connect: {
                                id: mappingResponse.id
                            }
                        },
                        postsDatabaseId,
                        user: {
                            connect: {
                                id: session.user.id,
                            },
                        },
                    },
                });
        
                await revalidateTag(
                    `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
                );
                return response;
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (error: any) {
        if (error.code === "P2002") {
            return {
                error: `This subdomain is already taken`,
            };
        } else {
            return {
                error: error.message,
            };
        }
    }
};

export const updateSite = () => undefined;
// export const updateSite = withSiteAuth(
//     async (formData: FormDataType, site: Site, key: string) => {
//         // @ts-ignore
//         const value = (formData?.[key] || '') as string;

//         try {
//             let response;

//             if (key === "customDomain") {
//                 if (value.includes("vercel.pub")) {
//                     return {
//                         error: "Cannot use vercel.pub subdomain as your custom domain",
//                     };

//                     // if the custom domain is valid, we need to add it to Vercel
//                 } else if (validDomainRegex.test(value)) {
//                     response = await prisma.site.update({
//                         where: {
//                             id: site.id,
//                         },
//                         data: {
//                             customDomain: value,
//                         },
//                     });
//                     await Promise.all([
//                         addDomainToVercel(value),
//                         // Optional: add www subdomain as well and redirect to apex domain
//                         // addDomainToVercel(`www.${value}`),
//                     ]);

//                     // empty value means the user wants to remove the custom domain
//                 } else if (value === "") {
//                     response = await prisma.site.update({
//                         where: {
//                             id: site.id,
//                         },
//                         data: {
//                             customDomain: null,
//                         },
//                     });
//                 }

//                 // if the site had a different customDomain before, we need to remove it from Vercel
//                 if (site.customDomain && site.customDomain !== value) {
//                     response = await removeDomainFromVercelProject(
//                         site.customDomain,
//                     );

//                     /* Optional: remove domain from Vercel team 

//           // first, we need to check if the apex domain is being used by other sites
//           const apexDomain = getApexDomain(`https://${site.customDomain}`);
//           const domainCount = await prisma.site.count({
//             where: {
//               OR: [
//                 {
//                   customDomain: apexDomain,
//                 },
//                 {
//                   customDomain: {
//                     endsWith: `.${apexDomain}`,
//                   },
//                 },
//               ],
//             },
//           });

//           // if the apex domain is being used by other sites
//           // we should only remove it from our Vercel project
//           if (domainCount >= 1) {
//             await removeDomainFromVercelProject(site.customDomain);
//           } else {
//             // this is the only site using this apex domain
//             // so we can remove it entirely from our Vercel team
//             await removeDomainFromVercelTeam(
//               site.customDomain
//             );
//           }
          
//           */
//                 }
//             } else if (key === "image" || key === "logo") {
//                 if (!process.env.BLOB_READ_WRITE_TOKEN) {
//                     return {
//                         error: "Missing BLOB_READ_WRITE_TOKEN token. Note: Vercel Blob is currently in beta – please fill out this form for access: https://tally.so/r/nPDMNd",
//                     };
//                 }

//                 const file = formData[key] as File;
//                 const filename = `${nanoid()}.${file.type.split("/")[1]}`;

//                 const { url } = await put(filename, file, {
//                     access: "public",
//                 });

//                 const blurhash =
//                     key === "image" ? await getBlurDataURL(url) : null;

//                 response = await prisma.site.update({
//                     where: {
//                         id: site.id,
//                     },
//                     data: {
//                         [key]: url,
//                         ...(blurhash && { imageBlurhash: blurhash }),
//                     },
//                 });
//             } else {
//                 response = await prisma.site.update({
//                     where: {
//                         id: site.id,
//                     },
//                     data: {
//                         [key]: value,
//                     },
//                 });
//             }
//             console.log(
//                 "Updated site data! Revalidating tags: ",
//                 `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
//                 `${site.customDomain}-metadata`,
//             );
//             await revalidateTag(
//                 `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
//             );
//             site.customDomain &&
//                 (await revalidateTag(`${site.customDomain}-metadata`));

//             return response;
//         } catch (error: any) {
//             if (error.code === "P2002") {
//                 return {
//                     error: `This ${key} is already taken`,
//                 };
//             } else {
//                 return {
//                     error: error.message,
//                 };
//             }
//         }
//     },
// );

export const deleteSite = withSiteAuth(async (_: FormDataType, site: Site) => {
    try {
        const response = await prisma.site.delete({
            where: {
                id: site.id,
            },
        });
        await revalidateTag(
            `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
        );
        response.customDomain &&
            (await revalidateTag(`${site.customDomain}-metadata`));
        return response;
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
});

export const getSiteFromPostId = async (postId: string) => {
    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
        select: {
            siteId: true,
        },
    });
    return post?.siteId;
};

export const createPost = withSiteAuth(async (_: FormDataType, site: Site) => {
    const session = await getSession();
    if (!session?.user.id) {
        return {
            error: "Not authenticated",
        };
    }
    const response = await prisma.post.create({
        data: {
            siteId: site.id,
            userId: session.user.id,
        },
    });

    await revalidateTag(
        `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
    );
    site.customDomain && (await revalidateTag(`${site.customDomain}-posts`));

    return response;
});

// creating a separate function for this because we're not using FormDataType
export const updatePost = async (data: Post) => {
    const session = await getSession();
    if (!session?.user.id) {
        return {
            error: "Not authenticated",
        };
    }
    const post = await prisma.post.findUnique({
        where: {
            id: data.id,
        },
        include: {
            site: true,
        },
    });
    if (!post || post.userId !== session.user.id) {
        return {
            error: "Post not found",
        };
    }
    try {
        const response = await prisma.post.update({
            where: {
                id: data.id,
            },
            data: {
                title: data.title,
                description: data.description,
                content: data.content,
            },
        });

        await revalidateTag(
            `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
        );
        await revalidateTag(
            `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
        );

        // if the site has a custom domain, we need to revalidate those tags too
        post.site?.customDomain &&
            (await revalidateTag(`${post.site?.customDomain}-posts`),
            await revalidateTag(`${post.site?.customDomain}-${post.slug}`));

        return response;
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
};

export const updatePostMetadata = () => undefined;
// export const updatePostMetadata = withPostAuth(
//     async (
//         formData: FormDataType,
//         post: Post & {
//             site: Site;
//         },
//         key: string,
//     ) => {
//         const value = formData.get(key) as string;

//         try {
//             let response;
//             if (key === "image") {
//                 const file = formData.get("image") as File;
//                 const filename = `${nanoid()}.${file.type.split("/")[1]}`;

//                 const { url } = await put(filename, file, {
//                     access: "public",
//                 });

//                 const blurhash = await getBlurDataURL(url);

//                 response = await prisma.post.update({
//                     where: {
//                         id: post.id,
//                     },
//                     data: {
//                         image: url,
//                         imageBlurhash: blurhash,
//                     },
//                 });
//             } else {
//                 response = await prisma.post.update({
//                     where: {
//                         id: post.id,
//                     },
//                     data: {
//                         [key]: key === "published" ? value === "true" : value,
//                     },
//                 });
//             }

//             await revalidateTag(
//                 `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
//             );
//             await revalidateTag(
//                 `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
//             );

//             // if the site has a custom domain, we need to revalidate those tags too
//             post.site?.customDomain &&
//                 (await revalidateTag(`${post.site?.customDomain}-posts`),
//                 await revalidateTag(`${post.site?.customDomain}-${post.slug}`));

//             return response;
//         } catch (error: any) {
//             if (error.code === "P2002") {
//                 return {
//                     error: `This slug is already in use`,
//                 };
//             } else {
//                 return {
//                     error: error.message,
//                 };
//             }
//         }
//     },
// );

export const deletePost = withPostAuth(async (_: FormDataType, post: Post) => {
    try {
        const response = await prisma.post.delete({
            where: {
                id: post.id,
            },
            select: {
                siteId: true,
            },
        });
        return response;
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
});

export const editUser = async (
    formData: FormData,
    _id: unknown,
    key: string,
) => {
    const session = await getSession();
    if (!session?.user.id) {
        return {
            error: "Not authenticated",
        };
    }
    const value = formData.get(key) as string;

    try {
        const response = await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                [key]: value,
            },
        });
        return response;
    } catch (error: any) {
        if (error.code === "P2002") {
            return {
                error: `This ${key} is already in use`,
            };
        } else {
            return {
                error: error.message,
            };
        }
    }
};
