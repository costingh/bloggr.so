'use client'

import React from "react";
import { useRouter } from 'next/navigation'
import {
    Pagination as ShadcnPagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useColorModeValues } from "@/lib/hooks/useColorModeValues";
import { Box } from "@chakra-ui/react";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    basePath: string;
}

const Pagination: React.FC<PaginationProps> = ({
    totalPages,
    currentPage,
    basePath,
}) => {
    const router = useRouter()
    const { secondaryTextColor, borderColor } = useColorModeValues();

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        const newUrl = `${basePath}?page=${page}`;
        router.push(newUrl)
    };

    return (
        <Box 
            borderTop="1px solid gray"
            borderColor={borderColor}
            style={{marginTop: '40px'}}
        >
            <ShadcnPagination style={{marginTop: '15px', width: '100%'}}>
                <PaginationContent style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <PaginationItem>
                        <Box
                            border="1px solid gray"
                            borderRadius='8px'
                            borderColor={borderColor}
                        >
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(currentPage - 1);
                                }}
                            />
                        </Box>
                    </PaginationItem>
                    <div>
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    isActive={index + 1 === currentPage}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(index + 1);
                                    }}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        {totalPages > 5 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                    </div>
                    <PaginationItem>
                        <Box
                            border="1px solid gray"
                            borderRadius='8px'
                            borderColor={borderColor}
                        >
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(currentPage + 1);
                                }}
                            />
                        </Box>
                    </PaginationItem>
                </PaginationContent>
            </ShadcnPagination>
        </Box>
    );
};

export default Pagination;
