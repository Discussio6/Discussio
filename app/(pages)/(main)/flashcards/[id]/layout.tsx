import { db } from "@/lib/db";
import { Metadata } from "next";
import React from "react";

interface FlashcardDetailPageLayoutProps {
	children: React.ReactNode;
}

interface Props {
	params: {
		id: string;
	};
}

function FlashcardDetailPageLayout({
	children,
}: FlashcardDetailPageLayoutProps) {
	return <>{children}</>;
}

export default FlashcardDetailPageLayout;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const flashcard = await db.flashcard.findUnique({
		where: { id: parseInt(params.id) },
		select: { name: true },
	});

	return {
		title: `${flashcard?.name} | Discussio`,
	};
}
