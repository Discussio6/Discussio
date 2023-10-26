import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import _ from "lodash-es";
import { redirect } from "next/navigation";

interface PaginationProps {
	page: number;
	count: number;
	total: number;
	genLink?: (page: number) => string;
}

function Pagination({ page, count, total, genLink }: PaginationProps) {
	const pageEnd = Math.ceil(total / count);
	const pageStart = Math.floor(page - 1) * 10;
	const pageNums = _.range(
		pageStart + 1,
		Math.min(pageStart + 10, pageEnd) + 1
	);

	return (
		<div className="flex items-center gap-2">
			<Link href={genLink?.(Math.max(1, page - 10)) || ""}>
				<Button size="icon" variant="secondary" disabled={pageNums[0] === 1}>
					<ChevronLeft />
				</Button>
			</Link>
			{pageNums.map((pageNum) => (
				<Link href={genLink?.(pageNum) || ""} key={pageNum}>
					<Button variant={pageNum === page ? "primary" : "secondary"}>
						{pageNum}
					</Button>
				</Link>
			))}
			<Link href={genLink?.(Math.min(pageEnd, page + 10)) || ""}>
				<Button
					size="icon"
					variant="secondary"
					disabled={pageNums[pageNums.length - 1] === pageEnd}
				>
					<ChevronRight />
				</Button>
			</Link>
		</div>
	);
}

export default Pagination;
