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

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        const newUrl = `${basePath}?page=${page}`;
        router.push(newUrl)
    };

    return (
        <ShadcnPagination style={{marginTop: '40px'}}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage - 1);
                        }}
                    />
                </PaginationItem>
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
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage + 1);
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </ShadcnPagination>
    );
};

export default Pagination;
