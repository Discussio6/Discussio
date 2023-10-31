"use client";

import React, { useCallback, useState } from "react";
import ProfileCard from "../common/ProfileCard";
import { Button } from "../ui/button";
import {
	ChevronDownIcon,
	ChevronUpIcon,
	FlagIcon,
	MessageSquareIcon,
	ReplyIcon,
} from "lucide-react";
import CommentForm from "./CommentForm";
import { cn } from "@/lib/utils";
import { Comment } from "@/types/schema";
import { useGetCommentsInfinite, usePostComment } from "@/lib/queries/comments";
import Comments from "./Comments";

interface CommentProps {
	comment: Comment;
}

function Comment({ comment }: CommentProps) {
	const [openCommentForm, setOpenCommentForm] = useState(false);
	const [openReplies, setOpenReplies] = useState(false);
	const closeCommentForm = useCallback(() => setOpenCommentForm(false), []);
	const postComment = usePostComment();
	const {
		data: replyData,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useGetCommentsInfinite({
		content_id: comment.content_id,
		parent_comment_id: comment.id,
		page: 1,
		count: 15,
		orderBy: "cAt:asc",
	});

	const handleSubmit = useCallback(
		(content: string) => {
			postComment.mutate(
				{
					content_id: comment.content_id,
					parent_comment_id: comment.parent_comment_id || comment.id,
					comment: content,
				},
				{
					onSuccess: () => {
						setOpenCommentForm(false);
						setOpenReplies(true);
					},
				}
			);
		},
		[postComment]
	);
	const replies = (replyData?.pages || []).flatMap((page) => page.hits);
	const replyCount = replyData?.pages[0].total;

	return (
		<div className="flex flex-col gap-2">
			<div>
				<ProfileCard name={comment.User.name} image={comment.User.image} />
			</div>
			<div>{comment.comment}</div>
			<div className="flex gap-2">
				{typeof replyCount !== "undefined" &&
					replyCount > 0 &&
					!comment.parent_comment_id && (
						<Button
							className="flex items-center gap-2"
							variant="ghost"
							onClick={() => setOpenReplies((open) => !open)}
						>
							{openReplies ? (
								<ChevronUpIcon className="w-4 h-4" />
							) : (
								<ChevronDownIcon className="w-4 h-4" />
							)}
							{openReplies
								? "Hide Replies"
								: `Show ${replyData?.pages[0].total} Replies`}
						</Button>
					)}
				<Button
					className="flex items-center gap-2"
					variant="ghost"
					onClick={() => setOpenCommentForm((open) => !open)}
				>
					<ReplyIcon className="w-4 h-4" />
					Reply
				</Button>
				<Button className="flex items-center gap-2" variant="ghost">
					<FlagIcon className="w-4 h-4" />
					Report
				</Button>
			</div>
			<div className={cn(!openCommentForm && "hidden")}>
				<CommentForm onCancel={closeCommentForm} onSubmit={handleSubmit} />
			</div>
			{openReplies && replies && replies.length > 0 && (
				<div className="flex flex-col gap-2 mt-4 pl-12">
					<div className="flex flex-col gap-4">
						{replies?.map((reply) => (
							<Comment key={reply.id} comment={reply} />
						))}
					</div>
					{hasNextPage && (
						<Button
							variant="ghost"
							onClick={() => {
								if (!isFetchingNextPage) fetchNextPage();
							}}
							disabled={isFetchingNextPage}
							className={cn(isFetchingNextPage && "animate-pulse")}
						>
							{isFetchingNextPage ? "Loading more..." : "Load more"}
						</Button>
					)}
				</div>
			)}
		</div>
	);
}

export default Comment;
