import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const keyword = req.nextUrl.searchParams.get("keyword") || "";
		const total = await db.tag.count({
			where: {
				name: {
					contains: keyword,
				},
			},
		});
		const tags = await db.tag.findMany({
			where: {
				name: {
					contains: keyword,
				},
			},
			orderBy: {
				Discussions: {
					_count: "desc",
				},
			},
			take: 10,
		});
		return NextResponse.json({ total, hits: tags }, { status: 200 });
	} catch (e) {
		console.log(e);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const tag = await db.tag.create({
			data: {
				name: body.name,
				description: body.description,
			},
		});
		return NextResponse.json({ success: true, data: tag }, { status: 201 });
	} catch (e) {
		console.log(e);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
