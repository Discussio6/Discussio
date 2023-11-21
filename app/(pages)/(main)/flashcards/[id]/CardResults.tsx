"use client";

import { FlashcardParticipant } from "@/types/schema";
import React, { useCallback, useState } from "react";
import CardResultItem from "./CardResultItem";
import { useGetFlashcardParticipants } from "@/lib/queries/flashcards";
import { Button } from "@/components/ui/button";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { FLASHCARD_RESULT_PAGE_COUNT } from "@/constants/data";

interface CardResultsProps {
	card_id: number;
	total: number;
	participants: FlashcardParticipant[];
}

function CardResults({
	card_id,
	total,
	participants: initialData,
}: CardResultsProps) {
	const [page, setPage] = useState(1);

	const { data: participants } = useGetFlashcardParticipants(
		card_id,
		{ count: FLASHCARD_RESULT_PAGE_COUNT, orderBy: "cAt:desc", page },
		{ initialData: { hits: initialData, total } }
	);

	const hasNext =
		(page - 1) * FLASHCARD_RESULT_PAGE_COUNT +
			(participants?.hits?.length ?? 0) <
		total;
	const hasPrev = page > 1;

	const handleNext = useCallback(() => {
		if (!hasNext) return;
		setPage((prev) => prev + 1);
	}, [page, hasNext]);

	const handlePrev = useCallback(() => {
		if (hasPrev) setPage((prev) => prev - 1);
	}, [page]);

	return (
		<div className="flex flex-col gap-12">
			<div className="flex flex-col gap-3">
				<h1 className="text-lg font-bold">Participations ({total})</h1>
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
					{(participants?.hits ?? []).map((participant) => (
						<CardResultItem participant={participant} />
					))}
				</div>
			</div>
			<div className="flex gap-4 items-center self-center">
				<Button
					size="icon"
					variant="outline"
					onClick={handlePrev}
					disabled={!hasPrev}
				>
					<CaretLeftIcon className="w-6 h-6" />
				</Button>
				<Button
					size="icon"
					variant="outline"
					onClick={handleNext}
					disabled={!hasNext}
				>
					<CaretRightIcon className="w-6 h-6" />
				</Button>
			</div>
		</div>
	);
}

export default CardResults;
