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
				take: 10,
				include: {
					User: true,
					Likes: { select: { User: true, cAt: true } },
					Tags: true,
				},
			},
			Likes: { select: { User: true, cAt: true } },
			Tags: true,
		},
	})) as Discussion;

	return (
		<QuestionDetail discussion={discussion} qid={parseInt(props.params.qid)} />
	);
}

export default QuestionDetailPage;
