import { db } from "@/lib/db";
import { Flashcard, FlashcardParticipant } from "@/types/schema";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import FlashcardDetail from "./FlashcardDetail";

interface Props {
	params: {
		id: string;
	};
}

export const part_count = 6;

async function FlashcardDetailPage(props: Props) {
	const session = await getServerSession(authOptions);
	const flashcard = (await db.flashcard.findUnique({
		where: { id: parseInt(props.params.id) },
		include: {
			User: true,
			Tags: true,
			Contents: { orderBy: { order: "asc" } },
		},
	})) as Flashcard;
	const participantTotal = await db.flashcardParticipant.count({
		where: { card_id: parseInt(props.params.id) },
	});
	const participants = (await db.flashcardParticipant.findMany({
		where: { card_id: parseInt(props.params.id) },
		include: { User: true, FlashcardAnswer: { include: { Content: true } } },
		orderBy: { cAt: "desc" },
		take: part_count,
	})) as FlashcardParticipant[];

	const isAuthor = session?.id === flashcard.user_id;

	return (
		<FlashcardDetail
			id={parseInt(props.params.id)}
			initialFlashcard={flashcard}
			initialParticipants={participants}
			initialPartTotal={participantTotal}
			isAuthor={isAuthor}
		/>
	);
}

export default FlashcardDetailPage;
