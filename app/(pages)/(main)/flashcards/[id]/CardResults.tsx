"use client";

import { FlashcardParticipant } from "@/types/schema";
import React, { useCallback, useState } from "react";
import CardResultItem from "./CardResultItem";
import { useGetFlashcardParticipants } from "@/lib/queries/flashcards";
import { Button } from "@/components/ui/button";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";

interface CardResultsProps {
	card_id: number;
	total: number;
	participants: FlashcardParticipant[];
}

const PAGE_SIZE = 10;

function CardResults({
	card_id,
	total,
	participants: initialData,
}: CardResultsProps) {
	const [page, setPage] = useState(1);

	const { data: participants, isLoading } = useGetFlashcardParticipants(
		card_id,
		{ count: PAGE_SIZE, orderBy: "cAt:desc", page },
		{ initialData: { hits: initialData, total } }
	);

	const hasNext = (page - 1) * PAGE_SIZE + (participants?.hits?.length ?? 0) < total;
	const hasPrev = page > 1;

	const handleNext = useCallback(() => {
		if (!hasNext) return;
		setPage((prev) => prev + 1);
	}, [page, hasNext]);

	const handlePrev = useCallback(() => {
		if (hasPrev) setPage((prev) => prev - 1);
	}, [page]);

	if (isLoading) return <div>loading</div>;

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<h1>{`${total} Participants`}</h1>
				{(participants?.hits ?? []).map((participant) => (
					<CardResultItem participant={participant} />
				))}
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
