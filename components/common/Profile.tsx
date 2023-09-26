import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import {
	LogOutIcon,
	UploadIcon,
	MessageSquareIcon,
	UserIcon,
	SettingsIcon,
	BellIcon,
} from "lucide-react";
import { Separator } from "../ui/separator";

export const ProfileImage = React.forwardRef<HTMLSpanElement, {}>((_, ref) => {
	const { data: session } = useSession();

	return (
		<Avatar ref={ref} className="w-full h-full">
			<AvatarImage src={session?.user?.image || ""} />
			<AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
		</Avatar>
	);
});

function Profile() {
	const { data: session, status } = useSession();
	if (status === "loading")
		return (
			<div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse" />
		);
	if (status === "unauthenticated")
		return (
			<Button variant="primary" onClick={() => signIn()}>
				로그인
			</Button>
		);
	return (
		<Popover>
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
						<Button variant="ghost" className="w-full flex gap-1 justify-start">
							<UploadIcon className="w-4 h-4" />내 업로드 내역
						</Button>
						<Button variant="ghost" className="w-full flex gap-1 justify-start">
							<MessageSquareIcon className="w-4 h-4" />내 댓글 내역
						</Button>
						<Button variant="ghost" className="w-full flex gap-1 justify-start">
							<BellIcon className="w-4 h-4" />내 알림
						</Button>
					</div>
					<Separator />
					<div className="flex flex-col">
						<Button variant="ghost" className="w-full flex gap-1 justify-start">
							<UserIcon className="w-4 h-4" />
							프로필 수정
						</Button>
						<Button variant="ghost" className="w-full flex gap-1 justify-start">
							<SettingsIcon className="w-4 h-4" />
							설정
						</Button>
					</div>
					<Separator />
					<Button
						variant="ghost"
						className="w-full flex gap-1 text-red-500 hover:text-red-700 justify-start"
						onClick={() => signOut()}
					>
						<LogOutIcon className="w-4 h-4" />
						로그아웃
					</Button>
				</article>
			</PopoverContent>
		</Popover>
	);
}

export default Profile;
