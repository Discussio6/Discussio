import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { postFlashcardParticipantProps } from "@/lib/queries/flashcards";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, params: { id: string }) {
	try {
		let id = parseInt(params.id);
		let page = req.nextUrl.searchParams.get("page") || 1;
		let count = req.nextUrl.searchParams.get("count") || 10;
		const orderBy = req.nextUrl.searchParams.get("orderBy") || "cAt:desc";

		page = parseInt(page as string);
		count = parseInt(count as string);

		if (page < 1) page = 1;
		if (count < 1) count = 1;

		const total = await db.flashcardParticipant.count({ where: { id } });
		const participants = await db.flashcardParticipant.findMany({
			where: { id },
			include: {
				User: true,
				FlashcardAnswer: {
					include: {
						Content: true,
					},
				},
			},
			skip: (page - 1) * count,
			take: count,
			orderBy: {
				[orderBy.split(":")[0]]: orderBy.split(":")[1],
			},
		});

		return NextResponse.json({ total, hits: participants }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}

export async function POST(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = parseInt(params.id);
		const body = (await req.json()) as postFlashcardParticipantProps;
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

		const { card_id, contents } = body;

		const participant = await db.flashcardParticipant.create({
			data: {
				Card: {
					connect: {
						id: card_id,
					},
				},
				User: {
					connect: {
						id: user.id,
					},
				},
				FlashcardAnswer: {
					create: contents.map((content) => ({
						Content: {
							connect: {
								id: content.id,
							},
						},
						status: content.status,
					})),
				},
			},
			include: {
				User: true,
				FlashcardAnswer: {
					include: {
						Content: true,
					},
				},
			},
		});

		return NextResponse.json(
			{ success: true, data: participant },
			{ status: 200 }
		);
	} catch (e) {
		console.log(e);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
