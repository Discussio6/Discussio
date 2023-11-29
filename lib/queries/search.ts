import { QUERY_KEYS } from "@/constants/querykeys";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface getSearchProps {
    keyword: string;
    page: number;
    count: number;
    orderBy: string;
}
