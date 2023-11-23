import React from "react";
import FlashcardEdit from "./FlashcardEdit";
import { db } from "@/lib/db";
import { Flashcard } from "@/types/schema";

interface Props {
	params: {
		id: string;
	};
}

async function FlashcardEditPage(props: Props) {
	const flashcard = (await db.flashcard.findUnique({
		where: { id: parseInt(props.params.id) },
		include: {
			User: true,
			Tags: true,
			Contents: { orderBy: { order: "asc" } },
			FlashcardFavorites: { select: { User: true, cAt: true } },
		},
	})) as Flashcard;

	return <FlashcardEdit initialData={flashcard} />;
}

export default FlashcardEditPage;
