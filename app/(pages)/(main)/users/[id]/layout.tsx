import React, { ReactNode } from "react";
import MyNavigation from "./UserNavigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface UserDetailPageLayoutProps {
	children: ReactNode;
}

async function UserDetailPageLayout({ children }: UserDetailPageLayoutProps) {
	const session = await getServerSession(authOptions);

	return (
		<div className="flex-col flex lg:flex-row">
			<div className="flex flex-col w-full lg:w-[300px] pt-8">
				<MyNavigation session={session} />
			</div>

			<div className="flex-1 mt-8 px-4">{children}</div>
		</div>
	);
}

export default UserDetailPageLayout;
