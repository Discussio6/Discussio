import React from "react";
import FavoritesDetail from "./FavoritesDetail";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import Blocking from "@/components/common/Blocking";

export const revalidate = 3600;

interface Props {
	params: {
		id: string;
	};
}

async function FavoritesPage({ params: { id } }: Props) {
	const session = await getServerSession(authOptions);
	const permission = await db.profilePermission.findUnique({
		where: { userId: id },
		select: { favorites: true },
	});
	if (session?.id !== id && permission?.favorites === "PRIVATE")
		return <Blocking />;

	return (
		<div className="flex flex-col gap-6">
			<div className="text-2xl font-bold">
				<span>Favorites</span>
			</div>
			<FavoritesDetail />
		</div>
	);
}

export default FavoritesPage;
