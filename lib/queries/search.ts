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

export interface searchResponse {
    total: number;
    discussions: ListResponse<Discussion>
    quizs: ListResponse<Quiz>;
    flashcards: ListResponse<Flashcard>;
}

export const getSearch = async (params: getSearchProps) => {
    const { data } = await api.get<searchResponse>(apiBaseUrl, {
        params,
    });
    return data;
};
export const useGetSearch = (
    params: getSearchProps,
    options?: UseQueryOptions<
        searchResponse,
        AxiosError<any>,
        searchResponse
    >
) => {
    return useQuery<
        searchResponse,
        AxiosError<any>,
        searchResponse
    >(
        [...QUERY_KEYS.search.all, params], 
        () => getSearch(params), 
        { 
            ...options,
            enabled: !!params.keyword // keyword가 비어있지 않을 때만 쿼리를 활성화
        }
    );
}
