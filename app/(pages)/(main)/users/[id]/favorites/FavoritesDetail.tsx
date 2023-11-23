"use client";

import { Session } from "next-auth";
import React, { Suspense } from "react";
import QuestionCard from "./QuestionCard";
import BeatLoader from "@/components/common/BeatLoader";
import AnswerCard from "./AnswerCard";
import DiscussionCard from "./DiscussionCard";
import FlashcardCard from "./FlashcardCard";

const Loader = ({ text }: { text?: string }) => (
	<div className="min-h-[120px] flex flex-col gap-4 justify-center items-center">
		<BeatLoader />
		{text && <span className="text-slate-500 text-sm">{text}</span>}
	</div>
);

function FavoritesDetail() {
	return (
		<div className="flex flex-col gap-8">
			<Suspense fallback={<Loader text="Loading Questions" />}>
				<QuestionCard />
			</Suspense>
			<Suspense fallback={<Loader text="Loading Answers" />}>
				<AnswerCard />
			</Suspense>
			<Suspense fallback={<Loader text="Loading Discussions" />}>
				<DiscussionCard />
			</Suspense>
			<Suspense fallback={<Loader text="Loading Flashcards" />}>
				<FlashcardCard />
			</Suspense>
		</div>
	);
}

export default FavoritesDetail;
