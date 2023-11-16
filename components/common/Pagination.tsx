import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import _ from "lodash-es";

interface PaginationProps {
	page: number;
	count: number;
	total: number;
	pageCnt?: number;
	genLink?: (page: number) => string;
}

const getNext = (page: number, pageCnt: number, pageEnd: number) => {
	return Math.min((Math.floor((page - 1) / pageCnt) + 1) * pageCnt + 1, pageEnd); 
}

const getPrev = (page: number, pageCnt: number) => {
	return Math.max(1, Math.floor((page - 1) / pageCnt) * pageCnt)
}
function Pagination({ page, count, pageCnt = 10, total, genLink }: PaginationProps) {
	const pageEnd = Math.max(1, Math.ceil(total / count));
	const pageStart = Math.floor((page - 1) / pageCnt) * pageCnt + 1;
	const pageNums = _.range(
		pageStart,
		Math.min(pageStart + pageCnt, pageEnd + 1)
	);

	return (
		<div className="flex items-center gap-2">
			<Link href={genLink?.(getPrev(page, pageCnt)) || ""}>
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
			<Link href={genLink?.(getNext(page, pageCnt, pageEnd)) || ""}>
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
