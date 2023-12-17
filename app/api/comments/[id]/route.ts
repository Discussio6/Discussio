import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = parseInt(params.id);
		const data = await db.comment.findUnique({
			where: { id },
			include: {
				User: true,
				Children: {
					take: 10,
					include: {
						User: true,
					},
				},
			},
		});
		if (!data) {
			return NextResponse.json({ success: false }, { status: 404 });
		}
		return NextResponse.json({ success: true, data }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
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

		const comment = await db.comment.update({
			where: { id: parseInt(params.id) },
			data: {
				comment: body.comment,
			},
			include: {
				User: true,
				Children: {
					take: 10,
					include: {
						User: true,
					},
				},
			},
		});

		return NextResponse.json({ success: true, data: comment }, { status: 200 });
	} catch (e) {
		console.log(e);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
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

		await db.comment.delete({
			where: { id: parseInt(params.id) },
		});

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (e) {
		console.log(e);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
