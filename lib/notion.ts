import { Client } from "@notionhq/client";

declare global {
  var notion: Client | undefined;
};

export const notion = globalThis.notion || new Client({ auth: process.env.NOTION_API_KEY });

if (process.env.NODE_ENV !== "production") globalThis.notion = notion