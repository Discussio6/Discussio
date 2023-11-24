import React from "react";
import UploadsDetail from "./UploadsDetail";
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

async function UploadsPage({ params: { id } }: Props) {
	const session = await getServerSession(authOptions);
	const permission = await db.profilePermission.findUnique({
		where: { userId: id },
		select: { uploads: true },
	});
	if (session?.id !== id && permission?.uploads === "PRIVATE")
		return <Blocking />;

	return (
		<div className="flex flex-col gap-6">
			<div className="text-2xl font-bold">
				<span>Uploads</span>
			</div>
			<UploadsDetail />
		</div>
	);
}

export default UploadsPage;
