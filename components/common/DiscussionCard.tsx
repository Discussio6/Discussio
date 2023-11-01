"use client";

import React, { useCallback, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
	CheckCircle,
	EditIcon,
	FlagIcon,
	MedalIcon,
	MessageSquareIcon,
	StarIcon,
	ThumbsUpIcon,
	TrashIcon,
} from "lucide-react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "../ui/card";
import ProfileCard from "./ProfileCard";
import { DotsHorizontalIcon, Share1Icon } from "@radix-ui/react-icons";
import Comments from "../comments/Comments";
import { cn } from "@/lib/utils";
import { Discussion } from "@/types/schema";
import moment from "moment";
import MDEditor from "@uiw/react-md-editor";
import { useSession } from "next-auth/react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DiscussionForm, {
	DiscussionFormType,
	discussionFormSchema,
} from "../discussions/DiscussionForm";
import {
	useAcceptDiscussion,
	useDeleteDiscussion,
	usePatchDiscussion,
} from "@/lib/queries/discussions";
import * as z from "zod";
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
import { useRouter } from "next/navigation";
import { Alert, AlertTitle } from "../ui/alert";

interface DiscussionCardProps {
	discussion: Discussion;
	hasAcceptBtn?: boolean;
	onLike: (id: number) => void;
}

function DiscussionCard({
	discussion,
	hasAcceptBtn,
	onLike,
}: DiscussionCardProps) {
	const [openComments, setOpenComments] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const { data: session, status } = useSession();
	const patchDiscussion = usePatchDiscussion();
	const deleteDiscussion = useDeleteDiscussion();
	const acceptDiscussion = useAcceptDiscussion();

	const isAuthor = discussion.User.id === session?.id;
	const liked = discussion.Likes?.some((like) => like.User.id === session?.id);
	const router = useRouter();

	const handleUpdate = useCallback(
		(
			values: z.infer<typeof discussionFormSchema>,
			form: DiscussionFormType
		) => {
			if (status !== "authenticated") {
				alert("Please login");
				return;
			}
			patchDiscussion.mutate(
				{
					...values,
					id: discussion.id,
				},
				{
					onSuccess: (res) => {
						form.reset();
						setIsEdit(false);
					},
				}
			);
		},
		[patchDiscussion]
	);

	const handleAccept = useCallback(() => {
		if (status !== "authenticated") {
			alert("Please login");
			return;
		}
		if (!discussion.parent_id) return;

		acceptDiscussion.mutate(
			{
				id: discussion.id,
				parent_id: discussion.parent_id,
			},
			{
				onSuccess: (data) => {
					alert("The answer has been adopted.");
				},
			}
		);
	}, [acceptDiscussion]);

	const handleDelete = useCallback(() => {
		deleteDiscussion.mutate(
			{ id: discussion.id },
			{
				onSuccess: () => {
					if (!discussion.parent_id)
						router.replace(discussion.isQna ? "/questions" : "/discussions");
				},
			}
		);
	}, [deleteDiscussion]);

	return (
		<Card>
			{!isEdit ? (
				<>
					<CardHeader className="flex flex-col gap-1">
						{discussion.isAccepted && (
							<div className="flex bg-orange-500 drop-shadow-sm text-white p-2 rounded-lg w-fit gap-2 items-center">
								<MedalIcon className="w-5 h-5" />
								Adopted
							</div>
						)}
						<div className="flex items-center justify-between">
							<CardTitle>{discussion.title}</CardTitle>
							<AlertDialog>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button size="icon" variant="ghost">
											<DotsHorizontalIcon />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										{isAuthor && (
											<>
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
												<DropdownMenuSeparator />
											</>
										)}
										<DropdownMenuItem className="cursor-pointer">
											<FlagIcon className="w-4 h-4 mr-2" />
											<span>Report</span>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Are you sure you want to delete the post?
										</AlertDialogTitle>
										<AlertDialogDescription>
											Deleted posts cannot be recovered, and all replies and
											comments will also be deleted.
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
						</div>
						<div className="flex items-center justify-between">
							<CardDescription>
								{moment(discussion.cAt).fromNow()}
							</CardDescription>
							{!discussion.parent_id && (
								<div className="flex gap-2 items-center">
									<CardDescription>{discussion.views} views</CardDescription>
								</div>
							)}
						</div>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						<MDEditor.Markdown source={discussion.content} />
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
						<div className="flex justify-between items-center">
							<div className="">
								<ProfileCard
									name={discussion.User.name}
									image={discussion.User.image}
								/>
							</div>
							<div className="flex items-center gap-2">
								{hasAcceptBtn && (
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button
												variant="primary"
												className="flex items-center justify-between gap-2 text-md px-4 py-2 min-w-[80px]"
											>
												<CheckCircle className="w-5 h-5" />
												Adopt
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>
													Are you sure to adopt this answer?
												</AlertDialogTitle>
												<AlertDialogDescription>
													You can not change the answer after adoption.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction
													onClick={handleAccept}
													className="bg-green-600 hover:bg-green-600/90"
												>
													Confirm
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								)}
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
						</div>
						<div className="flex gap-2">
							<Button className="flex items-center gap-2" variant="ghost">
								<Share1Icon className="w-4 h-4" />
								Share
							</Button>
							<Button className="flex items-center gap-2" variant="ghost">
								<StarIcon className="w-4 h-4" />
								Favorites
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
								Comments
							</Button>
						</div>
						<div className={cn(!openComments && "hidden", "mt-6")}>
							<Comments content_id={discussion.id} />
						</div>
					</CardContent>
				</>
			) : (
				<div className="p-4">
					<DiscussionForm
						initialData={{
							title: discussion.title,
							content: discussion.content,
							tags: discussion.Tags.map((tag) => tag.name),
						}}
						onSubmit={handleUpdate}
						onCancel={() => setIsEdit(false)}
					/>
				</div>
			)}
		</Card>
	);
}

export default DiscussionCard;
