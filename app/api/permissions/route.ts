import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ success: false }, { status: 401 });
		}

		const body = await req.json();
		const { home, favorites, uploads } = body;

		const res = await db.profilePermission.upsert({
			where: { userId: session.id },
			create: {
				home,
				favorites,
				uploads,
				User: {
					connect: {
						id: session.id,
					},
				},
			},
			update: {
				home,
				favorites,
				uploads,
			},
		});

		return NextResponse.json({
			success: true,
			home: res.home,
			favorites: res.favorites,
			uploads: res.uploads,
		});
	} catch (e) {
		console.error(e);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
