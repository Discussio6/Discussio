import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getQuizsProps } from "@/lib/queries/quizs";
import { get } from "http";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const getParam = (req:NextRequest, key:string) =>{
    return req.nextUrl.searchParams.get(key);
}
export async function GET(req: NextRequest) {
    try{
        let params:getQuizsProps = {
            count: parseInt(req.nextUrl.searchParams.get("count") || "10"),
            orderBy: req.nextUrl.searchParams.get("orderBy") || "cAt:desc",
            tags: (req.nextUrl.searchParams.get("tags") || "").split(",").filter(tag => tag.trim().length > 0),
            page: parseInt(req.nextUrl.searchParams.get("page") || "1"),
            searchword: req.nextUrl.searchParams.get("searchword") || "",
        };
        if (params.page < 1) params.page = 1;
        if (params.count < 1) params.count = 1;
        const total = await db.quiz.count({
            where: {
                OR: (params.tags||[]).map((tag) => ({ Tags: { some: { name: tag } } })),
                quiz_name: { contains: params.searchword },
            },
        });
        const quizs = await db.quiz.findMany({
            where: {
                OR: (params.tags||[]).map((tag) => ({ Tags: { some: { name: tag } } })),
                quiz_name: { contains: params.searchword },
            },
            include: {
                Tags: true,
                QuizParticipant: true,
                QuizParticipantAnswer: true,
                QuizQuestion: true
            },
            skip: (params.page - 1) * params.count,
            take: params.count,
            orderBy: {
                [params.orderBy.split(":")[0]]: params.orderBy.split(":")[1],
            },
        });
        return NextResponse.json({ total, hits: quizs }, { status: 200 });
    }catch(error){
        return NextResponse.json({ success: false }, { status: 500 });
    }

}
export async function POST(req: NextRequest) {
    try{
        const body = await req.json();
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({ success: false }, { status: 401 });
        }
        const user = await db.user.findUnique({
            where: { id : session.id }
        });
        if(!user){
            return NextResponse.json({ success: false }, { status: 401 });
        }
        const quiz = await db.quiz.create({
            data: {
              quiz_id: body.quiz_id,
              quiz_name: body.quiz_name,
              quiz_description: body.quiz_description,
              QuizQuestion: {
                create: body.QuizQuestion, // Ensure this aligns with your schema
              },
              user_id: user.id, // This connects the quiz to a user
              Tags: {
                connect: body.tags.map((tag: string) => ({ name: tag })),
              },
              acl: body.acl,
              cAt: new Date(),
              mAt: new Date(),
            },
            include: {
              Tags: true,
              QuizQuestion: true,
            },
          });
        return NextResponse.json({ success: true, data: quiz }, { status: 200 });
    }catch(error){
        return NextResponse.json({ success: false }, { status: 500 });
    }

}