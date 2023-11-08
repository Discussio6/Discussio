import { ListResponse, SingleResponse, Tag } from "@/types/schema";
import { api } from "../api";
import {
	useMutation,
	UseMutationOptions,
	UseQueryOptions,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QUERY_KEYS } from "@/constants/querykeys";

const apiBaseUrl = `/tags`;

interface getTagProps {
	keyword?: string;
}

export const getTags = async (params: getTagProps) => {
	const { data } = await api.get<ListResponse<Tag>>(apiBaseUrl, {
		params,
	});
	return data;
};

export const useGetTags = (
	params: getTagProps,
	options?: UseQueryOptions<
		ListResponse<Tag>,
		AxiosError<any>,
		ListResponse<Tag>
	>
) => {
	return useQuery<ListResponse<Tag>, AxiosError<any>, ListResponse<Tag>>(
		[...QUERY_KEYS.tags, params],
		() => getTags(params),
		options
	);
};

export interface postTagProps {
	name: string;
	description?: string;
}

export const postTag = async (body: postTagProps) => {
	const { data: res } = await api.post<SingleResponse<Tag>>(
		`${apiBaseUrl}/tags`,
		body
	);
	return res;
};

export const usePostTag = (
	options?: UseMutationOptions<
		SingleResponse<Tag>,
		AxiosError<any>,
		postTagProps
	>
) => {
	const queryClient = useQueryClient();

	return useMutation<SingleResponse<Tag>, AxiosError<any>, postTagProps>(
		(props) => postTag(props),
		{
			...options,
			onSuccess(data, variables, context) {
				queryClient.invalidateQueries(QUERY_KEYS.tags);
				options?.onSuccess?.(data, variables, context);
			},
		}
	);
};
