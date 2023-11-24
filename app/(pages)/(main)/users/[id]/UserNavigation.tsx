"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	BellIcon,
	HeartFilledIcon,
	HomeIcon,
	UploadIcon,
} from "@radix-ui/react-icons";
import { SettingsIcon } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface UserNavigationProps {
	userId: string;
	sessionId: string | undefined;
}

function UserNavigation({ userId, sessionId }: UserNavigationProps) {
	const pathname = usePathname();
	const target = pathname.split("/").pop();

	return (
		<div className="w-full flex flex-col gap-1">
			<div className="flex flex-col">
				<Link
					href={`/users/${userId}/home`}
					className={`${target === "home" ? "text-blue-500" : ""}`}
				>
					<Button
						variant="ghost"
						className="w-full flex gap-2 justify-start items-center"
					>
						<HomeIcon className="w-4 h-4" />
						Home
					</Button>
				</Link>
				<Link
					href={`/users/${userId}/favorites`}
					className={`${target === "favorites" ? "text-blue-500" : ""}`}
				>
					<Button
						variant="ghost"
						className="w-full flex gap-2 justify-start items-center"
					>
						<HeartFilledIcon className="w-4 h-4" />
						Favorites
					</Button>
				</Link>

				<Link
					href={`/users/${userId}/uploads`}
					className={`${target === "uploads" ? "text-blue-500" : ""}`}
				>
					<Button
						variant="ghost"
						className="w-full flex gap-2 justify-start items-center"
					>
						<UploadIcon className="w-4 h-4" />
						Uploads
					</Button>
				</Link>
			</div>
			{sessionId === userId && (
				<>
					<Separator />
					<div className="flex flex-col">
						{/* <Link
							href={`/users/${userId}/notifications`}
							className={`${target === "notifications" ? "text-blue-500" : ""}`}
						>
							<Button
								variant="ghost"
								className="w-full flex gap-1 justify-start"
							>
								<BellIcon className="w-4 h-4" />
								Notifications
							</Button>
						</Link> */}
						<Link
							href={`/users/${userId}/settings`}
							className={`${target === "settings" ? "text-blue-500" : ""}`}
						>
							<Button
								variant="ghost"
								className="w-full flex gap-1 justify-start"
							>
								<SettingsIcon className="w-4 h-4" />
								Settings
							</Button>
						</Link>
					</div>
				</>
			)}
		</div>
	);
}

export default UserNavigation;
