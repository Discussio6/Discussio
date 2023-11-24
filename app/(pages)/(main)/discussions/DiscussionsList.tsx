"use client";

import { useGetDiscussions } from "@/lib/queries/discussions";
import { Discussion } from "@/types/schema";
import DiscussionItem from "@/components/common/DiscussionItem";
import React from "react";

interface DiscussionsListProps {
	initialDiscussions: Discussion[];
	initialTotal: number;
	page?: number;
	count?: number;
	orderBy?: string;
}

function DiscussionsList({
	initialDiscussions,
	initialTotal,
	page,
	count,
	orderBy,
}: DiscussionsListProps) {
	const { data: discussions } = useGetDiscussions(
		{ page, count, orderBy, parent_id: 0, isQna: false },
		{
			initialData: { total: initialTotal, hits: initialDiscussions },
		}
	);
	return (
		<article className="flex flex-col gap-2">
			<div className="text-lg font-bold">{discussions?.total} results</div>
			{discussions && discussions.total > 0 ? (
				<div className="flex flex-col gap-4">
					{discussions?.hits.map((discussion) => (
						<DiscussionItem key={discussion.id} discussion={discussion} />
					))}
				</div>
			) : (
				<div className="text-center my-16 text-slate-500">No results found</div>
			)}
		</article>
	);
}

export default DiscussionsList;
