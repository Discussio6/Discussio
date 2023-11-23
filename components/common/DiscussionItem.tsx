"use client";

import React from "react";
import { Badge } from "../ui/badge";
import { Discussion } from "@/types/schema";
import moment from "moment";
import ProfileCard from "./ProfileCard";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DiscussionItemProps {
	discussion: Discussion;
}

function DiscussionItem({ discussion }: DiscussionItemProps) {
	const unsolved =
		!discussion.isAccepted && discussion.isQna && discussion.parent_id === null;

	return (
		<div
			className={cn(
				"flex flex-col gap-1 border p-4 rounded-lg",
				unsolved && "border-red-500"
			)}
		>
			<Link
				href={`/${discussion.isQna ? "questions" : "discussions"}/${
					discussion.parent_id || discussion.id
				}`}
				className="text-lg font-bold line-clamp-2 text-blue-500 hover:text-blue-700 cursor-pointer transition-all duration-200 ease-in-out"
			>
				{discussion.title}
			</Link>
			<div className="text-sm line-clamp-2">{discussion.content}</div>
			<div className="flex items-center gap-2 text-sm text-slate-500">
				<div>{discussion.views} views</div>
				<div>{discussion.Likes?.length} likes</div>
			</div>
			<div className="mt-2 flex justify-between items-center">
				{discussion.Tags.length > 0 && (
					<div className="space-x-2 line-clamp-1 flex-1">
						{discussion.Tags.map((tag) => (
							<Badge
								key={tag.name}
								className="p-2 rounded-lg text-blue-600 bg-blue-200 cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-200"
							>
								{tag.name}
							</Badge>
						))}
					</div>
				)}
				<div className="flex flex-1" />
				<div className="flex items-center gap-4 shrink-0">
					<ProfileCard
						name={discussion.User.name}
						image={discussion.User.image}
						id={discussion.User.id}
					/>
					<div className="shrink-0 flex items-center gap-2 text-xs text-slate-500">
						{moment(discussion.cAt).fromNow()}
					</div>
				</div>
			</div>
		</div>
	);
}

export default DiscussionItem;
