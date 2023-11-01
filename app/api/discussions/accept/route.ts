import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { parent_id, id } = await req.json();

		if (!parent_id || !id) {
			return NextResponse.json({ success: false }, { status: 400 });
		}

		const item = await db.discussion.findUnique({
			where: { id: parent_id },
		});

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
		if (user.id !== item?.authorId) {
			return NextResponse.json({ success: false }, { status: 401 });
		}

		if (
			(await db.discussion.count({
				where: { parent_id, isQna: true, isAccepted: true },
			})) > 0
		) {
			return NextResponse.json(
				{ success: false, message: "There exists an already adopted answer" },
				{ status: 400 }
			);
		}

		await db.discussion.update({
			where: { id },
			data: { isAccepted: true },
		});
		await db.discussion.update({
			where: { id: parent_id },
			data: { isAccepted: true },
		});

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
