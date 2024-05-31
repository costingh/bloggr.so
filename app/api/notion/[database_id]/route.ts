import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { ApiError } from "@/types/api.types";
import { Client, APIErrorCode } from "@notionhq/client";

type DataType = {
    id: string;
    object: string;
    created_time: string;
    last_edited_time: string;
    created_by: any;
    last_edited_by: any;
    cover: string;
    icon: string;
    archived: boolean;
    in_trash: false;
    url: string;
    public_url: string;
}[];

export type GetDatabaseResponse = {
    data?: DataType;
    message?: string;
    databaseInfo?: any;
};

export async function GET(
    req: NextRequest,
    { params }: { params: { database_id: string } },
): Promise<NextResponse<ApiError> | NextResponse<GetDatabaseResponse>> {
    try {
        const database_id = params.database_id;

        if (!database_id) {
            return NextResponse.json(
                { message: "Database id could not be extrcted" },
                { status: HttpStatusCode.NoContent },
            );
        }
        const notion = new Client({ auth: process.env.NOTION_TOKEN });
        // const pages = await notion.databases.query({
        // 	database_id,
        // })

        // console.log(pages)

        // const data = pages?.results?.map((page : any) => ({
        // 	id: page.id,
        // 	object: page.object,
        // 	created_time: page.created_time,
        // 	last_edited_time: page.last_edited_time,
        // 	created_by: page.created_by,
        // 	last_edited_by: page.last_edited_by,
        // 	cover: page.cover || "",
        // 	icon: page.icon || "",
        // 	archived: page.archived,
        // 	in_trash: page.in_trash,
        // 	url: page.url,
        // 	public_url: page.public_url || ""
        // })) || [];

        const databaseInfo = await notion.databases.retrieve({
            database_id,
        });

        return NextResponse.json(
            { databaseInfo },
            { status: HttpStatusCode.Ok },
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: HttpStatusCode.InternalServerError },
        );
    }
}
