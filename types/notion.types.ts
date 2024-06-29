export type NotionUser = {
    object: string;
    id: string;
}

export type NotionParent = {
    type: string;
    database_id: string;
}

export type NotionProperty = {
    [key: string]: any;
}

export type NotionPost = {
    object: string;
    id: string;
    created_time: string;
    last_edited_time: string;
    created_by: NotionUser;
    last_edited_by: NotionUser;
    cover: any; 
    icon: any;
    parent: NotionParent;
    archived: boolean;
    in_trash: boolean;
    properties: NotionProperty;
    url: string;
    public_url: any; 
}

export type NotionQuery = {
    database_id : string;
    filter?: any;
    sorts?: any;
    page_size?: number;
}