import React, { Dispatch, SetStateAction, useCallback } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import {
	useGetComments,
	useGetCommentsInfinite,
	usePostComment,
} from "@/lib/queries/comments";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { CommentType } from "@prisma/client";

interface CommentsProps {
	content_id: number;
	type?: CommentType;
}

function Comments({ content_id, type }: CommentsProps) {
	const postComment = usePostComment();
	const { status } = useSession();
	const { data } = useGetComments({ content_id, count: 0, type });
	const {
		data: commentData,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useGetCommentsInfinite({
		content_id,
		parent_comment_id: null,
		page: 1,
		count: 15,
		orderBy: "cAt:asc",
		type,
	});

	const comments = (commentData?.pages || []).flatMap((page) => page.hits);

	const handleSubmit = useCallback(
		(comment: string, setContent: Dispatch<SetStateAction<string>>) => {
			if (status !== "authenticated") {
				alert("Please login to comment.");
				return;
			}
			postComment.mutate(
				{ content_id, parent_comment_id: null, comment, type },
				{
					onSuccess: () => {
						setContent("");
					},
				}
			);
		},
		[status, postComment, content_id, type]
	);

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-md font-semibold">{data?.total} Comments</h1>
			<CommentForm onSubmit={handleSubmit} />
			<div className="flex flex-col gap-2 mt-4">
				<div className="flex flex-col gap-4">
					{comments?.map((comment) => (
						<Comment key={comment.id} comment={comment} />
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
		</div>
	);
}

export default Comments;
