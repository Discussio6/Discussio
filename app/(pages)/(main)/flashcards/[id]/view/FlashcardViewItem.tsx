"use client";

import { FlashcardContent } from "@/types/schema";
import { FlashcardAnswerStatus } from "@prisma/client";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import React from "react";

interface FlashcardViewItemProps {
	content: FlashcardContent;
	flipped?: boolean;
	status: FlashcardAnswerStatus;
}

function FlashcardViewItem({
	content,
	flipped,
	status,
}: FlashcardViewItemProps) {
	return (
		<div
			className={`
					drop-shadow-md flex flex-col gap-2 flip-card bg-transparent min-w-full w-[50vw] h-[300px] ${
						flipped ? "flip-card-active" : ""
					}
				`}
		>
			<div className="relative flip-card-inner w-full h-full bg-white rounded-lg">
				<div className="text-xl flip-card-front bg-white rounded-lg flex justify-center items-center">
					<span>{content.question}</span>
					<div className="absolute right-0 top-0 p-2">
						{status === "CORRECT" ? (
							<CheckCircleIcon className="text-green-600" />
						) : status === "WRONG" ? (
							<XCircleIcon className="text-red-600" />
						) : null}
					</div>
				</div>
				<div className="text-xl flip-card-back bg-white rounded-lg flex justify-center items-center">
					{content.answer}
				</div>
			</div>
		</div>
	);
}

export default FlashcardViewItem;
