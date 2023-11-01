import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Discussion } from "@/types/schema";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import QuestionsList from "./QuestionsList";

interface QuestionsPageProps {
	searchParams: {
		count?: string;
		page?: string;
		orderBy?: string;
		isAccepted?: string;
	};
}

const genLink = (page: number) => `/questions?page=${page}`;

async function QuestionsPage({
	searchParams: { page, count, orderBy, isAccepted },
}: QuestionsPageProps) {
	const numPage = page ? parseInt(page) : 1;
	const numCount = count ? parseInt(count) : 10;
	const sort = orderBy || "cAt:desc";
	const total = await db.discussion.count({
		where: {
			parent_id: null,
			isQna: true,
			...(isAccepted ? { isAccepted: isAccepted === "true" } : {}),
		},
	});
	const discussions = (await db.discussion.findMany({
		where: {
			parent_id: null,
			isQna: true,
			...(isAccepted ? { isAccepted: isAccepted === "true" } : {}),
		},
		include: {
			User: true,
			Likes: { select: { User: true, cAt: true } },
			Tags: true,
		},
		take: numCount,
		skip: (numPage - 1) * numCount,
		orderBy: { [sort.split(":")[0]]: sort.split(":")[1] as "asc" | "desc" },
	})) as Discussion[];

	return (
		<main className="container flex flex-col my-8 gap-8">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">All questions</h1>
				<Link href="/questions/upload">
					<Button variant="primary" className="flex gap-1">
						<PencilIcon className="w-4 h-4" />
						Ask Question
					</Button>
				</Link>
			</div>
			<QuestionsList
				initialDiscussions={discussions}
				initialTotal={total}
				page={numPage}
				count={numCount}
				orderBy={sort}
				isAccepted={isAccepted}
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

export default QuestionsPage;
