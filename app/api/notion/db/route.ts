import { NextRequest, NextResponse } from "next/server";
import { notion } from "@/lib/notion";

export async function GET(req: NextRequest) {
	try {
		const res = await notion.databases.retrieve({
			database_id: process.env.NOTION_DATABASE_ID!,
		});
		return NextResponse.json({ success: true, data: res });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const res = await notion.pages.create({
			icon: {
				type: "emoji",
				emoji: "🚩",
			},
			parent: {
				type: "database_id",
				database_id: process.env.NOTION_DATABASE_ID!,
			},
			properties: {
				Title: {
					title: [
						{
							text: {
								content: body.title,
							},
						},
					],
				},
				Description: {
					rich_text: [
						{
							text: {
								content: body.description,
							},
						},
					],
				},
				Type: {
					multi_select: [{ name: body.type }],
				},
				Endpoint: {
					rich_text: [
						{
							text: {
								content: body.endpoint,
							},
						},
					],
				},
				Solved: {
					checkbox: false,
				},
				CreatedAt: {
					date: {
						start: new Date().toISOString(),
					},
				},
			},
			children: [
				{
					object: "block",
					heading_2: {
						rich_text: [
							{
								text: {
									content: "링크",
								},
							},
						],
					},
				},
				{
					object: "block",
					paragraph: {
						rich_text: [
							{
								text: {
									content: body.endpoint,
									link: {
										url: body.endpoint,
									},
								},
							},
						],
						color: "default",
					},
				},
				{
					object: "block",
					heading_2: {
						rich_text: [
							{
								text: {
									content: "신고 내용",
								},
							},
						],
					},
				},
				{
					object: "block",
					paragraph: {
						rich_text: [
							{
								text: {
									content: body.description,
								},
							},
						],
						color: "default",
					},
				},
				{
					object: "block",
					heading_2: {
						rich_text: [
							{
								text: {
									content: "데이터",
								},
							},
						],
					},
				},
				{
					object: "block",
					code: {
						language: "json",
						rich_text: [
							{
								text: {
									content: body.json,
								},
							},
						],
					},
				},
			],
		});
		return NextResponse.json({ success: true, data: res });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
