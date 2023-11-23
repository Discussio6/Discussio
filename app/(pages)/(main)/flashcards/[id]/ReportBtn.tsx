"use client";

import ReportForm, { ReportFormProps } from "@/components/common/ReportForm";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { postReport } from "@/lib/queries/report";
import { Flashcard } from "@/types/schema";
import { FlagIcon } from "lucide-react";
import React, { useCallback, useState } from "react";

interface ReportBtnProps {
	flashcard: Flashcard;
}

function ReportBtn({ flashcard }: ReportBtnProps) {
	const [openReportForm, setOpenReportForm] = useState(false);

	const handleReport = useCallback<ReportFormProps["onSubmit"]>(
		(values, form) => {
			postReport({
				title: values.title,
				description: values.description,
				type: "Flashcards",
				endpoint: window.location.href,
				json: JSON.stringify(flashcard, null, 2),
			}).then((res) => {
				if (res.success) {
					alert("Reported successfully");
					setOpenReportForm(false);
					form.reset();
				} else {
					alert("Failed to report");
				}
			});
		},
		[flashcard]
	);

	return (
		<Dialog open={openReportForm} onOpenChange={setOpenReportForm}>
			<DialogTrigger asChild>
				<Button className="flex items-center gap-2" variant="outline">
					<FlagIcon className="w-4 h-4" />
					Report
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Report a flashcard</DialogTitle>
					<DialogDescription>
						Please write down the reason for the report
					</DialogDescription>
				</DialogHeader>
				<ReportForm onSubmit={handleReport} />
			</DialogContent>
		</Dialog>
	);
}

export default ReportBtn;
