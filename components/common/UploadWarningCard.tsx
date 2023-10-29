import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import React from "react";

interface Props {
	className?: string;
}

function UploadWarningCard({ className }: Props) {
	return (
		<div
			className={cn(
				"bg-orange-200 text-orange-700 p-3 rounded-lg flex flex-col gap-3",
				className
			)}
		>
			<div className="flex gap-2 items-center">
				<AlertCircle />
				<h2 className="text-md font-bold align-middle">
					Please follow these guidelines before uploading
				</h2>
			</div>
			<ul className="list-disc list-inside pl-2">
				<li>Summarize your problem in a one-line title.</li>
				<li>Describe your problem in more detail.</li>
				<li> Describe what you tried and what you expected to happen.</li>
				<li>
					Add “tags” which help surface your question to members of the
					community.
				</li>
				<li>Review your question and post it to the site.</li>
			</ul>
		</div>
	);
}

export default UploadWarningCard;
