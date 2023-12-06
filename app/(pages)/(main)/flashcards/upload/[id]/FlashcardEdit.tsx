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
import { usePatchFlashcard } from "@/lib/queries/flashcards";
import { Flashcard } from "@/types/schema";
import { useToast } from "@/components/ui/use-toast";

interface FlashcardEditProps {
	initialData: Flashcard;
}

function FlashcardEdit({ initialData }: FlashcardEditProps) {
	const { status } = useSession();
	const { toast } = useToast();
	const router = useRouter();
	const patchFlashcard = usePatchFlashcard();

	const formData: Partial<z.infer<typeof flashcardFormSchema>> = {
		name: initialData.name,
		description: initialData.description || "",
		tags: initialData.Tags.map((tag) => tag.name),
		acl: initialData.acl,
		contents: initialData.Contents.map((content) => ({
			id: content.id,
			question: content.question,
			answer: content.answer,
			difficulty: content.difficulty,
		})),
	};

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
			patchFlashcard.mutate(
				{
					id: initialData.id,
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
		[patchFlashcard]
	);

	return (
		<main className="container flex flex-col my-8 gap-8">
			<UploadWarningCard />
			<FlashcardForm onSubmit={handleSubmit} initialData={formData} />
		</main>
	);
}

export default FlashcardEdit;
