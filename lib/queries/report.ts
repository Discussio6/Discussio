import { SingleResponse } from "@/types/schema";
import { CreatePageResponse } from "@notionhq/client/build/src/api-endpoints";
import { api } from "../api";
import { REPORT_TYPES } from "@/constants/data";

const apiBaseUrl = `/api/notion/db`;

export interface postReportProps {
	title: string;
	description: string;
	type: typeof REPORT_TYPES[number];
	endpoint: string;
	json?: string;
}

export const postReport = async (body: postReportProps) => {
	const { data: res } = await api.post<SingleResponse<CreatePageResponse>>(
		apiBaseUrl,
		body
	);
	return res;
};
