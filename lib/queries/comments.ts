import { Comment } from "@/types/schema";
import { QUERY_KEYS } from "@/constants/querykeys";
import { ListResponse, SingleResponse } from "@/types/schema";
import {
	UseInfiniteQueryOptions,
	useInfiniteQuery,
	UseQueryOptions,
	useQuery,
	useMutation,
	UseMutationOptions,
	useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../api";

const apiBaseUrl = `/api/comments`;
export interface IdSingleProps {
	id: number;
}

export const getComment = async ({ id }: IdSingleProps) => {
	const { data } = await api.get<SingleResponse<Comment>>(
		`${apiBaseUrl}/${id}`
	);
	return data;
};

export const useGetComment = (
	id: number,
	options?: UseQueryOptions<
		SingleResponse<Comment>,
		AxiosError<any>,
		SingleResponse<Comment>
	>
) => {
	return useQuery<
		SingleResponse<Comment>,
		AxiosError<any>,
		SingleResponse<Comment>
	>(QUERY_KEYS.comments.single(id), () => getComment({ id }), options);
};

export interface getCommentsProps {
	parent_comment_id?: number | null;
	content_id?: number;
	page?: number;
	count?: number;
	orderBy?: string;
}

export const getComments = async (params: getCommentsProps) => {
	const { data } = await api.get<ListResponse<Comment>>(
		`${apiBaseUrl}?${new URLSearchParams(params as any).toString()}`
	);
	return data;
};

export const useGetComments = (
	params: getCommentsProps = { count: 10, page: 1, orderBy: "cAt:desc" },
	options?: UseQueryOptions<
		ListResponse<Comment>,
		AxiosError<any>,
		ListResponse<Comment>
	>
) => {
	return useQuery<
		ListResponse<Comment>,
		AxiosError<any>,
		ListResponse<Comment>
	>([...QUERY_KEYS.comments.list, params], () => getComments(params), options);
};

export const useGetCommentsInfinite = (
	params: getCommentsProps = { count: 10, page: 1, orderBy: "cAt:desc" },
	options?: UseInfiniteQueryOptions<
		ListResponse<Comment>,
		AxiosError<any>,
		ListResponse<Comment>
	>
) => {
	return useInfiniteQuery<
		ListResponse<Comment>,
		AxiosError<any>,
		ListResponse<Comment>
	>([...QUERY_KEYS.comments.infinite, params], () => getComments(params), {
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

export interface postCommentProps {
	comment: string;
	content_id: number;
	parent_comment_id?: number | null;
}

export const postComment = async (body: postCommentProps) => {
	const { data: res } = await api.post<SingleResponse<Comment>>(
		apiBaseUrl,
		body
	);
	return res;
};

export const usePostComment = (
	options?: UseMutationOptions<
		SingleResponse<Comment>,
		AxiosError<any>,
		postCommentProps
	>
) => {
	const queryClient = useQueryClient();

	return useMutation<
		SingleResponse<Comment>,
		AxiosError<any>,
		postCommentProps
	>((body) => postComment(body), {
		...options,
		onSuccess(data, variables, context) {
			queryClient.invalidateQueries(QUERY_KEYS.comments.list);
			queryClient.invalidateQueries(QUERY_KEYS.comments.infinite);
			options?.onSuccess?.(data, variables, context);
		},
	});
};

export interface patchCommentProps extends IdSingleProps {
	comment: string;
}

export const patchComment = async (body: patchCommentProps) => {
	const { data: res } = await api.patch<SingleResponse<Comment>>(
		`${apiBaseUrl}/${body.id}`,
		body
	);
	return res;
};

export const usePatchComment = (
	options?: UseMutationOptions<
		SingleResponse<Comment>,
		AxiosError<any>,
		patchCommentProps
	>
) => {
	const queryClient = useQueryClient();

	return useMutation<
		SingleResponse<Comment>,
		AxiosError<any>,
		patchCommentProps
	>((body) => patchComment(body), {
		...options,
		onSuccess(data, variables, context) {
			queryClient.invalidateQueries(QUERY_KEYS.comments.single(variables.id));
			queryClient.invalidateQueries(QUERY_KEYS.comments.list);
			queryClient.invalidateQueries(QUERY_KEYS.comments.infinite);
			options?.onSuccess?.(data, variables, context);
		},
	});
};

export const deleteComment = async ({ id }: IdSingleProps) => {
	const { data: res } = await api.delete<SingleResponse<unknown>>(
		`${apiBaseUrl}/${id}`
	);
	return res;
};

export const useDeleteComment = (
	options?: UseMutationOptions<
		SingleResponse<unknown>,
		AxiosError<any>,
		IdSingleProps
	>
) => {
	const queryClient = useQueryClient();

	return useMutation<SingleResponse<unknown>, AxiosError<any>, IdSingleProps>(
		(props) => deleteComment(props),
		{
			...options,
			onSuccess(data, variables, context) {
				queryClient.invalidateQueries(QUERY_KEYS.comments.list);
				queryClient.invalidateQueries(QUERY_KEYS.comments.infinite);
				options?.onSuccess?.(data, variables, context);
			},
		}
	);
};
