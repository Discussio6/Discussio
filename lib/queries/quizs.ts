import { Quiz, SingleResponse } from "@/types/schema";
import { api } from "../api";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QUERY_KEYS } from "@/constants/querykeys";


interface IdSingleProps {
    id: number;
}
const BaseURL = '/api/quizs';
export const getQuiz = async ({ id }: IdSingleProps) => {
    const { data } = await api.get<SingleResponse<Quiz>>(`${BaseURL}/${id}`);
    return data;
}
export const useGetQuiz = (id: number,
    options: UseQueryOptions<SingleResponse<Quiz>, AxiosError<any>, SingleResponse<Quiz>>
    ) => {
    return useQuery<
    SingleResponse<Quiz>, 
    AxiosError<any>, 
    SingleResponse<Quiz>
    >
    (QUERY_KEYS.quizs.single(id), () => getQuiz({ id }), options);
}
export interface getQuizsProps {
    count?: number;
    orderBy?: string;
    category?: string;
    page?: number;
    searchword?: string;
}
export const getQuizs = async (params: getQuizsProps) => {
    const { data } = await api.get<SingleResponse<Quiz>>(`${BaseURL}`, {
        params,
    });
    return data;
}
export const useGetQuizs = (
    params: getQuizsProps,
    options: UseQueryOptions<SingleResponse<Quiz>, AxiosError<any>, SingleResponse<Quiz>>
    ) => {
    return useQuery<
    SingleResponse<Quiz>, 
    AxiosError<any>, 
    SingleResponse<Quiz>
    >
    ([...QUERY_KEYS.quizs.list, params], () => getQuizs(params), options);
}
export interface postQuizProps {
    quiz_name: string;
    quiz_description: string;
    category: string;
    acl: string;
    Tags: string[];
}