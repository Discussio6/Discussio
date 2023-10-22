import DiscussionItem from "@/components/common/DiscussionItem";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import React from "react";

function QuestionsPage() {
	return (
		<main className="container flex flex-col my-8 gap-8">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">전체 질문</h1>
				<Button variant="primary" className="flex gap-1">
					<PencilIcon className="w-4 h-4" />
					질문 쓰기
				</Button>
			</div>
			<article className="flex flex-col gap-2">
				<div className="text-large font-bold">23개 결과</div>
				<div className="flex flex-col gap-4">
					<DiscussionItem />
					<DiscussionItem />
					<DiscussionItem />
					<DiscussionItem />
					<DiscussionItem />
					<DiscussionItem />
				</div>
			</article>
		</main>
	);
}

export default QuestionsPage;
