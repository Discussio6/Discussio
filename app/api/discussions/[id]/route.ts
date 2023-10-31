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
					include: {
						User: true,
						Likes: { select: { User: true, cAt: true } },
						Tags: true,
					},
				},
				Likes: { select: { User: true, cAt: true } },
				Tags: true,
			},
		});
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

		if (typeof body.isAccepted !== "undefined") {
			if (
				(await db.discussion.count({
					where: { id: parseInt(params.id), isAccepted: true },
				})) > 0
			) {
				return NextResponse.json(
					{ success: false, message: "There exists an already adopted answer" },
					{ status: 400 }
				);
			}
		}

		const discussion = await db.discussion.update({
			where: { id: parseInt(params.id) },
			data: {
				title: body.title,
				content: body.content,
				...(typeof body.isAccepted !== "undefined"
					? { isAccepted: body.isAccepted }
					: {}),
				...(body.tags
					? {
							Tags: {
								connect: body.tags.map((tag: string) => ({ name: tag })),
							},
					  }
					: {}),
			},
			include: {
				User: true,
				Children: {
					take: 10,
					include: {
						User: true,
						Likes: { select: { User: true, cAt: true } },
						Tags: true,
					},
				},
				Likes: { select: { User: true, cAt: true } },
				Tags: true,
			},
		});

		return NextResponse.json(
			{ success: true, data: discussion },
			{ status: 200 }
		);
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

		await db.discussion.delete({
			where: { id: parseInt(params.id) },
		});

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (e) {
		console.log(e);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
