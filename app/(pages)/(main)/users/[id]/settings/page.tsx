import React from "react";
import SettingsDetail from "./SettingsDetail";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import Blocking from "@/components/common/Blocking";

interface Props {
	params: {
		id: string;
	};
}

async function SettingsPage({ params: { id } }: Props) {
	const session = await getServerSession(authOptions);
	if (session?.id !== id) return <Blocking />;
	
	const permissions = await db.profilePermission.findUnique({
		where: { userId: session?.id },
		select: { home: true, favorites: true, uploads: true },
	});
	return <SettingsDetail session={session} permissions={permissions} />;
}

export default SettingsPage;
