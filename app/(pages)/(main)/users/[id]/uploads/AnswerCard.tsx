import DiscussionItem from "@/components/common/DiscussionItem";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useGetDiscussions } from "@/lib/queries/discussions";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import React, { useState } from "react";

function AnswerCard() {
	const { id } = useParams();
	const [page, setPage] = useState(1);
	const { data: answersData } = useGetDiscussions(
		{
			isQna: true,
			page,
			count: 10,
			parent_id: -1,
			orderBy: "cAt:desc",
			userId: id as string,
		},
		{ suspense: true }
	);
	const total = answersData?.total!;
	const totalPage = Math.ceil(total / 10);

	const handleNext = () => {
		if (page === totalPage) return;
		setPage(page + 1);
	};

	const handlePrev = () => {
		if (page === 1) return;
		setPage(page - 1);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Answers</CardTitle>
				<CardDescription>{total} Answers</CardDescription>
			</CardHeader>
			<CardContent>
				{total > 0 ? (
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-3">
							{answersData?.hits.map((discussion) => (
								<DiscussionItem key={discussion.id} discussion={discussion} />
							))}
						</div>
						<div className="flex items-center justify-between">
							<Button
								size="icon"
								variant="outline"
								disabled={page === 1}
								onClick={handlePrev}
							>
								<CaretLeftIcon />
							</Button>
							<div className="text-sm text-slate-500">
								{page} of {totalPage}
							</div>
							<Button
								size="icon"
								variant="outline"
								disabled={page === totalPage}
								onClick={handleNext}
							>
								<CaretRightIcon />
							</Button>
						</div>
					</div>
				) : (
					<div className="flex justify-center items-center text-slate-500 min-h-[80px]">
						No answers yet
					</div>
				)}
			</CardContent>
		</Card>
	);
}

export default AnswerCard;
