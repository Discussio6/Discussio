import Blocking from "@/components/common/Blocking";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

interface Props {
	params: {
		id: string;
	};
}

async function NotificationPage({ params: { id } }: Props) {
	const session = await getServerSession(authOptions);
	if (session?.id !== id) return <Blocking />;

	return <div>NotificationPage</div>;
}

export default NotificationPage;
