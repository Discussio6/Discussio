import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

interface CommentFormProps {
	initialContent?: string;
	onSubmit: (
		content: string,
		setContent: Dispatch<SetStateAction<string>>
	) => void;
	onCancel?: () => void;
}

function CommentForm({ initialContent, onSubmit, onCancel }: CommentFormProps) {
	const [content, setContent] = useState(initialContent ?? "");

	const handleSubmit = useCallback(() => {
		if (!content) return;
		onSubmit?.(content, setContent);
	}, [content, setContent]);

	const handleCancel = useCallback(() => {
		onCancel?.();
	}, [onCancel]);

	return (
		<div className="flex flex-col gap-2">
			<Textarea
				cols={8}
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>
			<div className="flex items-center gap-2">
				<Button
					variant="primary"
					onClick={handleSubmit}
					disabled={content.length === 0}
				>
					작성
				</Button>
				{onCancel && (
					<Button variant="secondary" onClick={handleCancel}>
						취소
					</Button>
				)}
			</div>
		</div>
	);
}

export default CommentForm;
