"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FlashcardContent } from "@/types/schema";
import React, { useState } from "react";

interface FlashcardDetailCardProps {
	content: FlashcardContent;
	flipped?: boolean;
}

function FlashcardDetailCard({ content, flipped }: FlashcardDetailCardProps) {
	return (
		<div
			className={`
					drop-shadow-md flex flex-col gap-2 flip-card bg-transparent w-[50vw] h-[300px] ${
						flipped ? "flip-card-active" : ""
					}
				`}
		>
			<div className="flip-card-inner w-full h-full bg-white rounded-lg">
				<div className="text-xl flip-card-front bg-white rounded-lg flex justify-center items-center">
					{content.question}
				</div>
				<div className="text-xl flip-card-back bg-white rounded-lg flex justify-center items-center">
					{content.answer}
				</div>
			</div>
		</div>
	);
}

export default FlashcardDetailCard;
