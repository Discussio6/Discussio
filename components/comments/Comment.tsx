"use client";

import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import ProfileCard from "../common/ProfileCard";
import { Button } from "../ui/button";
import {
	ChevronDownIcon,
	ChevronUpIcon,
	EditIcon,
	FlagIcon,
	MessageSquareIcon,
	ReplyIcon,
	TrashIcon,
} from "lucide-react";
import CommentForm from "./CommentForm";
import { cn } from "@/lib/utils";
import { Comment } from "@/types/schema";
import {
	useDeleteComment,
	useGetCommentsInfinite,
	usePatchComment,
	usePostComment,
} from "@/lib/queries/comments";
import Comments from "./Comments";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useSession } from "next-auth/react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import ReportForm, { ReportFormProps } from "../common/ReportForm";
import { postReport } from "@/lib/queries/report";

interface CommentProps {
	comment: Comment;
}

function Comment({ comment }: CommentProps) {
	const [openCommentForm, setOpenCommentForm] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [openReplies, setOpenReplies] = useState(false);
	const [openReportForm, setOpenReportForm] = useState(false);
	const closeCommentForm = useCallback(() => setOpenCommentForm(false), []);
	const postComment = usePostComment();
	const patchComment = usePatchComment();
	const deleteComment = useDeleteComment();
	const { data: session, status } = useSession();
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
		(content: string, setContent: Dispatch<SetStateAction<string>>) => {
			postComment.mutate(
				{
					content_id: comment.content_id,
					parent_comment_id: comment.parent_comment_id || comment.id,
					comment: content,
				},
				{
					onSuccess: () => {
						setContent("");
						setOpenCommentForm(false);
						setOpenReplies(true);
					},
				}
			);
		},
		[postComment]
	);

	const handleUpdate = useCallback(
		(content: string, setContent: Dispatch<SetStateAction<string>>) => {
			if (status !== "authenticated") {
				alert("Please login to comment.");
				return;
			}
			patchComment.mutate(
				{
					id: comment.id,
					comment: content,
				},
				{
					onSuccess: () => {
						setContent("");
						setIsEdit(false);
					},
				}
			);
		},
		[patchComment]
	);

	const handleDelete = useCallback(() => {
		deleteComment.mutate(
			{ id: comment.id },
			{
				onSuccess: () => {
					alert("successfully deleted");
				},
			}
		);
	}, []);

	const handleReport = useCallback<ReportFormProps["onSubmit"]>(
		(values, form) => {
			postReport({
				title: values.title,
				description: values.description,
				type: "Comments",
				endpoint: window.location.href,
				json: JSON.stringify(comment, null, 2),
			}).then((res) => {
				if (res.success) {
					alert("Reported successfully");
					setOpenReportForm(false);
					form.reset();
				} else {
					alert("Failed to report");
				}
			});
		},
		[comment]
	);

	const isAuthor = comment.User.id === session?.id;
	const replies = (replyData?.pages || []).flatMap((page) => page.hits);
	const replyCount = replyData?.pages[0].total;

	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-between items-center">
				<ProfileCard
					name={comment.User.name}
					image={comment.User.image}
					id={comment.User.id}
				/>
				{isAuthor && (
					<AlertDialog>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button size="icon" variant="ghost">
									<DotsHorizontalIcon />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem
									className="cursor-pointer"
									onClick={() => setIsEdit(true)}
								>
									<EditIcon className="w-4 h-4 mr-2" />
									<span>Edit</span>
								</DropdownMenuItem>
								<AlertDialogTrigger asChild>
									<DropdownMenuItem className="cursor-pointer">
										<TrashIcon className="w-4 h-4 mr-2" />
										<span>Delete</span>
									</DropdownMenuItem>
								</AlertDialogTrigger>
							</DropdownMenuContent>
						</DropdownMenu>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Delete Comment</AlertDialogTitle>
								<AlertDialogDescription>
									Are you sure to delete this comment?
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									onClick={handleDelete}
									className="bg-red-500 hover:bg-red-500/90"
								>
									Delete
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				)}
			</div>
			{!isEdit ? (
				<div>{comment.comment}</div>
			) : (
				<CommentForm
					initialContent={comment.comment}
					onSubmit={handleUpdate}
					onCancel={() => setIsEdit(false)}
				/>
			)}
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
				<Dialog open={openReportForm} onOpenChange={setOpenReportForm}>
					<DialogTrigger asChild>
						<Button className="flex items-center gap-2" variant="ghost">
							<FlagIcon className="w-4 h-4" />
							Report
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Report a comment</DialogTitle>
							<DialogDescription>
								Please write down the reason for the report
							</DialogDescription>
						</DialogHeader>
						<ReportForm onSubmit={handleReport} />
					</DialogContent>
				</Dialog>
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
