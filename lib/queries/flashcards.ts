import {
	Flashcard,
	FlashcardContent,
	FlashcardParticipant,
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
import { Acl, FlashcardAnswerStatus } from "@prisma/client";

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

export const getFlashcardParticipants = async (
	id: number,
	params: getFlashcardParticipantsProps
) => {
	const { data } = await api.get<ListResponse<FlashcardParticipant>>(
		`${apiBaseUrl}/result/${id}`,
		{
			params,
		}
	);
	return data;
};

export interface getFlashcardParticipantsProps {
	page?: number;
	count?: number;
	orderBy?: string;
}

export const useGetFlashcardParticipants = (
	id: number,
	params: getFlashcardParticipantsProps = {
		count: 10,
		page: 1,
		orderBy: "cAt:desc",
	},
	options?: UseQueryOptions<
		ListResponse<FlashcardParticipant>,
		AxiosError<any>,
		ListResponse<FlashcardParticipant>
	>
) => {
	return useQuery<
		ListResponse<FlashcardParticipant>,
		AxiosError<any>,
		ListResponse<FlashcardParticipant>
	>(
		[...QUERY_KEYS.flashcards.participants(id), params],
		() => getFlashcardParticipants(id, params),
		options
	);
};

export interface postAnswerProps {
	id: number;
	status: FlashcardAnswerStatus;
}

export interface postFlashcardParticipantProps {
	card_id: number;
	contents: postAnswerProps[];
}

export const postFlashcardParticipant = async (
	body: postFlashcardParticipantProps
) => {
	const { data: res } = await api.post<SingleResponse<FlashcardParticipant>>(
		`${apiBaseUrl}/result/${body.card_id}`,
		body
	);
	return res;
};

export const usePostFlashcardParticipant = (
	options?: UseMutationOptions<
		SingleResponse<FlashcardParticipant>,
		AxiosError<any>,
		postFlashcardParticipantProps
	>
) => {
	const queryClient = useQueryClient();

	return useMutation<
		SingleResponse<FlashcardParticipant>,
		AxiosError<any>,
		postFlashcardParticipantProps
	>((body) => postFlashcardParticipant(body), {
		...options,
		onSuccess(data, variables, context) {
			queryClient.invalidateQueries(QUERY_KEYS.flashcards.list);
			options?.onSuccess?.(data, variables, context);
		},
	});
};
