import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import PostCard from "./post-card";
import Image from "next/image";
import { Client, APIErrorCode } from "@notionhq/client";
import axios from "axios";
import { GetDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

const extractIdFromUrl = (url: string): string => {
  const pattern = /([a-fA-F0-9]{32})/;
  const match = url.match(pattern);
  if (match) {
    return match[1];
  } else {
    return "";
  }
};

export default async function Posts({
  siteId,
  limit,
}: {
  siteId?: string;
  limit?: number;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }
  const site = await prisma.site.findFirst({
    where: {
      userId: session.user.id as string,
      ...(siteId ? { id: siteId } : {}),
    },
    include: {
      mapping: true,
    },
  });

  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  if(!site?.postsDatabaseId) {
    redirect("/login"); 
  }

  const data = await notion.databases.query({
    database_id: extractIdFromUrl(site?.postsDatabaseId || ""),
  });

  const posts = data?.results || [];

  return posts.length > 0 ? (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {posts.map((post) => (
              <PostCard key={post.id} post={post} site={site} />
          ))}
      </div>
  ) : (
      <div className="flex flex-col items-center space-x-4">
          <h1 className="font-cal text-4xl">No Posts Yet</h1>
          <p className="text-lg text-stone-500">
              You do not have any posts yet. Create one to get started.
          </p>
      </div>
  );
}
