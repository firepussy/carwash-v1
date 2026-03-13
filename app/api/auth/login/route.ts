import { NextRequest, NextResponse } from "next/server";
import { loginWithCredentials, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await loginWithCredentials(body.email, body.password);
  if (!result) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  setSessionCookie(result.token);
  return NextResponse.json(result);
}
