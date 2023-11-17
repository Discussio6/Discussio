import { Separator } from "@/components/ui/separator";
import { FlashcardContent } from "@/types/schema";
import React from "react";

interface CardContentItemProps {
	content: FlashcardContent;
}

function CardContentItem({ content }: CardContentItemProps) {
	return (
		<div key={content.id} className="grid grid-cols-2 border p-4 shadow-sm rounded-lg gap-3">
			<div className="font-bold border-r">
				{content.question}
			</div>
			<div className="text-slate-600">
				{content.answer}
			</div>
		</div>
	);
}

export default CardContentItem;
