"use client";

import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MessageSquareIcon, StarIcon, ThumbsUpIcon } from "lucide-react";
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
import { Discussion } from "@/types/schema";
import moment from "moment";
import "moment/locale/ko";
import MDEditor from "@uiw/react-md-editor";
import { useSession } from "next-auth/react";

interface DiscussionCardProps {
	discussion: Discussion;
	onLike: (id: number) => void;
}

function DiscussionCard({ discussion, onLike }: DiscussionCardProps) {
	const [openComments, setOpenComments] = useState(false);
	const { data: session } = useSession();

	const liked = discussion.Likes?.some((like) => like.User.id === session?.id);

	return (
		<Card>
			<CardHeader className="flex flex-col gap-1">
				<CardTitle>{discussion.title}</CardTitle>
				<div className="flex items-center justify-between">
					<CardDescription>{moment(discussion.cAt).fromNow()}</CardDescription>
					{!discussion.parent_id && (
						<div className="flex gap-2 items-center">
							<CardDescription>조회 {discussion.views}회</CardDescription>
						</div>
					)}
				</div>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<MDEditor.Markdown source={discussion.content} />
				<div className="space-x-2 line-clamp-1 flex-1">
					{discussion.Tags.map((tag) => (
						<Badge className="p-2 rounded-lg text-blue-600 bg-blue-200 cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-200">
							{tag.name}
						</Badge>
					))}
				</div>
				<div className="flex justify-between items-center">
					<div className="">
						<ProfileCard
							name={discussion.User.name}
							image={discussion.User.image}
						/>
					</div>
					<Button
						variant="outline"
						className={cn(
							"flex items-center justify-between gap-2 text-md px-4 py-2 min-w-[80px]",
							liked && "text-red-500"
						)}
						onClick={() => onLike(discussion.id)}
					>
						<ThumbsUpIcon className="w-5 h-5" />
						{discussion.Likes?.length}
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
						className={cn(
							"flex items-center gap-2",
							openComments && "text-blue-500"
						)}
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
