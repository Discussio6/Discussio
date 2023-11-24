"use client";

import BeatLoader from "@/components/common/BeatLoader";
import ContentListItem from "@/components/common/ContentListItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDiscussions } from "@/lib/queries/discussions";
import { useGetFlashcards } from "@/lib/queries/flashcards";
import { ListIcon, LoaderIcon } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";

const Loader = ({ text }: { text: string }) => {
	return (
		<div className="flex flex-col items-center justify-center">
			<BeatLoader />
			<p className="text-slate-500">{text}</p>
		</div>
	);
};

interface HomeDetailProps {
	qcount: number;
	acount: number;
	dcount: number;
	fcount: number;
}

function HomeDetail({ qcount, acount, dcount, fcount }: HomeDetailProps) {
	const { data: questionsData, isLoading: questionLoading } = useGetDiscussions(
		{
			isQna: true,
			parent_id: 0,
			orderBy: "cAt:desc",
			count: 5,
		}
	);

	const { data: discussionsData, isLoading: discussionLoading } =
		useGetDiscussions({
			isQna: false,
			parent_id: 0,
			orderBy: "cAt:desc",
			count: 5,
		});

	const { data: flashcardsData, isLoading: flashcardLoading } =
		useGetFlashcards({
			orderBy: "cAt:desc",
			count: 5,
		});

	const totalQuestions = questionsData?.total ?? 0;
	const totalDiscussions = discussionsData?.total ?? 0;
	const totalFlashcards = flashcardsData?.total ?? 0;

	return (
		<main className="flex flex-col">
			<header className="w-full bg-slate-700 text-white flex flex-col justify-center px-4 py-8 gap-8">
				<div className="flex flex-col gap-2 mt-4 ml-4">
					<h1 className="text-4xl font-bold">Discussio</h1>
					<p className="text-slate-300 text-sm font-medium">
						Community for facilitating learning and discussion
					</p>
				</div>
				<div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
					<div className="rounded-lg border-2 border-slate-500 min-h-[200px] flex flex-col justify-center items-center gap-4 p-4">
						<span className="text-lg">Total Questions</span>
						<span className="text-2xl font-bold">{qcount}</span>
					</div>
					<div className="rounded-lg border-2 border-slate-500 min-h-[200px] flex flex-col justify-center items-center gap-4 p-4">
						<span className="text-lg">Total Answers</span>
						<span className="text-2xl font-bold">{acount}</span>
					</div>
					<div className="rounded-lg border-2 border-slate-500 min-h-[200px] flex flex-col justify-center items-center gap-4 p-4">
						<span className="text-lg">Total Discussions</span>
						<span className="text-2xl font-bold">{dcount}</span>
					</div>
					<div className="rounded-lg border-2 border-slate-500 min-h-[200px] flex flex-col justify-center items-center gap-4 p-4">
						<span className="text-lg">Total Flashcards</span>
						<span className="text-2xl font-bold">{fcount}</span>
					</div>
				</div>
			</header>
			<article className="flex flex-col gap-2 p-4">
				<div className="grid xl:grid-cols-3 grid-cols-1 md:grid-cols-2 mt-4 gap-4">
					<Card>
						<CardHeader>
							<div className="flex justify-between items-center">
								<CardTitle className="text-lg">Recent questions</CardTitle>
								<Link href="/questions">
									<Button variant="ghost" size="icon">
										<ListIcon />
									</Button>
								</Link>
							</div>
						</CardHeader>
						{!questionLoading ? (
							<CardContent
								className={`flex flex-col min-h-[200px] ${
									totalQuestions === 0 ? "justify-center items-center" : ""
								}`}
							>
								{totalQuestions > 0 ? (
									<>
										{questionsData?.hits.map((item) => (
											<ContentListItem
												title={item.title}
												date={moment(item.cAt).fromNow()}
												author={item.User.name}
												href={`/questions/${item.id}`}
											/>
										))}
									</>
								) : (
									<div className="flex flex-col items-center justify-center h-full">
										<p className="text-slate-500">No questions yet</p>
									</div>
								)}
							</CardContent>
						) : (
							<CardContent className="flex flex-col min-h-[200px] justify-center items-center">
								<Loader text="Loading Questions" />
							</CardContent>
						)}
					</Card>
					<Card>
						<CardHeader>
							<div className="flex justify-between items-center">
								<CardTitle className="text-lg">Recent discussions</CardTitle>
								<Link href="/discussions">
									<Button variant="ghost" size="icon">
										<ListIcon />
									</Button>
								</Link>
							</div>
						</CardHeader>
						{!discussionLoading ? (
							<CardContent
								className={`flex flex-col min-h-[200px] ${
									totalDiscussions === 0 ? "justify-center items-center" : ""
								}`}
							>
								{totalDiscussions > 0 ? (
									<>
										{discussionsData?.hits.map((item) => (
											<ContentListItem
												title={item.title}
												date={moment(item.cAt).fromNow()}
												author={item.User.name}
												href={`/discussions/${item.id}`}
											/>
										))}{" "}
									</>
								) : (
									<p className="text-slate-500">No discussions yet</p>
								)}
							</CardContent>
						) : (
							<CardContent className="flex flex-col min-h-[200px] justify-center items-center">
								<Loader text="Loading Discussions" />
							</CardContent>
						)}
					</Card>
					<Card>
						<CardHeader>
							<div className="flex justify-between items-center">
								<CardTitle className="text-lg">Recent flashcards</CardTitle>
								<Link href="/flashcards">
									<Button variant="ghost" size="icon">
										<ListIcon />
									</Button>
								</Link>
							</div>
						</CardHeader>
						{!flashcardLoading ? (
							<CardContent
								className={`flex flex-col min-h-[200px] ${
									totalFlashcards === 0 ? "justify-center items-center" : ""
								}`}
							>
								{totalFlashcards > 0 ? (
									<>
										{flashcardsData?.hits.map((item) => (
											<ContentListItem
												title={item.name}
												date={moment(item.cAt).fromNow()}
												author={item.User.name}
												href={`/flashcards/${item.id}`}
											/>
										))}
									</>
								) : (
									<p className="text-slate-500">No flashcards yet</p>
								)}
							</CardContent>
						) : (
							<CardContent className="flex flex-col min-h-[200px] justify-center items-center">
								<Loader text="Loading Flashcards" />
							</CardContent>
						)}
					</Card>
				</div>
			</article>
		</main>
	);
}

export default HomeDetail;
