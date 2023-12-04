import { QUERY_KEYS } from "@/constants/querykeys";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../api";
import { Discussion, Flashcard, ListResponse, Quiz } from "@/types/schema";

const apiBaseUrl = `/api/search`;


export interface getSearchProps {
    keyword: string;
    page: number;
    count: number;
    orderBy: string;
}
export interface countAndDiscussions {
    count: number;
    data: Discussion[];
}
export interface countAndQuizs {
    count: number;
    data: Quiz[];
}
export interface countAndFlashcards {
    count: number;
    data: Flashcard[];
}
export interface searchResponse {
    discussions: countAndDiscussions
    quizs: countAndQuizs;
    flashcards: countAndFlashcards;
}

export const getSearch = async (params: getSearchProps) => {
    const { data } = await api.get<ListResponse<searchResponse>>(apiBaseUrl, {
        params,
    });
    return data;
};
export const useGetSearch = (
    params: getSearchProps,
    options?: UseQueryOptions<
        ListResponse<searchResponse>,
        AxiosError<any>,
        ListResponse<searchResponse>
    >
) => {
    // check if the keyword is empty
    return useQuery<
        ListResponse<searchResponse>,
        AxiosError<any>,
        ListResponse<searchResponse>
    >([QUERY_KEYS.search.all, params], () => getSearch(params), options);
    
}