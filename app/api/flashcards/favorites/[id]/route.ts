import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
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

	const flashcardId = parseInt(params.id);
	try {
		const old = await db.flashcardFavorites.findUnique({
			where: {
				flashcardId_userId: {
					flashcardId,
					userId: user.id,
				},
			},
		});

		if (old) {
			await db.flashcardFavorites.delete({
				where: {
					flashcardId_userId: {
						flashcardId,
						userId: user.id,
					},
				},
			});
		} else {
			await db.flashcardFavorites.create({
				data: {
					Flashcard: { connect: { id: flashcardId } },
					User: { connect: { id: user.id } },
				},
			});
		}

		return NextResponse.json(
			{ success: true, status: old ? "deleted" : "created" },
			{ status: 200 }
		);
	} catch (e) {
		console.log(e);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
