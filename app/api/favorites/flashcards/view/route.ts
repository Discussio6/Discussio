import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		let countParam = req.nextUrl.searchParams.get("count") || "10";
		let pageParam = req.nextUrl.searchParams.get("page") || "1";
		const userId = req.nextUrl.searchParams.get("userId");
		const count = parseInt(countParam);
		const page = parseInt(pageParam);
		if (!userId) return NextResponse.json({ success: false }, { status: 400 });
		if (count < 1)
			return NextResponse.json({ success: false }, { status: 400 });
		if (page < 1) return NextResponse.json({ success: false }, { status: 400 });

		const total = await db.flashcardFavorites.count({ where: { userId } });
		const data = await db.flashcardFavorites.findMany({
			where: { userId },
			take: count,
			skip: count * (page - 1),
			include: {
				Flashcard: {
					include: {
						User: true,
						Tags: true,
						Contents: { orderBy: { order: "asc" } },
					},
				},
			},
		});

		return NextResponse.json({ total, hits: data.map((d) => d.Flashcard) });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
