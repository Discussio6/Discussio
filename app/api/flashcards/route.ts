import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { postFlashcardProps } from "@/lib/queries/flashcards";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		let page = req.nextUrl.searchParams.get("page") || 1;
		let count = req.nextUrl.searchParams.get("count") || 10;
		const orderBy = req.nextUrl.searchParams.get("orderBy") || "cAt:desc";
		const favoriteUserId = req.nextUrl.searchParams.get("favoriteUserId");

		page = parseInt(page as string);
		count = parseInt(count as string);

		if (page < 1) page = 1;
		if (count < 1) count = 1;

		const total = await db.flashcard.count({
			where: {
				...(favoriteUserId
					? { FlashcardFavorites: { some: { userId: favoriteUserId } } }
					: {}),
				OR: [{ acl: "PUBLIC" }, { user_id: session?.id }],
			},
		});
		const flashcards = await db.flashcard.findMany({
			where: {
				...(favoriteUserId
					? { FlashcardFavorites: { some: { userId: favoriteUserId } } }
					: {}),
				OR: [{ acl: "PUBLIC" }, { user_id: session?.id }],
			},
			include: {
				User: true,
				Tags: true,
				Contents: true,
				FlashcardFavorites: { select: { User: true, cAt: true } },
			},
			skip: (page - 1) * count,
			take: count,
			orderBy: {
				[orderBy.split(":")[0]]: orderBy.split(":")[1],
			},
		});

		return NextResponse.json({ total, hits: flashcards }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = (await req.json()) as postFlashcardProps;
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json({ success: false }, { status: 401 });
		}
		const user = await db.user.findUnique({
			where: { id: session.id },
		});
		if (!user) {
			return NextResponse.json({ success: false }, { status: 401 });
		}
		const flashcard = await db.flashcard.create({
			data: {
				name: body.name,
				description: body.description,
				acl: body.acl,
				User: { connect: { id: user.id } },
				Tags: {
					connect: body.tags.map((tag: string) => ({ name: tag })),
				},
				Contents: {
					create: body.contents.map((content, index) => ({
						question: content.question,
						answer: content.answer,
						difficulty: content.difficulty,
						order: index,
					})),
				},
			},
			include: {
				User: true,
				Tags: true,
				Contents: true,
				FlashcardFavorites: { select: { User: true, cAt: true } },
			},
		});

		return NextResponse.json(
			{ success: true, data: flashcard },
			{ status: 201 }
		);
	} catch (e) {
		console.log(e);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
