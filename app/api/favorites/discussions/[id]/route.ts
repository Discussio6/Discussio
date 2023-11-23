import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Props {
	params: {
		id: string;
	};
}

export async function POST(req: NextRequest, { params }: Props) {
	try {
		const id = parseInt(params.id);
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

		const favorite = await db.discussionFavorites.findUnique({
			where: { discussionId_userId: { discussionId: id, userId: session.id } },
		});

		if (favorite)
			await db.discussionFavorites.delete({
				where: {
					discussionId_userId: {
						discussionId: id,
						userId: session.id,
					},
				},
			});
		else
			await db.discussionFavorites.create({
				data: { discussionId: id, userId: session.id },
			});

		return NextResponse.json({ success: true });
	} catch (e) {
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
