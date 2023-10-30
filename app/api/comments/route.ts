import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		let page = req.nextUrl.searchParams.get("page") || 1;
		let count = req.nextUrl.searchParams.get("count") || 10;
		let parent_comment_id = req.nextUrl.searchParams.get("parent_comment_id");
		let content_id: number | string | null =
			req.nextUrl.searchParams.get("content_id") || null;
		const orderBy = req.nextUrl.searchParams.get("orderBy") || "cAt:desc";

		page = parseInt(page as string);
		count = parseInt(count as string);
		content_id = parseInt(content_id as string);
		const pid =
			parent_comment_id === "null"
				? null
				: parseInt(parent_comment_id as string);
		const hasPid = parent_comment_id !== null;

		if (page < 1) page = 1;
		if (count < 1) count = 1;

		const total = await db.comment.count({
			where: {
				...(hasPid ? { parent_comment_id: pid } : {}),
				content_id,
			},
		});
		const comments = await db.comment.findMany({
			where: {
				...(hasPid ? { parent_comment_id: pid } : {}),
				content_id,
			},
			include: {
				User: true,
			},
			skip: (page - 1) * count,
			take: count,
			orderBy: {
				[orderBy.split(":")[0]]: orderBy.split(":")[1],
			},
		});

		return NextResponse.json({ total, hits: comments }, { status: 200 });
	} catch (error) {
		console.log(error);
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

		const comment = await db.comment.create({
			data: {
				comment: body.comment,
				User: { connect: { id: user.id } },
				...(body.parent_comment_id
					? { Parent: { connect: { id: body.parent_comment_id } } }
					: {}),
				content_id: body.content_id,
			},
			include: {
				User: true,
				Children: { include: { User: true } },
			},
		});

		return NextResponse.json({ success: true, data: comment }, { status: 201 });
	} catch (e) {
		console.log(e);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
