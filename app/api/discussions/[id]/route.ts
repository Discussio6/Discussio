import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	const data = await db.discussion.findUnique({
		where: { id: parseInt(params.id) },
		include: {
			User: true,
			Children: {
				take: 10,
				include: { User: true, Likes: { select: { User: true, cAt: true } } },
			},
			Likes: { select: { User: true, cAt: true } },
		},
	});

	return NextResponse.json({ success: true, data }, { status: 200 });
}
