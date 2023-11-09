"use client";

import React from "react";
import { Flashcard } from "@/types/schema";
import moment from "moment";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ProfileCard from "@/components/common/ProfileCard";
import { Badge } from "@/components/ui/badge";

interface FlashcardItemProps {
	flashcard: Flashcard;
}

function FlashcardItem({ flashcard }: FlashcardItemProps) {
	return (
		<div className={cn("flex flex-col gap-1 border p-4 rounded-lg")}>
			<Link
				href={`/flashcards/${flashcard.id}`}
				className="text-lg font-bold line-clamp-2 text-blue-500 hover:text-blue-700 cursor-pointer transition-all duration-200 ease-in-out"
			>
				{flashcard.name}
			</Link>
			<div className="flex gap-2 text-xs text-slate-500 font-bold mb-2">
				<div>{flashcard.Contents.length} Questions</div>
			</div>
			<div className="text-sm line-clamp-2">{flashcard.description}</div>
			<div className="mt-2 flex justify-between items-center">
				{flashcard.Tags.length > 0 && (
					<div className="space-x-2 line-clamp-1 flex-1">
						{flashcard.Tags.map((tag) => (
							<Badge
								key={tag.name}
								className="p-2 rounded-lg text-blue-600 bg-blue-200 cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-200"
							>
								{tag.name}
							</Badge>
						))}
					</div>
				)}
				<div className="flex flex-1" />
				<div className="flex items-center gap-4 shrink-0">
					<ProfileCard
						name={flashcard.User.name}
						image={flashcard.User.image}
					/>
					<div className="shrink-0 flex items-center gap-2 text-xs text-slate-500">
						{moment(flashcard.cAt).fromNow()}
					</div>
				</div>
			</div>
		</div>
	);
}

export default FlashcardItem;
