"use client";

import React, { useCallback, useState } from "react";
import ProfileCard from "../common/ProfileCard";
import { Button } from "../ui/button";
import { FlagIcon, ReplyIcon } from "lucide-react";
import CommentForm from "./CommentForm";
import { cn } from "@/lib/utils";

interface CommentProps {
	content: string;
}

function Comment({ content }: CommentProps) {
	const [openCommentForm, setOpenCommentForm] = useState(false);
	const closeCommentForm = useCallback(() => setOpenCommentForm(false), []);

	return (
		<div className="flex flex-col gap-2">
			<div>
				<ProfileCard name="chanhwi" image="/images/google-login-icon.svg" />
			</div>
			<div>{content}</div>
			<div className="flex gap-2">
				<Button
					className="flex items-center gap-2"
					variant="ghost"
					onClick={() => setOpenCommentForm((open) => !open)}
				>
					<ReplyIcon className="w-4 h-4" />
					Reply
				</Button>
				<Button className="flex items-center gap-2" variant="ghost">
					<FlagIcon className="w-4 h-4" />
					Report
				</Button>
			</div>
			<div className={cn(!openCommentForm && "hidden")}>
				<CommentForm onCancel={closeCommentForm} showCancelButton />
			</div>
		</div>
	);
}

export default Comment;
