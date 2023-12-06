"use client";

import DiscussionCard from "@/components/common/DiscussionCard";
import UploadWarningCard from "@/components/common/UploadWarningCard";
import DiscussionForm, {
	DiscussionFormType,
	discussionFormSchema,
} from "@/components/discussions/DiscussionForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/constants/querykeys";
import {
	useGetDiscussion,
	useGetDiscussions,
	useGetDiscussionsInfinite,
	useLikeDiscussion,
	usePostDiscussion,
	usefavoriteDiscussion,
} from "@/lib/queries/discussions";
import { cn } from "@/lib/utils";
import { Discussion } from "@/types/schema";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useCallback } from "react";
import * as z from "zod";

interface Props {
	qid: number;
	discussion: Discussion;
}

function QuestionDetail({ qid, discussion: initialDiscussion }: Props) {
	const childParams = {
		parent_id: qid,
		orderBy: "cAt:asc",
		page: 1,
		count: 10,
	};
	const { toast } = useToast();
	const { data: session, status } = useSession();
	const { data: accepted } = useGetDiscussions({
		isAccepted: true,
		parent_id: qid,
		isQna: true,
	});
	const { data: discussion } = useGetDiscussion(qid, {
		initialData: { data: initialDiscussion, success: true },
	});
	const discussionMutation = usePostDiscussion();
	const likeMutation = useLikeDiscussion();
	const favoriteMutation = usefavoriteDiscussion();
	const queryClient = useQueryClient();
	const {
		data: childDiscussions,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
	} = useGetDiscussionsInfinite(childParams, {
		initialData: {
			pageParams: [1],
			pages: [
				{
					hits: discussion?.data.Children ?? [],
					total: discussion?.data.Children?.length ?? 0,
				},
			],
		},
	});

	const handleSubmit = async (
		values: z.infer<typeof discussionFormSchema>,
		form: DiscussionFormType
	) => {
		if (status !== "authenticated") {
			toast({
				title: "Please login",
				variant: "destructive",
				duration: 2000,
			});
			return;
		}
		discussionMutation.mutate(
			{
				...values,
				parent_id: qid,
				isQna: initialDiscussion.isQna,
			},
			{
				onSuccess: () => {
					form.reset();
				},
				onError: (err) => {
					console.log(err);
					alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
				},
			}
		);
	};

	const handleLike = useCallback(
		(id: number) => {
			if (status !== "authenticated") {
				toast({
					title: "Please login",
					variant: "destructive",
					duration: 2000,
				});
				return;
			}
			likeMutation.mutate(
				{ id },
				{
					onSuccess: () => {
						queryClient.invalidateQueries(QUERY_KEYS.discussions.single(id));
					},
				}
			);
		},
		[queryClient]
	);

	const handleFavorite = useCallback(
		(id: number) => {
			if (status !== "authenticated") {
				toast({
					title: "Please login",
					variant: "destructive",
					duration: 2000,
				});
				return;
			}
			favoriteMutation.mutate(
				{ id },
				{
					onSuccess: () => {
						queryClient.invalidateQueries(QUERY_KEYS.discussions.single(id));
					},
				}
			);
		},
		[queryClient]
	);

	const isAuthor = discussion?.data.User.id === session?.id;
	const isAccepted = accepted && accepted.total > 0;
	const answers = childDiscussions?.pages.flatMap((page) => page.hits) ?? [];

	if (!discussion?.data || !accepted) return null;

	return (
		<main className="container flex flex-col my-8 gap-8">
			<DiscussionCard
				discussion={discussion.data}
				onLike={handleLike}
				onFavorite={handleFavorite}
			/>
			<div className="border p-4 rounded-lg flex flex-col gap-8">
				<UploadWarningCard className="bg-transparent text-slate-500" />
				<DiscussionForm onSubmit={handleSubmit} />
			</div>
			{isAccepted && (
				<>
					<div className="flex flex-col gap-2">
						<h1 className="text-xl font-bold">Adopted Answer</h1>
						<DiscussionCard
							discussion={accepted.hits[0]}
							onLike={handleLike}
							onFavorite={handleFavorite}
						/>
					</div>
					<Separator />
				</>
			)}
			{childDiscussions?.pages?.[0].total ?? 0 > 0 ? (
				<div className="flex flex-col gap-3">
					<h1 className="text-xl font-bold">
						{childDiscussions?.pages?.[0].total} Answers
					</h1>
					<div className="flex flex-col gap-2">
						<div className="flex flex-col gap-4">
							{answers.map((item) => (
								<DiscussionCard
									key={item.id}
									discussion={item}
									onLike={handleLike}
									onFavorite={handleFavorite}
									hasAcceptBtn={
										discussion.data.isQna && !isAccepted && isAuthor
									}
								/>
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
			) : (
				<div className="flex flex-col items-center p-4 text-slate-400 mt-8">
					No answers have been written yet. Write your first answer!
				</div>
			)}
		</main>
	);
}

export default QuestionDetail;
