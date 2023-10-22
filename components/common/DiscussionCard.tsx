"use client";

import React, { useCallback, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
	HeartIcon,
	MessageSquareIcon,
	ShareIcon,
	StarIcon,
	ThumbsUpIcon,
} from "lucide-react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "../ui/card";
import ProfileCard from "./ProfileCard";
import { Share1Icon } from "@radix-ui/react-icons";
import Comments from "../comments/Comments";
import { cn } from "@/lib/utils";

interface DiscussionCardProps {
	isAnswer?: boolean;
}

function DiscussionCard({ isAnswer = false }: DiscussionCardProps) {
	const [openComments, setOpenComments] = useState(false);

	return (
		<Card>
			<CardHeader className="flex flex-col gap-1">
				<CardTitle>질문 제목</CardTitle>
				<div className="flex items-center justify-between">
					<CardDescription>작성일 2023.10.22 00:12:34</CardDescription>
					{!isAnswer && (
						<div className="flex gap-2 items-center">
							<CardDescription>조회 0회</CardDescription>
						</div>
					)}
				</div>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<article>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et
					congue tellus. Fusce blandit in sapien sed dignissim. Maecenas finibus
					ligula risus, et interdum nunc fringilla a. Integer facilisis mattis
					mi, vitae varius justo mollis non. Aliquam non urna eu sapien
					venenatis lobortis. Vestibulum iaculis viverra lacus. Etiam
					sollicitudin tristique erat nec blandit. Fusce pellentesque mattis
					ligula, ac aliquam erat mattis in. Cras dui quam, consectetur
					elementum venenatis sed, fermentum ac ligula. Pellentesque ut nunc
					eget lacus varius scelerisque. Proin elementum pretium congue. Sed
					vitae consequat velit. Donec euismod ut velit eget pulvinar. Duis
					consectetur orci neque, cursus imperdiet massa ultrices malesuada. Sed
					eu volutpat nulla, non pretium nunc. Vivamus ut mattis turpis.
					Maecenas sit amet leo eget sapien ultricies auctor quis sed augue.
					Donec ac sapien sed nibh dictum vulputate vel nec lorem. Proin ut
					augue molestie, placerat ipsum ac, rutrum dolor. Fusce dictum magna ut
					turpis imperdiet, sed porta nisl laoreet. Quisque varius venenatis
					nunc, eu scelerisque lectus elementum vel. Curabitur libero purus,
					congue vel dictum tincidunt, semper et leo. Proin lectus nisi, aliquet
					at gravida non, fringilla id ipsum. Duis consectetur dictum porta.
					Vivamus egestas ac neque a sagittis. Duis volutpat suscipit nisi in
					tincidunt. Donec malesuada erat quis nunc iaculis, vel tristique purus
					iaculis. Curabitur pretium elit
				</article>
				<div className="space-x-2 line-clamp-1 flex-1">
					<Badge className="p-2 rounded-lg text-blue-600 bg-blue-200 cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-200">
						컴퓨터 공학
					</Badge>
					<Badge className="p-2 rounded-lg text-blue-600 bg-blue-200 cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-200">
						컴퓨터 공학
					</Badge>
					<Badge className="p-2 rounded-lg text-blue-600 bg-blue-200 cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-200">
						컴퓨터 공학
					</Badge>
				</div>
				<div className="flex justify-between items-center">
					<div className="">
						<ProfileCard name="chanhwi" image="/images/google-login-icon.svg" />
					</div>
					<Button
						variant="outline"
						className="flex items-center gap-2 text-md px-4 py-2"
					>
						<ThumbsUpIcon className="w-5 h-5" />0
					</Button>
				</div>
				<div className="flex gap-2">
					<Button className="flex items-center gap-2" variant="ghost">
						<Share1Icon className="w-4 h-4" />
						공유
					</Button>
					<Button className="flex items-center gap-2" variant="ghost">
						<StarIcon className="w-4 h-4" />
						찜하기
					</Button>
					<Button
						className={cn("flex items-center gap-2", openComments && "text-blue-500")}
						variant="ghost"
						onClick={() => setOpenComments((open) => !open)}
					>
						<MessageSquareIcon className="w-4 h-4" />
						댓글 보기
					</Button>
				</div>
				<div className={cn(!openComments && "hidden", "mt-6")}>
					<Comments />
				</div>
			</CardContent>
		</Card>
	);
}

export default DiscussionCard;
