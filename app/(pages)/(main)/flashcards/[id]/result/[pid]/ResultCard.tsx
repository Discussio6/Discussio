"use client";

import { FlashcardAnswer } from "@/types/schema";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { AlertCircleIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";
import React, { useState } from "react";

interface ResultCardProps {
	item: FlashcardAnswer;
}

function ResultCard({ item }: ResultCardProps) {
	const [open, setOpen] = useState(false);

	return (
		<div className="p-4 flex flex-col gap-4 rounded-lg justify-between border">
			<button
				className="flex justify-between items-center"
				onClick={() => setOpen((open) => !open)}
			>
				<div className="flex gap-4 items-center">
					{item.status === "CORRECT" ? (
						<CheckCircleIcon className="text-green-600" />
					) : item.status === "WRONG" ? (
						<XCircleIcon className="text-red-600" />
					) : (
						<AlertCircleIcon className="text-orange-600" />
					)}
					<div>{item.Content.question}</div>
				</div>
				<CaretDownIcon className="w-6 h-6" />
			</button>
			{open && <div>{item.Content.answer}</div>}
		</div>
	);
}

export default ResultCard;
