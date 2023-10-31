"use client";

import React, { useCallback } from "react";
import DiscussionForm, {
	DiscussionFormType,
	discussionFormSchema,
} from "@/components/discussions/DiscussionForm";
import UploadWarningCard from "@/components/common/UploadWarningCard";
import { useRouter } from "next/navigation";
import { postDiscussion, usePostDiscussion } from "@/lib/queries/discussions";
import * as z from "zod";
import { useSession } from "next-auth/react";

function DiscussionUpload() {
	const { status } = useSession();
	const router = useRouter();
	const discussionMutation = usePostDiscussion();

	const handleSubmit = useCallback(
		(
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
				},
				{
					onSuccess(data, variables, context) {
						form.reset();
						router.push(`/discussions/${data.data.id}`);
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

export default DiscussionUpload;
