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
	isQna?: boolean;
	isAccepted?: boolean;
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
	>(
		[...QUERY_KEYS.discussions.list, params],
		() => getDiscussions(params),
		options
	);
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
	>(
		[...QUERY_KEYS.discussions.infinite, params],
		({ pageParam = params.page }) =>
			getDiscussions({ ...params, page: pageParam }),
		{
			getNextPageParam: (lastPage, allPages) => {
				if (
					lastPage.hits.length + (params.count ?? 10) * (allPages.length - 1) <
					lastPage.total
				) {
					return (params.page ?? 0) + 1;
				}
				return undefined;
			},
			...options,
		}
	);
};

export interface postDiscussionProps
	extends Pick<Discussion, "title" | "content" | "parent_id"> {
	tags: string[];
	isQna?: boolean;
}

export const postDiscussion = async (body: postDiscussionProps) => {
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
		postDiscussionProps
	>
) => {
	const queryClient = useQueryClient();

	return useMutation<
		SingleResponse<Discussion>,
		AxiosError<any>,
		postDiscussionProps
	>((body) => postDiscussion(body), {
		...options,
		onSuccess(data, variables, context) {
			queryClient.invalidateQueries(QUERY_KEYS.discussions.list);
			queryClient.invalidateQueries(QUERY_KEYS.discussions.infinite);
			options?.onSuccess?.(data, variables, context);
		},
	});
};

export interface patchDiscussionProps
	extends Partial<Omit<postDiscussionProps, "parent_id">>,
		IdSingleProps {
	isAccepted?: boolean;
}

export const patchDiscussion = async (body: patchDiscussionProps) => {
	const { data: res } = await api.patch<SingleResponse<Discussion>>(
		`${apiBaseUrl}/${body.id}`,
		body
	);
	return res;
};

export const usePatchDiscussion = (
	options?: UseMutationOptions<
		SingleResponse<Discussion>,
		AxiosError<any>,
		patchDiscussionProps
	>
) => {
	const queryClient = useQueryClient();

	return useMutation<
		SingleResponse<Discussion>,
		AxiosError<any>,
		patchDiscussionProps
	>((body) => patchDiscussion(body), {
		...options,
		onSuccess(data, variables, context) {
			queryClient.invalidateQueries(
				QUERY_KEYS.discussions.single(variables.id)
			);
			queryClient.invalidateQueries(QUERY_KEYS.discussions.list);
			queryClient.invalidateQueries(QUERY_KEYS.discussions.infinite);
			options?.onSuccess?.(data, variables, context);
		},
	});
};

export const deleteDiscussion = async ({ id }: IdSingleProps) => {
	const { data: res } = await api.delete<SingleResponse<unknown>>(
		`${apiBaseUrl}/${id}`
	);
	return res;
};

export const useDeleteDiscussion = (
	options?: UseMutationOptions<
		SingleResponse<unknown>,
		AxiosError<any>,
		IdSingleProps
	>
) => {
	const queryClient = useQueryClient();

	return useMutation<SingleResponse<unknown>, AxiosError<any>, IdSingleProps>(
		(props) => deleteDiscussion(props),
		{
			...options,
			onSuccess(data, variables, context) {
				queryClient.invalidateQueries(QUERY_KEYS.discussions.list);
				queryClient.invalidateQueries(QUERY_KEYS.discussions.infinite);
				options?.onSuccess?.(data, variables, context);
			},
		}
	);
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
				queryClient.invalidateQueries(QUERY_KEYS.discussions.list);
				queryClient.invalidateQueries(QUERY_KEYS.discussions.infinite);
				options?.onSuccess?.(data, variables, context);
			},
		}
	);
};

interface accepetDiscussionProps extends IdSingleProps {
	parent_id: number;
}

export const acceptDiscussion = async (body: accepetDiscussionProps) => {
	const { data: res } = await api.post<SingleResponse<unknown>>(
		`${apiBaseUrl}/accept`,
		body
	);
	return res;
};

export const useAcceptDiscussion = (
	options?: UseMutationOptions<
		SingleResponse<unknown>,
		AxiosError<any>,
		accepetDiscussionProps
	>
) => {
	const queryClient = useQueryClient();

	return useMutation<
		SingleResponse<unknown>,
		AxiosError<any>,
		accepetDiscussionProps
	>((props) => acceptDiscussion(props), {
		...options,
		onSuccess(data, variables, context) {
			queryClient.invalidateQueries(
				QUERY_KEYS.discussions.single(variables.id)
			);
			queryClient.invalidateQueries(
				QUERY_KEYS.discussions.single(variables.parent_id)
			);
			queryClient.invalidateQueries(QUERY_KEYS.discussions.list);
			queryClient.invalidateQueries(QUERY_KEYS.discussions.infinite);
			options?.onSuccess?.(data, variables, context);
		},
	});
};
