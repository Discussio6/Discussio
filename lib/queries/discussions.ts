import {
	Discussion,
	LikeResponse,
	ListResponse,
	SingleResponse,
	Tag,
} from "@/types/schema";
import { api } from "../api";
import {
	UseInfiniteQueryOptions,
	UseMutationOptions,
	UseQueryOptions,
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/querykeys";
import { AxiosError } from "axios";

const apiBaseUrl = `/api/discussions`;
export interface IdSingleProps {
	id: number;
}

export const getDiscussion = async ({ id }: IdSingleProps) => {
	const { data } = await api.get<SingleResponse<Discussion>>(
		`${apiBaseUrl}/${id}`
	);
	return data;
};

export const useGetDiscussion = (
	id: number,
	options?: UseQueryOptions<
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
	parent_id?: number;
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
	params: getDiscussionsProps = { count: 10, page: 1, orderBy: "cAt:desc" },
	options?: UseQueryOptions<
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

export const useGetDiscussionsInfinite = (
	params: getDiscussionsProps = { count: 10, page: 1, orderBy: "cAt:desc" },
	options?: UseInfiniteQueryOptions<
		ListResponse<Discussion>,
		AxiosError<any>,
		ListResponse<Discussion>
	>
) => {
	return useInfiniteQuery<
		ListResponse<Discussion>,
		AxiosError<any>,
		ListResponse<Discussion>
	>(QUERY_KEYS.discussions.infinite(params), () => getDiscussions(params), {
		getNextPageParam: (lastPage, allPages) => {
			if (
				lastPage.hits.length + (params.count ?? 10) * (allPages.length - 1) <
				lastPage.total
			) {
				return {
					...params,
					page: (params.page ?? 0) + 1,
				};
			}
			return undefined;
		},
		...options,
	});
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

export const likeDiscussion = async ({ id }: IdSingleProps) => {
	const { data: res } = await api.post<LikeResponse>(
		`${apiBaseUrl}/likes/${id}`
	);
	return res;
};

export const useLikeDiscussion = (
	options?: UseMutationOptions<LikeResponse, AxiosError<any>, IdSingleProps>
) => {
	const queryClient = useQueryClient();

	return useMutation<LikeResponse, AxiosError<any>, IdSingleProps>(
		(props) => likeDiscussion(props),
		{
			...options,
			onSuccess(data, variables, context) {
				queryClient.invalidateQueries(
					QUERY_KEYS.discussions.single(variables.id)
				);
				options?.onSuccess?.(data, variables, context);
			},
		}
	);
};

interface getDiscussionTagsProps {
	keyword?: string;
}

export const getDiscussionTags = async (params: getDiscussionTagsProps) => {
	const { data } = await api.get<ListResponse<Tag>>(`${apiBaseUrl}/tags`, {
		params,
	});
	return data;
};

export const useGetDiscussionTags = (
	params: getDiscussionTagsProps,
	options?: UseQueryOptions<
		ListResponse<Tag>,
		AxiosError<any>,
		ListResponse<Tag>
	>
) => {
	return useQuery<ListResponse<Tag>, AxiosError<any>, ListResponse<Tag>>(
		QUERY_KEYS.discussions.tags(params),
		() => getDiscussionTags(params),
		options
	);
};

export interface postDiscussionTagProps {
	name: string;
	description?: string;
}

export const postDiscussionTag = async (body: postDiscussionTagProps) => {
	const { data: res } = await api.post<SingleResponse<Tag>>(
		`${apiBaseUrl}/tags`,
		body
	);
	return res;
};

export const usePostDiscussionTag = (
	options?: UseMutationOptions<
		SingleResponse<Tag>,
		AxiosError<any>,
		postDiscussionTagProps
	>
) => {
	const queryClient = useQueryClient();

	return useMutation<
		SingleResponse<Tag>,
		AxiosError<any>,
		postDiscussionTagProps
	>((props) => postDiscussionTag(props), {
		...options,
		onSuccess(data, variables, context) {
			queryClient.invalidateQueries(QUERY_KEYS.discussions.tagsAll);
			options?.onSuccess?.(data, variables, context);
		},
	});
};
