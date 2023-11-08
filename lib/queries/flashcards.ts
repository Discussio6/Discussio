import {
	Flashcard,
	FlashcardContent,
	ListResponse,
	SingleResponse,
} from "@/types/schema";
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
import { Acl } from "@prisma/client";

const apiBaseUrl = `/api/flashcards`;
export interface IdSingleProps {
	id: number;
}

export const getFlashcard = async ({ id }: IdSingleProps) => {
	const { data } = await api.get<SingleResponse<Flashcard>>(
		`${apiBaseUrl}/${id}`
	);
	return data;
};

export const useGetFlashcard = (
	id: number,
	options?: UseQueryOptions<
		SingleResponse<Flashcard>,
		AxiosError<any>,
		SingleResponse<Flashcard>
	>
) => {
	return useQuery<
		SingleResponse<Flashcard>,
		AxiosError<any>,
		SingleResponse<Flashcard>
	>(QUERY_KEYS.flashcards.single(id), () => getFlashcard({ id }), options);
};

export interface getFlashcardsProps {
	page?: number;
	count?: number;
	orderBy?: string;
}

export const getFlashcards = async (params: getFlashcardsProps) => {
	const { data } = await api.get<ListResponse<Flashcard>>(`${apiBaseUrl}`, {
		params,
	});
	return data;
};

export const useGetFlashcards = (
	params: getFlashcardsProps = { count: 10, page: 1, orderBy: "cAt:desc" },
	options?: UseQueryOptions<
		ListResponse<Flashcard>,
		AxiosError<any>,
		ListResponse<Flashcard>
	>
) => {
	return useQuery<
		ListResponse<Flashcard>,
		AxiosError<any>,
		ListResponse<Flashcard>
	>(
		[...QUERY_KEYS.flashcards.list, params],
		() => getFlashcards(params),
		options
	);
};

type postContentProps = Pick<
	FlashcardContent,
	"question" | "answer" | "difficulty"
>;

export interface postFlashcardProps {
	name: string;
	description: string;
	acl: Acl;
	tags: string[];
	contents: postContentProps[];
}

export const postFlashcard = async (body: postFlashcardProps) => {
	const { data: res } = await api.post<SingleResponse<Flashcard>>(
		apiBaseUrl,
		body
	);
	return res;
};

export const usePostFlashcard = (
	options?: UseMutationOptions<
		SingleResponse<Flashcard>,
		AxiosError<any>,
		postFlashcardProps
	>
) => {
	const queryClient = useQueryClient();

	return useMutation<
		SingleResponse<Flashcard>,
		AxiosError<any>,
		postFlashcardProps
	>((body) => postFlashcard(body), {
		...options,
		onSuccess(data, variables, context) {
			queryClient.invalidateQueries(QUERY_KEYS.flashcards.list);
			options?.onSuccess?.(data, variables, context);
		},
	});
};

export interface patchFlashcardProps
	extends Partial<postFlashcardProps>,
		IdSingleProps {
	contents: (postContentProps & { id?: number })[];
}

export const patchFlashcard = async (body: patchFlashcardProps) => {
	const { data: res } = await api.patch<SingleResponse<Flashcard>>(
		`${apiBaseUrl}/${body.id}`,
		body
	);
	return res;
};

export const usePatchFlashcard = (
	options?: UseMutationOptions<
		SingleResponse<Flashcard>,
		AxiosError<any>,
		patchFlashcardProps
	>
) => {
	const queryClient = useQueryClient();

	return useMutation<
		SingleResponse<Flashcard>,
		AxiosError<any>,
		patchFlashcardProps
	>((body) => patchFlashcard(body), {
		...options,
		onSuccess(data, variables, context) {
			queryClient.invalidateQueries(QUERY_KEYS.flashcards.single(variables.id));
			queryClient.invalidateQueries(QUERY_KEYS.flashcards.list);
			options?.onSuccess?.(data, variables, context);
		},
	});
};

export const deleteFlashcard = async ({ id }: IdSingleProps) => {
	const { data: res } = await api.delete<SingleResponse<unknown>>(
		`${apiBaseUrl}/${id}`
	);
	return res;
};

export const useDeleteFlashcard = (
	options?: UseMutationOptions<
		SingleResponse<unknown>,
		AxiosError<any>,
		IdSingleProps
	>
) => {
	const queryClient = useQueryClient();

	return useMutation<SingleResponse<unknown>, AxiosError<any>, IdSingleProps>(
		(props) => deleteFlashcard(props),
		{
			...options,
			onSuccess(data, variables, context) {
				queryClient.invalidateQueries(QUERY_KEYS.flashcards.list);
				options?.onSuccess?.(data, variables, context);
			},
		}
	);
};
