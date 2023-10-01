import { DownloadIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ContentListItemProps {
	title: string;
	downloadCount: number;
	thumbsUpCount: number;
	date: string;
	href?: string;
}

function ContentListItem({
	title,
	downloadCount,
	thumbsUpCount,
	date,
	href = "/",
}: ContentListItemProps) {
	return (
		<Link
			href={href}
			className="flex justify-between items-center gap-8 py-2 px-2 rounded-md hover:bg-slate-100 transition-all duration-200"
		>
			<h3 className="text-sm line-clamp-1 flex-1">{title}</h3>
			<span className="text-xs text-slate-400 shrink-0">{date}</span>
			<div className="flex gap-3 shrink-0 text-xs">
				<div className="flex items-center gap-1">
					<DownloadIcon className="w-4 h-4" />
					{downloadCount}
				</div>
				<div className="flex items-center gap-1">
					<ThumbsUpIcon className="w-4 h-4" />
					{thumbsUpCount}
				</div>
			</div>
		</Link>
	);
}

export default ContentListItem;
