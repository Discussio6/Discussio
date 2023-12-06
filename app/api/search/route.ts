import { getSearchProps } from "@/lib/queries/search";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Acl, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const discussionQuery = (keyword: string) =>
	({
		OR: [
			{
				title: {
					contains: keyword,
				},
			},
			{
				content: {
					contains: keyword,
				},
			},
			{
				Tags: {
					some: {
						name: keyword,
					},
				},
			},
		],
	} as Prisma.DiscussionWhereInput);

const quizQuery = (keyword: string) =>
	({
		OR: [
			{
				quiz_name: {
					contains: keyword,
				},
			},
			{
				quiz_description: {
					contains: keyword,
				},
			},
			{
				Tags: {
					some: {
						name: keyword,
					},
				},
			},
		],
	} as Prisma.QuizWhereInput);

const flashcardQuery = (keyword: string, userId?: string) =>
	({
		AND: [
			{
				OR: [
					{
						acl: Acl.PUBLIC,
						user_id: userId,
					},
				],
			},
			{
				OR: [
					{
						name: {
							contains: keyword,
						},
					},
					{
						description: {
							contains: keyword,
						},
					},
					{
						Tags: {
							some: {
								name: keyword,
							},
						},
					},
				],
			},
		],
	} as Prisma.FlashcardWhereInput);

// from the keyword get corresponding discussions, questions, flashcards
// search for the keyword in the discussions(title, comments), tags,
export async function GET(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		let params: getSearchProps = {
			count: parseInt(req.nextUrl.searchParams.get("count") || "10"),
			orderBy: req.nextUrl.searchParams.get("orderBy") || "cAt:desc",
			keyword: req.nextUrl.searchParams.get("keyword") || "",
			page: parseInt(req.nextUrl.searchParams.get("page") || "1"),
		};
		if (params.page < 1) params.page = 1;
		if (params.count < 1) params.count = 1;
		const discussionTotal = await db.discussion.count({
			where: discussionQuery(params.keyword),
		});
		const discussions = await db.discussion.findMany({
			where: discussionQuery(params.keyword),
			take: params.count,
			skip: (params.page - 1) * params.count,
			include: {
				User: true,
				Likes: { select: { User: true, cAt: true } },
				DiscussionFavorites: { select: { User: true, cAt: true } },
				Tags: true,
			},
		});
		const quizTotal = await db.quiz.count({
			where: quizQuery(params.keyword),
		});
		const quizs = await db.quiz.findMany({
			// search for the keyword in the quiz_name, quiz_description and tag
			where: quizQuery(params.keyword),
			take: params.count,
			skip: (params.page - 1) * params.count,
		});
		const flashcardTotal = await db.flashcard.count({
			where: flashcardQuery(params.keyword, session?.id),
		});
		const flashcards = await db.flashcard.findMany({
			where: flashcardQuery(params.keyword, session?.id),
			take: params.count,
			skip: (params.page - 1) * params.count,
			include: {
				User: true,
				Tags: true,
				Contents: true,
				FlashcardFavorites: { select: { User: true, cAt: true } },
			},
		});
		let total = discussionTotal + quizTotal + flashcardTotal;
		return NextResponse.json(
			{
				total,
				discussions: {
					total: discussionTotal,
					hits: discussions,
				},
				quizs: {
					total: quizTotal,
					hits: quizs,
				},
				flashcards: {
					total: flashcardTotal,
					hits: flashcards,
				},
			},
			{ status: 200 }
		);
	} catch (e) {
		console.log(e);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
