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
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useState } from "react";

function DiscussionCard() {
	const { id } = useParams();
	const [page, setPage] = useState(1);
	const { data: discussionsData } = useGetDiscussions(
		{
			isQna: false,
			page,
			count: 10,
			orderBy: "cAt:desc",
			favoriteUserId: id as string,
		},
		{ suspense: true }
	);
	const total = discussionsData?.total!;
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
				<CardTitle>Discussions</CardTitle>
				<CardDescription>{total} Discussions</CardDescription>
			</CardHeader>
			<CardContent>
				{total > 0 ? (
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-3">
							{discussionsData?.hits.map((discussion) => (
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
						No discussions yet
					</div>
				)}
			</CardContent>
		</Card>
	);
}

export default DiscussionCard;
