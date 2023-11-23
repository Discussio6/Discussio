import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { db } from "@/lib/db";
import { User } from "@/types/schema";
import React from "react";

interface Props {
	params: {
		id: string;
	};
}

async function HomePage({ params: { id } }: Props) {
	const commentCount = await db.comment.count({ where: { userId: id } });
	const questionCount = await db.discussion.count({
		where: { authorId: id, isQna: true, parent_id: null },
	});
	const answerCount = await db.discussion.count({
		where: { authorId: id, isQna: false },
	});
	const flashcardCount = await db.flashcard.count({
		where: { user_id: id },
	});
	const user = (await db.user.findUnique({
		where: {
			id,
		},
	})) as User;

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2 w-fit">
					<Avatar className="w-8 h-8">
						<AvatarImage src={user.image} />
						<AvatarFallback>{user.name}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<h3 className="text-sm font-bold text-slate-600">{user.name}</h3>
						<h3 className="text-xs text-slate-400">{user.email}</h3>
					</div>
				</div>
			</CardHeader>
			<CardContent className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
				<div className="flex flex-col gap-1">
					<span className="text-sm font-semibold">Questions uploaded</span>
					<span className="text-sm text-slate-500">{questionCount}</span>
				</div>
				<div className="flex flex-col gap-1">
					<span className="text-sm font-semibold">Answers wrote</span>
					<span className="text-sm text-slate-500">{answerCount}</span>
				</div>
				<div className="flex flex-col gap-1">
					<span className="text-sm font-semibold">Flashcards created</span>
					<span className="text-sm text-slate-500">{flashcardCount}</span>
				</div>
				<div className="flex flex-col gap-1">
					<span className="text-sm font-semibold">Comments wrote</span>
					<span className="text-sm text-slate-500">{commentCount}</span>
				</div>
			</CardContent>
		</Card>
	);
}

export default HomePage;
