import { db } from "@/lib/db";
import { Discussion } from "@/types/schema";
import React from "react";
import QuestionDetail from "./QuestionDetail";

interface Props {
	params: {
		qid: string;
	};
}

async function QuestionDetailPage(props: Props) {
	const discussion = (await db.discussion.findUnique({
		where: { id: parseInt(props.params.qid) },
		include: {
			User: true,
			Children: {
				include: {
					User: true,
				},
			},
		},
	})) as Discussion;

	return (
		<QuestionDetail discussion={discussion} qid={parseInt(props.params.qid)} />
	);
}

export default QuestionDetailPage;
