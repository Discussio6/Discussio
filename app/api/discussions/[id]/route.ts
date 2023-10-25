import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = parseInt(params.id);
		const ip =
			req.headers.get("x-real-ip") ||
			req.headers.get("x-forwarded-for") ||
			"127.0.0.1";

		const ipte = await db.iPTable.findUnique({ where: { ip_id: { ip, id } } });

		if (!ipte || ipte.exiresAt < new Date(Date.now())) {
			await db.iPTable.upsert({
				where: { ip_id: { ip, id } },
				create: {
					ip,
					id,
					exiresAt: new Date(Date.now() + 60 * 60 * 1000),
				},
				update: {
					exiresAt: new Date(Date.now() + 60 * 60 * 1000),
				},
			});
			await db.discussion.update({
				where: { id },
				data: { views: { increment: 1 } },
			});
		}

		const data = await db.discussion.findUnique({
			where: { id },
			include: {
				User: true,
				Children: {
					take: 10,
					include: { User: true, Likes: { select: { User: true, cAt: true } } },
				},
				Likes: { select: { User: true, cAt: true } },
				Tags: true,
			},
		});
		return NextResponse.json({ success: true, data }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
