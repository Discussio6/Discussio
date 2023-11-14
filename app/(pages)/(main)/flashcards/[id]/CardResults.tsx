"use client";

import { FlashcardParticipant } from "@/types/schema";
import React from "react";
import CardResultItem from "./CardResultItem";
import { useGetFlashcardParticipants } from "@/lib/queries/flashcards";

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
	const { data: participants, isLoading } = useGetFlashcardParticipants(
		card_id,
		{ count: 10, orderBy: "cAt:desc", page: 1 },
		{ initialData: { hits: initialData, total } }
	);

	if (isLoading) return <div>loading</div>;

	return (
		<div className="flex flex-col gap-2">
			<h1>{`${total} Participants`}</h1>
			{(participants?.hits ?? []).map((participant) => (
				<CardResultItem participant={participant} />
			))}
		</div>
	);
}

export default CardResults;
