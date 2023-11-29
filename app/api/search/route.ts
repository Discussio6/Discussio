
import { getSearchProps } from "@/lib/queries/search";
import {db} from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { get } from "http";

const getParam = (req: NextRequest, key: string) => {
    return req.nextUrl.searchParams.get(key);
};
// from the keyword get corresponding discussions, quizs, users 
// search for the keyword in the discussions(title, comments), tags,
export async function GET(req: NextRequest) {
    try {
        let params: getSearchProps = {
            count: parseInt(req.nextUrl.searchParams.get("count") || "10"),
            orderBy: req.nextUrl.searchParams.get("orderBy") || "cAt:desc",
            keyword: req.nextUrl.searchParams.get("keyword") || "",
            page: parseInt(req.nextUrl.searchParams.get("page") || "1"),
        };
        if (params.page < 1) params.page = 1;
        if (params.count < 1) params.count = 1;
        const discussions = await db.discussion.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: params.keyword,
                        },
                    },
                    {
                        content: {
                            contains: params.keyword,
                        },
                    },
                ],
            },
            take: params.count,
            skip: (params.page - 1) * params.count,
        });
        const quizs = await db.quiz.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: params.keyword,
                        },
                    },
                    {
                        quiz_description: {
                            contains: params.keyword,
                        },
                    },
                ]
            },
            take: params.count,
            skip: (params.page - 1) * params.count,
        });
        const flashcards = await db.flashcard.findMany({
            where: {
                OR : [
                    {
                        name: {
                            contains: params.keyword,
                        },
                    },
                    {
                        description: {
                            contains: params.keyword,
                        },
                    },
                ],
            },
            take: params.count,
            skip: (params.page - 1) * params.count,
        });
        let total = discussions.length + quizs.length + flashcards.length;
        return NextResponse.json({
            total,
            data: {
                discussions,
                quizs,
                flashcards,
            },
        }, { status: 200 });

    } catch (e) {
        console.log(e);
        return NextResponse.json({ success: false }, { status: 500 });
    }



}
