import React, { useCallback } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface CommentFormProps {
	showCancelButton?: boolean;
	onCancel?: () => void;
}

function CommentForm({ onCancel, showCancelButton }: CommentFormProps) {
	const handleCancel = useCallback(() => {
		onCancel?.();
	}, [onCancel]);

	return (
		<div className="flex flex-col gap-2">
			<Textarea cols={8} />
			<div className="flex items-center gap-2">
				<Button variant="primary">작성</Button>
				{showCancelButton && (
					<Button variant="secondary" onClick={handleCancel}>
						취소
					</Button>
				)}
			</div>
		</div>
	);
}

export default CommentForm;
