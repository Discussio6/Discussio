import { redirect } from "next/navigation";
import React from "react";

interface Props {
	params: {
		id: string;
	};
}

function UserDetailPage({ params: { id } }: Props) {
	redirect(`/users/${id}/home`);
	return null;
}

export default UserDetailPage;
