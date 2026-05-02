import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const email = String(data.email || "").trim().toLowerCase();
    const password = String(data.password || "");

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await compare(password, user.password))) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Could not sign in." }, { status: 500 });
  }
}
