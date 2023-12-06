"use client";

import React from "react";
import Logo from "./common/Logo";
import Profile from "./common/Profile";
import TopSearchBar from "./common/TopSearchBar";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";
import { usePathname } from "next/navigation";

function TopNavbar() {
	const [open, setOpen] = React.useState(false);

	return (
		<div className="bg-green h-[60px] flex gap-16 items-center justify-between px-4 relative">
			<Logo />
			<div className="md:flex flex-1 items-center gap-16 hidden">
				<TopSearchBar />
				<div className="flex gap-4 items-center shrink-0">
					<Profile />
				</div>
			</div>
			<div className="md:hidden block">
				<Sheet open={open} onOpenChange={setOpen}>
					<SheetTrigger asChild>
						<Button
							size="icon"
							variant="primary"
							onClick={() => setOpen((open) => !open)}
						>
							<MenuIcon />
						</Button>
					</SheetTrigger>
					<SheetContent side="top" className="bg-green border-transparent">
						<SheetHeader>
							<SheetTitle className="text-white font-bold">
								Discussio
							</SheetTitle>
						</SheetHeader>
						<div className="flex flex-col gap-4 mt-4">
							<TopSearchBar onSearchCallback={() => setOpen(false)} />
							<div className="flex gap-4 items-center shrink-0 self-end">
								<Profile onClickCallback={() => setOpen(false)} />
							</div>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
}

export default TopNavbar;
