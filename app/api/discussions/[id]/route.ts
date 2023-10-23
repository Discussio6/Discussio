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
			Children: { include: { User: true } },
			Parent: { include: { User: true } },
		},
	});
	return NextResponse.json({ success: true, data }, { status: 200 });
}
