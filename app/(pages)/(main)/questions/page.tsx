import DiscussionItem from "@/components/common/DiscussionItem";
import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Discussion } from "@/types/schema";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface QuestionsPageProps {
	searchParams: {
		count?: string;
		page?: string;
	};
}

const genLink = (page: number) => `/questions?page=${page}`;

async function QuestionsPage({
	searchParams: { page, count },
}: QuestionsPageProps) {
	const numPage = page ? parseInt(page) : 1;
	const numCount = count ? parseInt(count) : 10;
	const total = await db.discussion.count({ where: { parent_id: null } });
	const discussions = (await db.discussion.findMany({
		where: { parent_id: null },
		include: { User: true },
		take: numCount,
		skip: (numPage - 1) * numCount,
		orderBy: { cAt: "desc" },
	})) as Discussion[];

	return (
		<main className="container flex flex-col my-8 gap-8">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">전체 질문</h1>
				<Link href="/questions/upload">
					<Button variant="primary" className="flex gap-1">
						<PencilIcon className="w-4 h-4" />
						질문 쓰기
					</Button>
				</Link>
			</div>
			<article className="flex flex-col gap-2">
				<div className="text-large font-bold">{total}개 결과</div>
				<div className="flex flex-col gap-4">
					{discussions.map((discussion) => (
						<DiscussionItem key={discussion.id} discussion={discussion} />
					))}
				</div>
			</article>
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
