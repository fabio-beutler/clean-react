import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello, world!" });
}

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.next();
  }
  if (password !== "123456") {
    return NextResponse.next();
  }
  return NextResponse.json({ accessToken: "Hello, world!" });
}
