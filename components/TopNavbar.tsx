"use client";

import React from "react";
import Logo from "./common/Logo";
import Profile from "./common/Profile";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

function TopNavbar() {
	const { status } = useSession();
	return (
		<div className="bg-green h-[60px] flex items-center justify-between px-4 relative">
			<Logo />
			<div className="flex gap-4 items-center">
				{status === "authenticated" && (
					<Button variant="primary">업로드</Button>
				)}
				<Profile />
			</div>
		</div>
	);
}

export default TopNavbar;
