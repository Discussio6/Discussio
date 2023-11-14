import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Flashcard, FlashcardParticipant } from "@/types/schema";
import Link from "next/link";
import React from "react";
import CardResults from "./CardResults";
import { Badge } from "@/components/ui/badge";

interface Props {
	params: {
		id: string;
	};
}

async function FlashcardDetailPage(props: Props) {
	const flashcard = (await db.flashcard.findUnique({
		where: { id: parseInt(props.params.id) },
		include: { User: true, Tags: true, Contents: true },
	})) as Flashcard;
	const participantTotal = await db.flashcardParticipant.count({
		where: { card_id: parseInt(props.params.id) },
	});
	const participants = (await db.flashcardParticipant.findMany({
		where: { card_id: parseInt(props.params.id) },
		include: { User: true, FlashcardAnswer: { include: { Content: true } } },
	})) as FlashcardParticipant[];

	return (
		<div className="flex flex-col p-8">
			<div className=" flex items-center justify-between">
				<h1 className="text-xl font-bold">{flashcard.name}</h1>
				<Link href={`/flashcards/${props.params.id}/view`}>
					<Button variant="primary">View Flashcard</Button>
				</Link>
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
			<CardResults
				card_id={flashcard.id}
				participants={participants}
				total={participantTotal}
			/>
		</div>
	);
}

export default FlashcardDetailPage;
