import React from "react";
import FlashcardDetail from "./FlashcardDetail";
import { db } from "@/lib/db";
import { Flashcard } from "@/types/schema";
import { Progress } from "@/components/ui/progress";

interface Props {
	params: {
		id: string;
		contentId: string;
	};
}

async function FlashcardDetailPage(props: Props) {
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

	const index = parseInt(props.params.contentId);
	const total = flashcard.Contents.length;

	return (
		<div className="bg-green-200 justify-center flex h-[calc(100vh_-_100px)]">
			<div className="flex flex-col justify-center gap-4">
				<div className="flex flex-col gap-1">
					<h2 className="text-sm font-bold">
						{index} / {total}
					</h2>
					<Progress
						value={(index / total) * 100}
						indicatorColor="bg-green-500"
					/>
				</div>
				<FlashcardDetail flashcard={flashcard} index={index} />
			</div>
		</div>
	);
}

export default FlashcardDetailPage;
