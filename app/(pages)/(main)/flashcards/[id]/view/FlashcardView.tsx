"use client";

import { Flashcard } from "@/types/schema";
import React, { useCallback, useState } from "react";
import FlashcardViewCard from "./FlashcardViewItem";
import { Button } from "@/components/ui/button";
import {
	CheckCircleIcon,
	CheckIcon,
	RepeatIcon,
	XCircleIcon,
	XIcon,
} from "lucide-react";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import {
	postAnswerProps,
	usePostFlashcardParticipant,
} from "@/lib/queries/flashcards";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

interface FlashcardViewProps {
	flashcard: Flashcard;
}

function FlashcardView({ flashcard }: FlashcardViewProps) {
	const { toast } = useToast();
	const router = useRouter();
	const { status } = useSession();
	const postParticipant = usePostFlashcardParticipant();
	const [index, setIndex] = useState(1);
	const [result, setResult] = useState<postAnswerProps[]>(
		flashcard.Contents.map((item) => ({
			id: item.id,
			status: "UNANSWERED",
		}))
	);
	const [showAnswer, setShowAnswer] = useState(false);

	const total = flashcard.Contents.length;

	const handleNext = useCallback(() => {
		if (index < total) {
			setIndex(index + 1);
		}
		setShowAnswer(false);
	}, [index, result, total, flashcard.id, router]);

	const handlePrev = useCallback(() => {
		if (index > 1) {
			setIndex(index - 1);
		}
		setShowAnswer(false);
	}, [index]);

	const handleCorrect = useCallback(() => {
		setResult((prev) =>
			prev.map((item) =>
				item.id === flashcard.Contents[index - 1].id
					? { ...item, status: "CORRECT" }
					: item
			)
		);
		handleNext();
	}, [index, handleNext]);

	const handleWrong = useCallback(() => {
		setResult((prev) =>
			prev.map((item) =>
				item.id === flashcard.Contents[index - 1].id
					? { ...item, status: "WRONG" }
					: item
			)
		);
		handleNext();
	}, [index, handleNext]);

	const handleTryAgain = useCallback(() => {
		setResult((prev) => {
			return prev.map((item) =>
				item.id === flashcard.Contents[index - 1].id
					? { ...item, status: "UNANSWERED" }
					: item
			);
		});
		setShowAnswer(false);
	}, [index]);

	const handleSubmit = useCallback(() => {
		if (confirm("Are you sure you want to finish?")) {
			if (status !== "authenticated") {
				toast({
					title: "Please login to save your result",
					variant: "destructive",
					duration: 2000,
				});
				return;
			}
			postParticipant.mutate(
				{
					card_id: flashcard.id,
					contents: result,
				},
				{
					onSuccess: (data, variables, context) => {
						router.push(`/flashcards/${flashcard.id}/result/${data.data.id}`);
					},
				}
			);
		}
	}, [result, router, flashcard.id]);

	return (
		<div className="flex flex-col justify-center gap-4">
			<div className="flex flex-col gap-1">
				<div className="flex items-center justify-between">
					<h2 className="text-sm font-bold">
						{index} / {total}
					</h2>
					<div className="flex items-center gap-4 text-sm">
						<div className="flex gap-2 items-center text-green-600">
							<CheckCircleIcon className="w-4 h-4" />
							{result.filter((item) => item.status === "CORRECT").length}
						</div>
						<div className="flex gap-2 items-center text-red-600">
							<XCircleIcon className="w-4 h-4" />
							{result.filter((item) => item.status === "WRONG").length}
						</div>
					</div>
				</div>
				<Progress value={(index / total) * 100} indicatorColor="bg-green-500" />
			</div>
			<div className="flex flex-col gap-4">
				<FlashcardViewCard
					key={flashcard.Contents[index - 1].id}
					content={flashcard.Contents[index - 1]}
					flipped={showAnswer}
					status={result[index - 1].status}
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
					<div className="flex gap-8 items-center justify-center">
						<Button
							className="flex gap-2 items-center bg-green-500 hover:bg-green-500/80"
							onClick={handleCorrect}
						>
							<CheckIcon className="w-4 h-4" />
							<span>Correct</span>
						</Button>
						<Button
							className="flex gap-2 items-center bg-red-500 hover:bg-red-500/80"
							onClick={handleWrong}
						>
							<XIcon className="w-4 h-4" />
							<span>Wrong</span>
						</Button>
						<Button
							className="flex gap-2 items-center bg-zinc-500 hover:bg-zinc-500/80"
							onClick={handleTryAgain}
						>
							<RepeatIcon className="w-4 h-4" />
							<span>Try again</span>
						</Button>
					</div>
				)}
			</div>
			<div className="flex justify-end mt-4">
				<Button variant="primary" onClick={handleSubmit}>
					Show Results
				</Button>
			</div>
		</div>
	);
}

export default FlashcardView;
