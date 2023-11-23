"use client";

import React from "react";
import Logo from "./common/Logo";
import Profile from "./common/Profile";

function TopNavbar() {
	return (
		<div className="bg-green h-[60px] flex items-center justify-between px-4 relative">
			<Logo />
			<div className="flex gap-4 items-center">
				<Profile />
			</div>
		</div>
	);
}

export default TopNavbar;
