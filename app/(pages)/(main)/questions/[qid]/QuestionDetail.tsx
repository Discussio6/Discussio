"use client";

import DiscussionCard from "@/components/common/DiscussionCard";
import UploadWarningCard from "@/components/common/UploadWarningCard";
import DiscussionForm, {
	onSuccess,
} from "@/components/discussions/DiscussionForm";
import { QUERY_KEYS } from "@/constants/querykeys";
import {
	useGetDiscussion,
	useGetDiscussionsInfinite,
	useLikeDiscussion,
} from "@/lib/queries/discussions";
import { Discussion } from "@/types/schema";
import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback } from "react";

interface Props {
	qid: number;
	discussion: Discussion;
}

function QuestionDetail({ qid, discussion: initialDiscussion }: Props) {
	const childParams = { parent_id: qid, orderBy: "cAt:asc" };
	const { data: discussion } = useGetDiscussion(qid, {
		initialData: { data: initialDiscussion, success: true },
	});
	const likeMutation = useLikeDiscussion();
	const queryClient = useQueryClient();
	const { data: childDiscussions } = useGetDiscussionsInfinite(childParams, {
		initialData: {
			pageParams: [{ page: 1, count: 10, parent_id: qid }],
			pages: [
				{
					hits: discussion?.data.Children ?? [],
					total: discussion?.data.Children?.length ?? 0,
				},
			],
		},
	});
	const handleSuccess = useCallback<onSuccess>(
		({ form, res }) => {
			form.reset();
			queryClient.invalidateQueries(
				QUERY_KEYS.discussions.infinite(childParams)
			);
		},
		[queryClient]
	);

	const handleLike = useCallback(
		(id: number) => {
			likeMutation.mutate(
				{ id },
				{
					onSuccess: () => {
						queryClient.invalidateQueries(QUERY_KEYS.discussions.single(id));
						queryClient.invalidateQueries(
							QUERY_KEYS.discussions.infinite(childParams)
						);
					},
				}
			);
		},
		[queryClient]
	);

	const children = childDiscussions?.pages.flatMap((page) => page.hits) ?? [];

	if (!discussion?.data) return null;

	return (
		<main className="container flex flex-col my-8 gap-8">
			<DiscussionCard discussion={discussion.data} onLike={handleLike} />
			<div className="border p-4 rounded-lg flex flex-col gap-8">
				<UploadWarningCard className="bg-transparent text-slate-500" />
				<DiscussionForm onSuccess={handleSuccess} parent_id={qid} />
			</div>
			{childDiscussions?.pages?.[0].total ?? 0 > 0 ? (
				<div className="flex flex-col gap-3">
					<h1 className="text-xl font-bold">
						답변 {childDiscussions?.pages?.[0].total}개
					</h1>
					<div className="flex flex-col gap-4">
						{children.map((item) => (
							<DiscussionCard
								key={item.id}
								discussion={item}
								onLike={handleLike}
							/>
						))}
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center p-4 text-slate-400 mt-8">
					아직 작성된 답변이 없습니다. 첫 답변을 작성해보세요!
				</div>
			)}
		</main>
	);
}

export default QuestionDetail;
