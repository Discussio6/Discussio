"use client";

import React from "react";
import Logo from "./common/Logo";
import Profile from "./common/Profile";
import TopSearchBar from "./common/TopSearchBar";

function TopNavbar() {
	return (
		<div className="bg-green h-[60px] flex gap-16 items-center justify-between px-4 relative">
			<Logo />
			<div className="flex flex-1 items-center gap-16">
				<TopSearchBar />
				<div className="flex gap-4 items-center">
					<Profile />
				</div>
			</div>
		</div>
	);
}

export default TopNavbar;
