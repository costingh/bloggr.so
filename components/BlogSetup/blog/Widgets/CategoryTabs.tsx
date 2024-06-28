'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { Flex, Box, Text } from "@chakra-ui/react";
import { useColorModeValues } from "@/lib/hooks/useColorModeValues";

type CategoryTabsProps = {
    basePath?: string
    activeCategory?: string
}

function CategoryTabs({basePath, activeCategory} : CategoryTabsProps) {
    const [activeTab, setActiveTab] = useState('');
    const tabs = ["All Categories", "General", "Guide", "Payout"];
    const { secondaryTextColor, borderColor, primaryTextColor, baseTextColor } = useColorModeValues();

    const router = useRouter()

    useEffect(() => {
        activeTab && handleCategoryChange(activeTab)
    }, [activeTab])

    const handleCategoryChange = (category: string) => {
        router.push(`?category=${category}`)
    };

    return (
         <div className="flex space-x-4 mb-[50px]">
            {tabs.map((tab) => (
                <Box
                    key={tab}
                    borderColor={baseTextColor[400]}
                    className={`cursor-pointer rounded-full px-[12px] py-[5px] transition hover:bg-gray-300 border-[1px]`}
                    background={activeCategory?.toLocaleLowerCase() == tab?.toLocaleLowerCase() ? baseTextColor[400] : ''}
                    onClick={() => setActiveTab(tab == 'All Categories' ? '' : tab)}
                >
                    <Text fontSize="15px" color={primaryTextColor}>{tab}</Text>
                </Box>
            ))}
        </div>
    );
}

export default CategoryTabs;
