"use client";

import React, { useCallback } from "react";
import DiscussionForm, {
	onSuccess,
} from "@/components/discussions/DiscussionForm";
import UploadWarningCard from "@/components/common/UploadWarningCard";
import { useRouter } from "next/navigation";

function QuestionUpload() {
	const router = useRouter();
	const handleSuccess = useCallback<onSuccess>(({ form, res }) => {
		form.reset();
		router.push(`/questions/${res.data.id}`);
	}, []);

	return (
		<main className="container flex flex-col my-8 gap-8">
			<UploadWarningCard />
			<DiscussionForm onSuccess={handleSuccess} />
		</main>
	);
}

export default QuestionUpload;
