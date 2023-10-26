"use client";

import React, { useCallback } from "react";
import DiscussionForm, {
	discussionFormSchema,
} from "@/components/discussions/DiscussionForm";
import UploadWarningCard from "@/components/common/UploadWarningCard";
import { useRouter } from "next/navigation";
import { postDiscussion, usePostDiscussion } from "@/lib/queries/discussions";
import * as z from "zod";

function QuestionUpload() {
	const router = useRouter();
	const discussionMutation = usePostDiscussion();

	const handleSubmit = useCallback(
		(values: z.infer<typeof discussionFormSchema>) => {
			discussionMutation.mutate(
				{
					...values,
				},
				{
					onSuccess(data, variables, context) {
						router.push(`/questions/${data.data.id}`);
					},
					onError: (err) => {
						console.log(err);
						alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
					},
				}
			);
		},
		[postDiscussion]
	);

	return (
		<main className="container flex flex-col my-8 gap-8">
			<UploadWarningCard />
			<DiscussionForm onSubmit={handleSubmit} />
		</main>
	);
}

export default QuestionUpload;
