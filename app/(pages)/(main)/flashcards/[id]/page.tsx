import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface Props {
	params: {
		id: string;
	};
}

function FlashcardDetailPage(props: Props) {
	return (
		<Link href={`/flashcards/${props.params.id}/view`}>
			<Button variant="primary">View Flashcard</Button>
		</Link>
	);
}

export default FlashcardDetailPage;
