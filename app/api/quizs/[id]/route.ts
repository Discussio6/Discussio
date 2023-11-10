import { NextResponse } from "next/server";

// Dummy GET route to prevent empty route causing build error
export async function GET() {
	return NextResponse.json({ success: true }, { status: 200 });
}
