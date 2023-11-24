import {
	Discussion,
	LikeResponse,
	ListResponse,
	SingleResponse,
	Tag,
	User,
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

const apiBaseUrl = `/api/users`;
export interface IdSingleProps {
	id: number;
}

export const getUser = async ({ id }: IdSingleProps) => {
	const { data } = await api.get<SingleResponse<User>>(`${apiBaseUrl}/${id}`);
	return data;
};

export const useGetUser = (
	id: number,
	options?: UseQueryOptions<
		SingleResponse<User>,
		AxiosError<any>,
		SingleResponse<User>
	>
) => {
	return useQuery<SingleResponse<User>, AxiosError<any>, SingleResponse<User>>(
		QUERY_KEYS.users.single(id),
		() => getUser({ id }),
		options
	);
};

export interface patchUserProps {
	id: string;
	name: string;
	email: string;
	image: string;
}

export interface patchUserResponse {
	success: boolean;
	data: User;
}

export const patchUser = async (body: patchUserProps) => {
	const { id, ...others } = body;
	const { data: res } = await api.patch<patchUserResponse>(
		`${apiBaseUrl}/${id}`,
		others
	);
	return res;
};

export const usePatchUser = (
	options?: UseMutationOptions<
		patchUserResponse,
		AxiosError<any>,
		patchUserProps
	>
) => {
	return useMutation<patchUserResponse, AxiosError<any>, patchUserProps>(
		(body) => patchUser(body),
		options
	);
};
