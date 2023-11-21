"use client";

import { Button } from "@/components/ui/button";
import {
	useGetFlashcard,
	useGetFlashcardParticipants,
} from "@/lib/queries/flashcards";
import { Flashcard, FlashcardParticipant } from "@/types/schema";
import Link from "next/link";
import React from "react";
import ReportBtn from "./ReportBtn";
import ActionBtn from "./ActionBtn";
import { Badge } from "@/components/ui/badge";
import CardContents from "./CardContents";
import CardResults from "./CardResults";
import { FLASHCARD_RESULT_PAGE_COUNT } from "@/constants/data";
import { useGetComments } from "@/lib/queries/comments";
import Comments from "@/components/comments/Comments";

interface FlashcardDetailProps {
	id: number;
	initialFlashcard: Flashcard;
	initialParticipants: FlashcardParticipant[];
	initialPartTotal: number;
	isAuthor: boolean;
}

function FlashcardDetail({
	id,
	initialFlashcard,
	initialParticipants,
	initialPartTotal,
	isAuthor,
}: FlashcardDetailProps) {
	const { data: flashcardData } = useGetFlashcard(id, {
		initialData: { data: initialFlashcard, success: true },
	});

	const { data: flashcardParticipant } = useGetFlashcardParticipants(
		id,
		{ orderBy: "cAt:desc", count: FLASHCARD_RESULT_PAGE_COUNT },
		{
			initialData: { hits: initialParticipants, total: initialPartTotal },
		}
	);

	const flashcard = flashcardData?.data as Flashcard;
	const participants = flashcardParticipant?.hits ?? [];
	const participantTotal = flashcardParticipant?.total ?? 0;

	return (
		<div className="flex flex-col p-8 gap-8">
			<div>
				<div className=" flex items-center justify-between">
					<h1 className="text-xl font-bold">{flashcard.name}</h1>
					<div className="flex gap-2 items-center">
						<Link href={`/flashcards/${id}/view`}>
							<Button variant="primary">View Flashcard</Button>
						</Link>
						<ReportBtn flashcard={flashcard} />
						{isAuthor && <ActionBtn id={flashcard.id} />}
					</div>
				</div>
				<div className="text-slate-600 pb-4">{flashcard.description}</div>
				{flashcard.Tags.length > 0 && (
					<div className="space-x-2 line-clamp-1 flex-1 mb-4">
						{flashcard.Tags.map((tag) => (
							<Badge
								key={tag.name}
								className="p-2 rounded-lg text-blue-600 bg-blue-200 cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-200"
							>
								{tag.name}
							</Badge>
						))}
					</div>
				)}
			</div>
			<CardContents contents={flashcard.Contents} />
			<div className="mt-5">
				<CardResults
					card_id={flashcard.id}
					participants={participants}
					total={participantTotal}
				/>
			</div>
			<div>
				<Comments content_id={initialFlashcard.id} type="FLASHCARD" />
			</div>
		</div>
	);
}

export default FlashcardDetail;
