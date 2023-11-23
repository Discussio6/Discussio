import { db } from "@/lib/db";
import { Flashcard, FlashcardParticipant } from "@/types/schema";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import FlashcardDetail from "./FlashcardDetail";
import { FLASHCARD_RESULT_PAGE_COUNT } from "@/constants/data";

interface Props {
	params: {
		id: string;
	};
}

async function FlashcardDetailPage(props: Props) {
	const session = await getServerSession(authOptions);
	const flashcard = (await db.flashcard.findUnique({
		where: { id: parseInt(props.params.id) },
		include: {
			User: true,
			Tags: true,
			FlashcardFavorites: { select: { User: true, cAt: true } },
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
		take: FLASHCARD_RESULT_PAGE_COUNT,
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
