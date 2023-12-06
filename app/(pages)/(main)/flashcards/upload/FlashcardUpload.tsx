"use client";

import React, { useCallback } from "react";
import UploadWarningCard from "@/components/common/UploadWarningCard";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useSession } from "next-auth/react";
import FlashcardForm, {
	FlashcardFormType,
	flashcardFormSchema,
} from "@/components/flashcards/FlashcardForm";
import { usePostFlashcard } from "@/lib/queries/flashcards";
import { useToast } from "@/components/ui/use-toast";

function FlashcardUpload() {
	const { status } = useSession();
	const { toast } = useToast();
	const router = useRouter();
	const postFlashcard = usePostFlashcard();

	const handleSubmit = useCallback(
		(values: z.infer<typeof flashcardFormSchema>, form: FlashcardFormType) => {
			if (status !== "authenticated") {
				toast({
					title: "Please login to upload a flashcard",
					variant: "destructive",
					duration: 2000,
				});
				return;
			}
			postFlashcard.mutate(
				{
					...values,
				},
				{
					onSuccess(data, variables, context) {
						form.reset();
						router.push(`/flashcards/${data.data.id}`);
					},
					onError: (err) => {
						console.log(err);
						alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
					},
				}
			);
		},
		[postFlashcard]
	);

	return (
		<main className="container flex flex-col my-8 gap-8">
			<UploadWarningCard />
			<FlashcardForm onSubmit={handleSubmit} />
		</main>
	);
}

export default FlashcardUpload;
