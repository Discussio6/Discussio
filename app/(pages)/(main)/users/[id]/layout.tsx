import React, { ReactNode } from "react";
import MyNavigation from "./UserNavigation";
import { Metadata, ResolvingMetadata } from "next";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface Props {
	params: {
		id: string;
	};
}

interface UserDetailPageLayoutProps extends Props {
	children: ReactNode;
}

async function UserDetailPageLayout({
	children,
	params: { id },
}: UserDetailPageLayoutProps) {
	const session = await getServerSession(authOptions);

	return (
		<div className="flex-col flex lg:flex-row">
			<div className="flex flex-col w-full lg:w-[300px] pt-8">
				<MyNavigation userId={id} sessionId={session?.id} />
			</div>

			<div className="flex-1 my-8 px-4">{children}</div>
		</div>
	);
}

export default UserDetailPageLayout;

export async function generateMetadata(
	{ params: { id } }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const user = await db.user.findUnique({
		where: { id },
		select: { name: true },
	});

	return {
		title: `${user?.name} | Discussio`,
	};
}
