import { Discussion, ListResponse, SingleResponse } from "@/types/schema";
import { api } from "../api";
import {
	UseMutationOptions,
	UseQueryOptions,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/querykeys";
import { AxiosError } from "axios";

const apiBaseUrl = `/api/discussions`;
export interface getDiscussionProps {
	id: number;
}

export const getDiscussion = async ({ id }: getDiscussionProps) => {
	const { data } = await api.get<SingleResponse<Discussion>>(
		`${apiBaseUrl}/${id}`
	);
	return data;
};

export const useGetDiscussion = (
	id: number,
	options: UseQueryOptions<
		SingleResponse<Discussion>,
		AxiosError<any>,
		SingleResponse<Discussion>
	>
) => {
	return useQuery<
		SingleResponse<Discussion>,
		AxiosError<any>,
		SingleResponse<Discussion>
	>(QUERY_KEYS.discussions.single(id), () => getDiscussion({ id }), options);
};

export interface getDiscussionsProps {
	page?: number;
	count?: number;
	orderBy?: string;
}

export const getDiscussions = async (params: getDiscussionsProps) => {
	const { data } = await api.get<ListResponse<Discussion>>(`${apiBaseUrl}`, {
		params,
	});
	return data;
};

export const useGetDiscussions = (
	params: getDiscussionsProps = {},
	options: UseQueryOptions<
		ListResponse<Discussion>,
		AxiosError<any>,
		ListResponse<Discussion>
	>
) => {
	return useQuery<
		ListResponse<Discussion>,
		AxiosError<any>,
		ListResponse<Discussion>
	>(QUERY_KEYS.discussions.list(params), () => getDiscussions(params), options);
};

export interface postDiscussionProps {
	body: Pick<Discussion, "title" | "content" | "parent_id">;
}

export const postDiscussion = async ({ body }: postDiscussionProps) => {
	const { data: res } = await api.post<SingleResponse<Discussion>>(
		apiBaseUrl,
		body
	);
	return res;
};

export const usePostDiscussion = (
	options?: UseMutationOptions<
		SingleResponse<Discussion>,
		AxiosError<any>,
		postDiscussionProps["body"]
	>
) => {
	const queryClient = useQueryClient();

	return useMutation<
		SingleResponse<Discussion>,
		AxiosError<any>,
		postDiscussionProps["body"]
	>((body) => postDiscussion({ body }), {
		...options,
		onSuccess(data, variables, context) {
			queryClient.invalidateQueries(QUERY_KEYS.discussions.list({}));
			if (variables.parent_id)
				queryClient.invalidateQueries(
					QUERY_KEYS.discussions.single(variables.parent_id)
				);
			options?.onSuccess?.(data, variables, context);
		},
	});
};
