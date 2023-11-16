import { SingleResponse } from "@/types/schema";
import { CreatePageResponse } from "@notionhq/client/build/src/api-endpoints";
import { api } from "../api";

const apiBaseUrl = `/api/notion/db`;

export interface postReportProps {
	title: string;
	description: string;
	type: "Questions" | "Discussions" | "Quizzes" | "Flashcards" | "Comments";
	endpoint: string;
}

export const postComment = async (body: postReportProps) => {
	const { data: res } = await api.post<SingleResponse<CreatePageResponse>>(
		apiBaseUrl,
		body
	);
	return res;
};
