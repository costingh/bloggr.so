import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { ApiError } from "@/types/api.types";
import { Client, APIErrorCode } from "@notionhq/client";
import prisma from "@/lib/prisma";
import { Site } from "@prisma/client";

export type UserSitesResponse = {
    message?: string;
    sites?: Site[];
};

export async function GET(
    req: NextRequest,
    { params }: { params: { userId: string } },
): Promise<NextResponse<ApiError> | NextResponse<UserSitesResponse>> {
    try {
        if (!params) {
            return NextResponse.json(
                { message: "Empty request params" },
                { status: HttpStatusCode.NoContent },
            );
        }

        const userId = params.userId;
        const limit = params.limit;

        if (!userId) {
            return NextResponse.json(
                { message: "User id is not defined" },
                { status: HttpStatusCode.NoContent },
            );
        }

        const sites = await prisma.site.findMany({
            where: {
                user: {
                    id: userId,
                },
            },
            orderBy: {
                createdAt: "asc",
            },
            ...(limit ? { take: limit } : {}),
        });

        return NextResponse.json(
            { sites },
            { status: HttpStatusCode.Ok },
        );
    } catch (error: any) {
        console.log(error)
        return NextResponse.json(
            { message: "Internal server error" },
            { status: HttpStatusCode.InternalServerError },
        );
    }
}
