import DiscussionCard from "@/components/common/DiscussionCard";
import React from "react";

function QuestionDetailPage() {
	return (
		<main className="container flex flex-col my-8 gap-8">
			<DiscussionCard />
			<div className="flex flex-col gap-3">
				<h1 className="text-xl font-bold">답변 2개</h1>
				<div className="flex flex-col gap-4">
					<DiscussionCard isAnswer />
					<DiscussionCard isAnswer />
				</div>
			</div>
		</main>
	);
}

export default QuestionDetailPage;
