import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useGetFlashcards } from "@/lib/queries/flashcards";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import FlashcardItem from "../../../flashcards/FlashcardItem";
import { Button } from "@/components/ui/button";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";

function FlashcardCard() {
	const { data: session } = useSession();
	const [page, setPage] = useState(1);
	const { data: flashcardsData } = useGetFlashcards(
		{
			count: 10,
			page,
			orderBy: "cAt:desc",
			favoriteUserId: session?.id,
		},
		{ suspense: true }
	);
	const total = flashcardsData?.total!;
	const totalPage = Math.ceil(total / 10);

	const handleNext = () => {
		if (page === totalPage) return;
		setPage(page + 1);
	};

	const handlePrev = () => {
		if (page === 1) return;
		setPage(page - 1);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Flashcards</CardTitle>
				<CardDescription>{total} Flashcards</CardDescription>
			</CardHeader>
			<CardContent>
				{total > 0 ? (
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-3">
							{flashcardsData?.hits.map((flashcard) => (
								<FlashcardItem key={flashcard.id} flashcard={flashcard} />
							))}
						</div>
						<div className="flex items-center justify-between">
							<Button
								size="icon"
								variant="outline"
								disabled={page === 1}
								onClick={handlePrev}
							>
								<CaretLeftIcon />
							</Button>
							<div className="text-sm text-slate-500">
								{page} of {totalPage}
							</div>
							<Button
								size="icon"
								variant="outline"
								disabled={page === totalPage}
								onClick={handleNext}
							>
								<CaretRightIcon />
							</Button>
						</div>
					</div>
				) : (
					<div className="flex justify-center items-center text-slate-500 min-h-[80px]">
						No flashcards yet
					</div>
				)}
			</CardContent>
		</Card>
	);
}

export default FlashcardCard;
