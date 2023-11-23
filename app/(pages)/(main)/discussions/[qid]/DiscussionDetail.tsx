"use client";

import DiscussionCard from "@/components/common/DiscussionCard";
import UploadWarningCard from "@/components/common/UploadWarningCard";
import DiscussionForm, {
	DiscussionFormType,
	discussionFormSchema,
} from "@/components/discussions/DiscussionForm";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/constants/querykeys";
import {
	useGetDiscussion,
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

function DiscussionDetail({ qid, discussion: initialDiscussion }: Props) {
	const childParams = {
		parent_id: qid,
		orderBy: "cAt:asc",
		page: 1,
		count: 10,
	};
	const { status } = useSession();
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
			alert("Please login");
			return;
		}
		discussionMutation.mutate(
			{
				...values,
				parent_id: qid,
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

	const answers = childDiscussions?.pages.flatMap((page) => page.hits) ?? [];

	if (!discussion?.data) return null;

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
			{childDiscussions?.pages?.[0].total ?? 0 > 0 ? (
				<div className="flex flex-col gap-3">
					<h1 className="text-xl font-bold">
						{childDiscussions?.pages?.[0].total} Follow-ups
					</h1>
					<div className="flex flex-col gap-2">
						<div className="flex flex-col gap-4">
							{answers.map((item) => (
								<DiscussionCard
									key={item.id}
									discussion={item}
									onLike={handleLike}
									onFavorite={handleFavorite}
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

export default DiscussionDetail;
