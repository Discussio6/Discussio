"use client";

import { Flashcard } from "@/types/schema";
import React, { useCallback, useState } from "react";
import FlashcardDetailCard from "./FlashcardDetailCard";
import { Button } from "@/components/ui/button";
import { CheckIcon, SaveIcon, ShareIcon, XIcon } from "lucide-react";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

interface FlashcardDetailProps {
	flashcard: Flashcard;
	index: number;
}

function FlashcardDetail({ flashcard, index }: FlashcardDetailProps) {
	const router = useRouter();
	const [showAnswer, setShowAnswer] = useState(false);

	const handleNext = useCallback(() => {
		if (index === flashcard.Contents.length) {
			router.push(`/flashcards/${flashcard.id}`);
		} else {
			router.push(`/flashcards/${flashcard.id}/${index + 1}`);
		}
		setShowAnswer(false);
	}, []);
	const handlePrev = useCallback(() => {
		if (index > 1) {
			router.push(`/flashcards/${flashcard.id}/${index - 1}`);
		}
		setShowAnswer(false);
	}, []);

	return (
		<div className="flex flex-col gap-4">
			<FlashcardDetailCard
				key={flashcard.Contents[index - 1].id}
				content={flashcard.Contents[index - 1]}
				flipped={showAnswer}
			/>
			{!showAnswer ? (
				<div className="flex gap-2 items-center justify-between">
					<Button
						size="icon"
						className="bg-green-700 hover:bg-green-700/90"
						onClick={handlePrev}
					>
						<CaretLeftIcon className="w-6 h-6" />
					</Button>
					<Button
						className="bg-orange-500 hover:bg-orange-500/80"
						onClick={() => setShowAnswer(true)}
					>
						Show Answer
					</Button>
					<Button
						size="icon"
						className="bg-green-700 hover:bg-green-700/90"
						onClick={handleNext}
					>
						<CaretRightIcon className="w-6 h-6" />
					</Button>
				</div>
			) : (
				<div className="flex gap-2 items-center justify-between">
					<Button className="flex gap-2 items-center bg-orange-500 hover:bg-orange-500/80">
						<SaveIcon className="w-4 h-4" />
						<span>Save</span>
					</Button>
					<Button
						className="flex gap-2 items-center bg-green-500 hover:bg-green-500/80"
						onClick={handleNext}
					>
						<CheckIcon className="w-4 h-4" />
						<span>Correct</span>
					</Button>
					<Button
						className="flex gap-2 items-center bg-red-500 hover:bg-red-500/80"
						onClick={() => setShowAnswer(false)}
					>
						<XIcon className="w-4 h-4" />
						<span>Wrong</span>
					</Button>
					<Button className="flex gap-2 items-center bg-zinc-500 hover:bg-zinc-500/80">
						<ShareIcon className="w-4 h-4" />
						<span>Share</span>
					</Button>
				</div>
			)}
		</div>
	);
}

export default FlashcardDetail;
