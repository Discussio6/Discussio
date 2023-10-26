import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		let page = req.nextUrl.searchParams.get("page") || 1;
		let count = req.nextUrl.searchParams.get("count") || 10;
		let orderBy = req.nextUrl.searchParams.get("orderBy") || "cAt:desc";
		let parent_id: number | string | null =
			req.nextUrl.searchParams.get("parent_id") || null;

		page = parseInt(page as string);
		count = parseInt(count as string);
		parent_id = parseInt(parent_id as string);

		if (page < 1) page = 1;
		if (count < 1) count = 1;

		const total = await db.discussion.count({ where: { parent_id } });
		const discussions = await db.discussion.findMany({
			where: { parent_id },
			include: {
				User: true,
				Likes: { select: { User: true, cAt: true } },
				Tags: true,
			},
			skip: (page - 1) * count,
			take: count,
			orderBy: {
				[orderBy.split(":")[0]]: orderBy.split(":")[1],
			},
		});

		return NextResponse.json({ total, hits: discussions }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ success: false }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
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

		const discussion = await db.discussion.create({
			data: {
				title: body.title,
				content: body.content,
				User: { connect: { id: user.id } },
				...(body.parent_id
					? { Parent: { connect: { id: body.parent_id } } }
					: {}),
				Tags: {
					connect: body.tags.map((tag: string) => ({ name: tag })),
				},
			},
			include: {
				User: true,
				Children: { include: { User: true } },
			},
		});

		return NextResponse.json(
			{ success: true, data: discussion },
			{ status: 201 }
		);
	} catch (e) {
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
