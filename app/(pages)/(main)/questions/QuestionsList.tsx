"use client";

import { useGetDiscussions } from "@/lib/queries/discussions";
import { Discussion } from "@/types/schema";
import DiscussionItem from "@/components/common/DiscussionItem";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as qs from "qs";

interface QuestionsListProps {
	initialDiscussions: Discussion[];
	initialTotal: number;
	page?: number;
	count?: number;
	orderBy?: string;
	isAccepted?: string;
}

function QuestionsList({
	initialDiscussions,
	initialTotal,
	page,
	count,
	orderBy,
	isAccepted,
}: QuestionsListProps) {
	const router = useRouter();
	const { data: discussions } = useGetDiscussions(
		{
			page,
			count,
			orderBy,
			isQna: true,
			...(isAccepted ? { isAccepted: isAccepted === "true" } : {}),
		},
		{
			initialData: { total: initialTotal, hits: initialDiscussions },
		}
	);

	const handleChange = (value: string) => {
		const isAccepted =
			value === "solved" ? true : value === "unsolved" ? false : undefined;
		router.push(
			`/questions?${qs.stringify({
				isQna: true,
				isAccepted,
			})}`
		);
	};

	const currentFilter =
		isAccepted === "true"
			? "solved"
			: isAccepted === "false"
			? "unsolved"
			: "all";

	return (
		<article className="flex flex-col gap-2">
			<div className="flex justify-between items-center">
				<div className="text-lg font-bold">{discussions?.total} results</div>
				<div className="w-[180px]">
					<Select onValueChange={handleChange} value={currentFilter}>
						<SelectTrigger>
							<SelectValue placeholder="filter..." />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All</SelectItem>
							<SelectItem value="solved">Solved</SelectItem>
							<SelectItem value="unsolved">Unsolved</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
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

export default QuestionsList;
