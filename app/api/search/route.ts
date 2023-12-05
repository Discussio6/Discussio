
import { getSearchProps } from "@/lib/queries/search";
import {db} from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const getParam = (req: NextRequest, key: string) => {
    return req.nextUrl.searchParams.get(key);
};
// from the keyword get corresponding discussions, questions, flashcards
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
                    {
                        Tags: {
                            some: {
                                name: params.keyword
                            }
                        }
                    },
                ],
            },
            take: params.count,
            skip: (params.page - 1) * params.count,
            include: {
                User: true,
				Likes: { select: { User: true, cAt: true } },
				DiscussionFavorites: { select: { User: true, cAt: true } },
				Tags: true,
            }
        });
        const quizs = await db.quiz.findMany({
            // search for the keyword in the quiz_name, quiz_description and tag
            where: {
                OR: [
                    {
                        quiz_name : {
                            contains: params.keyword,
                        },
                    },
                    {
                        quiz_description: {
                            contains: params.keyword,
                        },
                    },
                    {
                        Tags: {
                            some: {
                                name: params.keyword
                            }
                        }
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
                    {
                        Tags: {
                            some: {
                                name: params.keyword
                            }
                        }
                    },
                ],
            },
            take: params.count,
            skip: (params.page - 1) * params.count,
            include:  {
				User: true,
				Tags: true,
				Contents: true,
				FlashcardFavorites: { select: { User: true, cAt: true } },
			}
        });
        let total = discussions.length + quizs.length + flashcards.length;
        return NextResponse.json({
            total,
            discussions: {
                total: discussions.length,
                hits: discussions,
            },
            quizs: {
                total: quizs.length,
                hits: quizs,
            },
            flashcards: {
                total: flashcards.length,
                hits: flashcards,
            },
        }, { status: 200 });

    } catch (e) {
        console.log(e);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
