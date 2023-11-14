import ProfileCard from "@/components/common/ProfileCard";
import { FlashcardParticipant } from "@/types/schema";
import React from "react";

interface CardResultItemProps {
	participant: FlashcardParticipant;
}

function CardResultItem({ participant }: CardResultItemProps) {
	const correctCount = participant.FlashcardAnswer.filter(
		(item) => item.status === "CORRECT"
	).length;
	const total = participant.FlashcardAnswer.length;

	return (
		<div className="bg-slate-100 rounded-lg p-4 flex justify-between">
			<div className="font-bold flex items-center gap-2">
				<span>{Math.round((correctCount / total) * 100)}</span>
				<span>{`(${correctCount} / ${total})`}</span>
			</div>
			<ProfileCard
				name={participant.User.name}
				image={participant.User.image}
			/>
		</div>
	);
}

export default CardResultItem;
