"use client";

import DiscussionCard from "@/components/common/DiscussionCard";
import UploadWarningCard from "@/components/common/UploadWarningCard";
import DiscussionForm, {
	onSuccess,
} from "@/components/discussions/DiscussionForm";
import { useGetDiscussion } from "@/lib/queries/discussions";
import { Discussion } from "@/types/schema";
import React, { useCallback } from "react";

interface Props {
	qid: number;
	discussion: Discussion;
}

function QuestionDetail({ qid, discussion: initialDiscussion }: Props) {
	const { data: discussion } = useGetDiscussion(qid, {
		initialData: { data: initialDiscussion, success: true },
	});
	const handleSuccess = useCallback<onSuccess>(({ form, res }) => {
		form.reset();
	}, []);

	if (!discussion?.data) return null;

	return (
		<main className="container flex flex-col my-8 gap-8">
			<DiscussionCard discussion={discussion.data} />
			<div className="border p-4 rounded-lg flex flex-col gap-8">
				<UploadWarningCard className="bg-transparent text-slate-500" />
				<DiscussionForm onSuccess={handleSuccess} parent_id={qid} />
			</div>
			{discussion.data.Children!.length > 0 ? (
				<div className="flex flex-col gap-3">
					<h1 className="text-xl font-bold">
						답변 {discussion.data.Children!.length}개
					</h1>
					<div className="flex flex-col gap-4">
						{discussion.data.Children!.map((item) => (
							<DiscussionCard key={item.id} discussion={item} />
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
