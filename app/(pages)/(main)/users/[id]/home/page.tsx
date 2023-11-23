import ProfileCard from "@/components/common/ProfileCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { db } from "@/lib/db";
import { User } from "@/types/schema";
import Image from "next/image";
import React from "react";

interface Props {
	params: {
		id: string;
	};
}

async function HomePage({ params: { id } }: Props) {
	const commentCount = await db.comment.count({ where: { userId: id } });
	const questionCount = await db.discussion.count({
		where: { authorId: id, isQna: true },
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
				<ProfileCard image={user.image} name={user.name} />
			</CardHeader>
			<CardContent className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
				<div className="flex flex-col gap-1">
					<span className="text-sm font-semibold">Email Address</span>
					<span className="text-sm text-slate-500">{user.email}</span>
				</div>
				<div className="flex flex-col gap-1">
					<span className="text-sm font-semibold">Questions uploaded</span>
					<span className="text-sm text-slate-500">{questionCount}</span>
				</div>
				<div className="flex flex-col gap-1">
					<span className="text-sm font-semibold">Answers wrote</span>
					<span className="text-sm text-slate-500">{answerCount}</span>
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
