import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import FlashcardList from "./FlashcardList";
import { db } from "@/lib/db";
import { Flashcard } from "@/types/schema";
import { Metadata } from "next";
import { Acl } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface FlashcardPageProps {
	searchParams: {
		count?: string;
		page?: string;
		orderBy?: string;
	};
}

const genLink = (page: number) => `/flashcards?page=${page}`;

export const metadata: Metadata = {
	title: "Flashcards | Discussio",
};

async function FlashcardsPage({
	searchParams: { page, count, orderBy },
}: FlashcardPageProps) {
	const session = await getServerSession(authOptions);
	const numPage = page ? parseInt(page) : 1;
	const numCount = count ? parseInt(count) : 10;
	const sort = orderBy || "cAt:desc";
	const total = await db.flashcard.count({});
	const flashcards = (await db.flashcard.findMany({
		where: {
			OR: [{ user_id: session?.id }, { acl: Acl.PUBLIC }],
		},
		include: {
			Tags: true,
			User: true,
			FlashcardFavorites: { select: { User: true, cAt: true } },
			Contents: true,
		},
		take: numCount,
		skip: (numPage - 1) * numCount,
		orderBy: { [sort.split(":")[0]]: sort.split(":")[1] as "asc" | "desc" },
	})) as Flashcard[];

	return (
		<main className="container flex flex-col my-8 gap-8">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">Flashcards</h1>
				<Link href="/flashcards/upload">
					<Button variant="primary" className="flex gap-1">
						<PencilIcon className="w-4 h-4" />
						Make Flashcard
					</Button>
				</Link>
			</div>
			<FlashcardList
				initialFlashcards={flashcards}
				initialTotal={total}
				page={numPage}
				count={numCount}
				orderBy={sort}
			/>
			<div className="flex justify-center">
				<Pagination
					page={numPage}
					total={total}
					count={numCount}
					genLink={genLink}
				/>
			</div>
		</main>
	);
}

export default FlashcardsPage;
