import React, { useCallback } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import {
	useGetComments,
	useGetCommentsInfinite,
	usePostComment,
} from "@/lib/queries/comments";

interface CommentsProps {
	content_id: number;
}

function Comments({ content_id }: CommentsProps) {
	const postComment = usePostComment();
	const { data } = useGetComments({ content_id, count: 0 });
	const { data: commentData } = useGetCommentsInfinite({
		content_id,
		parent_comment_id: null,
		page: 1,
		count: 15,
		orderBy: "cAt:asc",
	});

	const comments = (commentData?.pages || []).flatMap((page) => page.hits);

	const handleSubmit = useCallback(
		(comment: string) => {
			postComment.mutate({ content_id, parent_comment_id: null, comment });
		},
		[postComment]
	);

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-md font-semibold">{data?.total} Comments</h1>
			<CommentForm onSubmit={handleSubmit} />
			<div className="flex flex-col gap-4 mt-4">
				{comments?.map((comment) => (
					<Comment key={comment.id} comment={comment} />
				))}
			</div>
		</div>
	);
}

export default Comments;
