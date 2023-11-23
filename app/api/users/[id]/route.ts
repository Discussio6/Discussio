import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface Props {
	params: {
		id: string;
	};
}

export async function GET(req: NextRequest, { params: { id } }: Props) {
	try {
		const user = await db.user.findUnique({
			where: {
				id,
			},
		});

		return NextResponse.json({ success: true, data: user });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
