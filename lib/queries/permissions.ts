import { Acl } from "@prisma/client";
import { api } from "../api";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { PermissionResponse, SingleResponse } from "@/types/schema";
import { AxiosError } from "axios";

const apiBaseUrl = `/api/permissions`;

interface postPermisssionProps {
	home: Acl;
	favorites: Acl;
	uploads: Acl;
}

export const postPermissions = async (body: postPermisssionProps) => {
	const { data: res } = await api.post<PermissionResponse>(apiBaseUrl, body);
	return res;
};

export const usePostPermissions = (
	options?: UseMutationOptions<
		PermissionResponse,
		AxiosError<any>,
		postPermisssionProps
	>
) => {
	return useMutation<PermissionResponse, AxiosError<any>, postPermisssionProps>(
		(body) => postPermissions(body),
		options
	);
};
