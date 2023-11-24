import React from "react";
import HomeDetail from "./HomeDetail";
import { db } from "@/lib/db";

export const revalidate = 3600;

async function Home() {
	const totalQuestion = await db.discussion.count({
		where: { isQna: true, parent_id: null },
	});
	const totalAnswer = await db.discussion.count({
		where: { isQna: true, parent_id: { not: null } },
	});
	const totalDiscussion = await db.discussion.count({
		where: { isQna: false, parent_id: null },
	});
	const totalFlashcard = await db.flashcard.count();

	return (
		<HomeDetail
			qcount={totalQuestion}
			acount={totalAnswer}
			dcount={totalDiscussion}
			fcount={totalFlashcard}
		/>
	);
}

export default Home;
