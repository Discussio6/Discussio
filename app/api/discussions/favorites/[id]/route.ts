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

	const discussion_id = parseInt(params.id);
	try {
		const old = await db.discussionFavorites.findUnique({
			where: {
				discussionId_userId: {
					discussionId: discussion_id,
					userId: user.id,
				},
			},
		});

		if (old) {
			await db.discussionFavorites.delete({
				where: {
					discussionId_userId: {
						discussionId: discussion_id,
						userId: user.id,
					},
				},
			});
		} else {
			await db.discussionFavorites.create({
				data: {
					Discussion: { connect: { id: discussion_id } },
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
