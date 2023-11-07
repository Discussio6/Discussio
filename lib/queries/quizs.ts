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