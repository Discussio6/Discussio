import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Discussion } from "@/types/schema";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import DiscussionsList from "./DiscussionsList";

interface DiscussionPageProps {
	searchParams: {
		count?: string;
		page?: string;
		orderBy?: string;
	};
}

const genLink = (page: number) => `/discussions?page=${page}`;

export const metadata: Metadata = {
	title: "Discussions | Discussio",
};

async function DiscussionPage({
	searchParams: { page, count, orderBy },
}: DiscussionPageProps) {
	const numPage = page ? parseInt(page) : 1;
	const numCount = count ? parseInt(count) : 10;
	const sort = orderBy || "cAt:desc";
	const total = await db.discussion.count({
		where: { parent_id: null, isQna: false },
	});
	const discussions = (await db.discussion.findMany({
		where: { parent_id: null, isQna: false },
		include: {
			User: true,
			Likes: { select: { User: true, cAt: true } },
			DiscussionFavorites: { select: { User: true, cAt: true } },
			Tags: true,
		},
		take: numCount,
		skip: (numPage - 1) * numCount,
		orderBy: { [sort.split(":")[0]]: sort.split(":")[1] as "asc" | "desc" },
	})) as Discussion[];

	return (
		<main className="container flex flex-col my-8 gap-8">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">Discussions</h1>
				<Link href="/discussions/upload">
					<Button variant="primary" className="flex gap-1">
						<PencilIcon className="w-4 h-4" />
						Post Discussion
					</Button>
				</Link>
			</div>
			<DiscussionsList
				initialDiscussions={discussions}
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
					pageCnt={10}
					genLink={genLink}
				/>
			</div>
		</main>
	);
}

export default DiscussionPage;
