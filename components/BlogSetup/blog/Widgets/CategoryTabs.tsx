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
    const tabs = [
        {
            name: "All Categories",
            filter: ''
        },
        {
            name: "General",
            filter: 'General'
        },
        {
            name: "Guide",
            filter: 'Guide'
        },
        {
            name: "Payout",
            filter: 'Payout'
        },
    ];

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
            {tabs.map((tab, index) => (
                <Flex
                    key={tab.name}
                    className={`cursor-pointer `}
                    background={activeCategory?.toLocaleLowerCase() == tab?.filter?.toLocaleLowerCase() ? baseTextColor[400] : ''}
                    onClick={() => setActiveTab(tab.filter)}
                >
                    <Text fontSize="16px" className={`${activeTab == tab.filter && 'font-[600]'}`} color={activeTab == tab.filter ? primaryTextColor : secondaryTextColor}>{tab.name}</Text>
                    {index != tabs.length - 1 && <Box className="slash ml-[15px]" bgColor={baseTextColor[400]} style={{width: '1px', height: '20px', transform: 'rotate(15deg)'}}></Box>}
                </Flex>
            ))}
        </div>
    );
}

export default CategoryTabs;
