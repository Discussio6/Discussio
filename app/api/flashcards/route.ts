import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { postFlashcardProps } from "@/lib/queries/flashcards";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		let page = req.nextUrl.searchParams.get("page") || 1;
		let count = req.nextUrl.searchParams.get("count") || 10;
		const orderBy = req.nextUrl.searchParams.get("orderBy") || "cAt:desc";

		page = parseInt(page as string);
		count = parseInt(count as string);

		if (page < 1) page = 1;
		if (count < 1) count = 1;

		const total = await db.flashcard.count({});
		const flashcards = await db.flashcard.findMany({
			include: {
				User: true,
				Tags: true,
				Contents: true,
			},
			skip: (page - 1) * count,
			take: count,
			orderBy: {
				[orderBy.split(":")[0]]: orderBy.split(":")[1],
			},
		});

		return NextResponse.json({ total, hits: flashcards }, { status: 200 });
	} catch (error) {
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
				User: { connect: { id: user.id } },
				Tags: {
					connect: body.tags.map((tag: string) => ({ name: tag })),
				},
				Contents: {
					createMany: {
						data: body.contents,
					},
				},
			},
			include: {
				User: true,
				Tags: true,
				Contents: true,
			},
		});

		return NextResponse.json(
			{ success: true, data: flashcard },
			{ status: 201 }
		);
	} catch (e) {
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
