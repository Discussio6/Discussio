"use client";

import { useGetFlashcards } from "@/lib/queries/flashcards";
import { Flashcard } from "@/types/schema";
import FlashcardItem from "./FlashcardItem";

interface FlashcardListProps {
	initialFlashcards: Flashcard[];
	initialTotal: number;
	page?: number;
	count?: number;
	orderBy?: string;
}

function FlashcardList({
	initialFlashcards,
	initialTotal,
	page,
	count,
	orderBy,
}: FlashcardListProps) {
	const { data: flashcards } = useGetFlashcards(
		{ page, count, orderBy },
		{
			initialData: { total: initialTotal, hits: initialFlashcards },
		}
	);
	return (
		<article className="flex flex-col gap-2">
			<div className="text-large font-bold">{flashcards?.total} results</div>
			{flashcards && flashcards.total > 0 ? (
				<div className="flex flex-col gap-4">
					{flashcards?.hits.map((flashcard) => (
						<FlashcardItem key={flashcard.id} flashcard={flashcard} />
					))}
				</div>
			) : (
				<div className="text-center my-16 text-slate-500">No results found</div>
			)}
		</article>
	);
}

export default FlashcardList;
