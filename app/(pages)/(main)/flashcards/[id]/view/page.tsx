import React from "react";
import FlashcardView from "./FlashcardView";
import { db } from "@/lib/db";
import { Flashcard } from "@/types/schema";

interface Props {
	params: {
		id: string;
	};
}

async function FlashcardViewPage(props: Props) {
	const flashcard = (await db.flashcard.findUnique({
		where: {
			id: parseInt(props.params.id),
		},
		include: {
			Contents: true,
			User: true,
			Tags: true,
		},
	})) as Flashcard;

	return (
		<div className="bg-green-200 justify-center flex h-[calc(100vh_-_100px)]">
			<FlashcardView flashcard={flashcard} />
		</div>
	);
}

export default FlashcardViewPage;
