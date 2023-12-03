import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import {
	LogOutIcon,
	MessageSquareIcon,
	SettingsIcon,
	BellIcon,
	ReplyIcon,
	RectangleHorizontalIcon,
	BookIcon,
} from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import {
	HeartFilledIcon,
	HeartIcon,
	HomeIcon,
	PaperPlaneIcon,
	QuestionMarkCircledIcon,
	UploadIcon,
} from "@radix-ui/react-icons";

export const ProfileImage = React.forwardRef<HTMLSpanElement, {}>((_, ref) => {
	const { data: session } = useSession();
	return (
		<Avatar ref={ref} className="w-full h-full">
			<AvatarImage src={session?.user?.image || ""} />
			<AvatarFallback>{session?.user?.name?.[0]?.toUpperCase()}</AvatarFallback>
		</Avatar>
	);
});

function Profile() {
	const { data: session, status } = useSession();
	const [open, setOpen] = useState(false);

	if (status === "loading")
		return (
			<div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse" />
		);
	if (status === "unauthenticated")
		return (
			<Button variant="primary" onClick={() => signIn()}>
				Sign in
			</Button>
		);

	const userId = session?.id;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild className="cursor-pointer">
				<div className="w-10 h-10">
					<ProfileImage />
				</div>
			</PopoverTrigger>
			<PopoverContent className="flex flex-col m-2 gap-1">
				<header className="flex gap-2 items-center mb-2">
					<div className="w-12 h-12">
						<ProfileImage />
					</div>
					<div className="flex flex-col justify-center">
						<h3 className="text-md font-bold">{session?.user?.name}</h3>
						<p className="text-slate-500 text-xs">{session?.user?.email}</p>
					</div>
				</header>
				<Separator />
				<article className="w-full flex flex-col gap-1">
					<div className="flex flex-col">
						<Link href={`/users/${userId}/home`}>
							<Button
								variant="ghost"
								className="w-full flex gap-2 justify-start items-center"
								onClick={() => setOpen(false)}
							>
								<HomeIcon className="w-4 h-4" />
								Home
							</Button>
						</Link>
						<Link href={`/users/${userId}/favorites`}>
							<Button
								variant="ghost"
								className="w-full flex gap-2 justify-start items-center"
								onClick={() => setOpen(false)}
							>
								<HeartFilledIcon className="w-4 h-4" />
								Favorites
							</Button>
						</Link>
						<Link href={`/users/${userId}/uploads`}>
							<Button
								variant="ghost"
								className="w-full flex gap-2 justify-start items-center"
								onClick={() => setOpen(false)}
							>
								<UploadIcon className="w-4 h-4" />
								Uploads
							</Button>
						</Link>
					</div>
					<Separator />
					<div className="flex flex-col">
						{/* <Link href={`/users/${userId}/notifications`}>
							<Button
								variant="ghost"
								className="w-full flex gap-1 justify-start"
								onClick={() => setOpen(false)}
							>
								<BellIcon className="w-4 h-4" />
								Notifications
							</Button>
						</Link> */}
						<Link href={`/users/${userId}/settings`}>
							<Button
								variant="ghost"
								className="w-full flex gap-1 justify-start"
								onClick={() => setOpen(false)}
							>
								<SettingsIcon className="w-4 h-4" />
								Settings
							</Button>
						</Link>
						{/* <Separator /> */}
						<Button
							variant="ghost"
							className="w-full flex gap-1 text-red-500 hover:text-red-700 justify-start"
							onClick={() => signOut({ callbackUrl: "/" })}
						>
							<LogOutIcon className="w-4 h-4" />
							Log out
						</Button>
					</div>
				</article>
			</PopoverContent>
		</Popover>
	);
}

export default Profile;
