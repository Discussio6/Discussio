import ProfileCard from "@/components/common/ProfileCard";
import { FlashcardParticipant } from "@/types/schema";
import moment from "moment";
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
		<div className="shadow-md rounded-lg p-4 flex flex-col justify-between aspect-square">
			<div className="text-xs self-end">{moment(participant.cAt).fromNow()}</div>
			<div className="font-bold text-sm justify-center self-center flex gap-2">
				<span>{Math.round((correctCount / total) * 100)}</span>
				<span>{`(${correctCount} / ${total})`}</span>
			</div>
			<ProfileCard
				name={participant.User.name}
				image={participant.User.image}
				id={participant.User.id}
			/>
		</div>
	);
}

export default CardResultItem;
