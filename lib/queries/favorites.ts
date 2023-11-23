import {
	Discussion,
	Flashcard,
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

const apiBaseUrl = `/api/favorites`;

export interface IdSingleProps {
	id: number;
}

interface getDiscussionFavoritesProps {
	count?: number;
	page?: number;
	userId: string;
	orderBy?: string;
}

export const getDiscussionFavorites = async (
	params: getDiscussionFavoritesProps
) => {
	const { data } = await api.get<ListResponse<Discussion>>(
		`${apiBaseUrl}/discussions/view`,
		{
			params,
		}
	);
	return data;
};

export const useGetDiscussions = (
	params: getDiscussionFavoritesProps,
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
		[...QUERY_KEYS.favorites.discussions.list(params.userId), params],
		() => getDiscussionFavorites(params),
		options
	);
};

interface getFlashcardFavoritesProps {
	count?: number;
	page?: number;
	userId: string;
	orderBy?: string;
}

export const getFlashcardFavorites = async (
	params: getFlashcardFavoritesProps
) => {
	const { data } = await api.get<ListResponse<Flashcard>>(
		`${apiBaseUrl}/flashcards/view`,
		{
			params,
		}
	);
	return data;
};

export const useGetFlashcardFavorites = (
	params: getFlashcardFavoritesProps,
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
		[...QUERY_KEYS.favorites.discussions.list(params.userId), params],
		() => getFlashcardFavorites(params),
		options
	);
};
