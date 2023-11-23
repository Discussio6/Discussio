import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { patchFlashcardProps } from "@/lib/queries/flashcards";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = parseInt(params.id);
		const data = await db.flashcard.findUnique({
			where: { id },
			include: {
				User: true,
				Tags: true,
				FlashcardFavorites: { select: { User: true, cAt: true } },
				Contents: { orderBy: { order: "asc" } },
			},
		});
		return NextResponse.json({ success: true, data }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const body = (await req.json()) as patchFlashcardProps;
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

		// check whether the user is the author of the flashcard
		const card = await db.flashcard.findUnique({
			where: { id: parseInt(params.id) },
			include: { User: true },
		});
		if (card?.User.id !== user.id) {
			return NextResponse.json({ success: false }, { status: 401 });
		}

		const { id, tags, contents, ...others } = body;

		const flashcard = await db.flashcard.update({
			where: { id: parseInt(params.id) },
			data: {
				...others,
				...(tags
					? {
							Tags: {
								connect: tags.map((tag: string) => ({ name: tag })),
							},
					  }
					: {}),
				...(contents
					? {
							Contents: {
								upsert: contents.map((content, index) => {
									const { id, answer, question, difficulty } = content;
									return {
										where: { id },
										update: { answer, question, difficulty, order: index },
										create: { answer, question, difficulty, order: index },
									};
								}),
							},
					  }
					: {}),
			},
			include: {
				User: true,
				Tags: true,
				FlashcardFavorites: { select: { User: true, cAt: true } },
				Contents: true,
			},
		});

		return NextResponse.json(
			{ success: true, data: flashcard },
			{ status: 200 }
		);
	} catch (e) {
		console.log(e);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
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

		// check whether the user is the author of the flashcard
		const card = await db.flashcard.findUnique({
			where: { id: parseInt(params.id) },
			include: { User: true },
		});
		if (card?.User.id !== user.id) {
			return NextResponse.json({ success: false }, { status: 401 });
		}

		await db.flashcard.delete({
			where: { id: parseInt(params.id) },
		});

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (e) {
		console.log(e);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
