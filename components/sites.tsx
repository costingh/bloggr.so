"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import SiteCard from "./site-card";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Site } from "@prisma/client";
import { UserSitesResponse } from "@/app/api/sites/get-user-sites/[userId]/route";
import { useColorModeValue, Spinner } from "@chakra-ui/react";

const Sites = ({ limit }: { limit?: number }) => {
    const [sitesList, setSitesList] = useState<Site[]>([]);
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    const spinnerColor = useColorModeValue("blackAlpha.300", "whiteAlpha.300");

    // if (!session) {
    //     redirect("/login");
    // }

    useEffect(() => {
        const fetchUserSites = async () => {
            setLoading(true);
            const response = await axios.get<UserSitesResponse>(
                `/api/sites/get-user-sites/${session?.user?.id}`,
            );
            console.log(response?.data?.sites);
            setSitesList(response?.data?.sites || []);
            setLoading(false);
        };

        session?.user?.id && fetchUserSites();
    }, [session]);

    return (
        <>
            {loading ? (
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        height: "100%",
                        alignItems: "center",
                    }}
                >
                    <Spinner color={spinnerColor} />
                </div>
            ) : sitesList.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {sitesList.map((site) => (
                        <SiteCard key={site.id} data={site} />
                    ))}
                </div>
            ) : (
                <div className="mt-20 flex flex-col items-center space-x-4">
                    <h1 className="font-cal text-4xl">No Sites Yet</h1>
                    <Image
                        alt="missing site"
                        src="https://illustrations.popsy.co/gray/web-design.svg"
                        width={400}
                        height={400}
                    />
                    <p className="text-lg text-stone-500">
                        You do not have any sites yet. Create one to get
                        started.
                    </p>
                </div>
            )}
        </>
    );
};

export default Sites;
