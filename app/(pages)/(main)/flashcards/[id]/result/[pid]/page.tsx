import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { FlashcardParticipant } from "@/types/schema";
import { AlertCircleIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";
import React from "react";
import ResultCard from "./ResultCard";
import Link from "next/link";

interface Props {
	params: {
		id: string;
		pid: string;
	};
}

async function FlashcardResultPage(props: Props) {
	const { id, pid } = props.params;
	const participant = (await db.flashcardParticipant.findUnique({
		where: {
			id: parseInt(pid),
		},
		include: {
			User: true,
			FlashcardAnswer: {
				include: {
					Content: true,
				},
			},
		},
	})) as FlashcardParticipant;

	const correctCount = participant.FlashcardAnswer.filter(
		(item) => item.status === "CORRECT"
	).length;
	const wrongCount = participant.FlashcardAnswer.filter(
		(item) => item.status === "WRONG"
	).length;
	const unansweredCount = participant.FlashcardAnswer.filter(
		(item) => item.status === "UNANSWERED"
	).length;

	const answers = participant.FlashcardAnswer.sort(
		(a, b) => a.Content.order - b.Content.order
	);

	return (
		<div className="flex flex-col gap-8 m-4">
			<h1 className="text-xl font-bold text-center">Flashcard Result</h1>
			<div className="rounded-lg flex items-center self-center gap-4 font-bold">
				<div className="flex gap-2 items-center">
					<CheckCircleIcon className="text-green-600" />
					<span>{correctCount}</span>
				</div>
				<div className="flex gap-2 items-center">
					<XCircleIcon className="text-red-600" />
					<span>{wrongCount}</span>
				</div>
				<div className="flex gap-2 items-center">
					<AlertCircleIcon className="text-orange-600" />
					<span>{unansweredCount}</span>
				</div>
			</div>
			<div className="flex flex-col gap-4">
				{answers.map((item) => {
					return <ResultCard item={item} />;
				})}
			</div>
			<Link href={`/flashcards/${participant.card_id}`}>
				<Button variant="primary" className="w-full">
					Return to flashcard
				</Button>
			</Link>
		</div>
	);
}

export default FlashcardResultPage;
