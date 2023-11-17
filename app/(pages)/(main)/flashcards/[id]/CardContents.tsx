"use client";

import React from "react";

import { FlashcardContent } from "@/types/schema";
import CardContentItem from "./CardContentItem";

interface CardContentsProps {
	contents: FlashcardContent[];
}

function CardContents({ contents }: CardContentsProps) {
	return (
		<div className="flex flex-col gap-2">
            <h1 className="font-bold text-lg">Card Contents ({contents.length})</h1>
			<div className="flex flex-col gap-2">
				{contents.map((content) => (
					<CardContentItem key={content.id} content={content} />
				))}
			</div>
		</div>
	);
}

export default CardContents;
