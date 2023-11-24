import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
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

export async function PATCH(req: NextRequest, { params: { id } }: Props) {
	try {
		const session = await getServerSession(authOptions);
		if (session?.id !== id) {
			return NextResponse.json({ success: false }, { status: 401 });
		}
		
		const body = await req.json();
		const user = await db.user.update({
			where: {
				id,
			},
			data: body,
		});

		return NextResponse.json({ success: true, data: user });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
