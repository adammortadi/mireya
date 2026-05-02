import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim().toLowerCase();
    const password = String(data.password || "");

    if (!name || !email || password.length < 8) {
      return NextResponse.json({ error: "Enter a name, email, and 8+ character password." }, { status: 400 });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ error: "An account already exists for this email." }, { status: 409 });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await hash(password, 12),
        role: "CUSTOMER",
      },
      select: { id: true, name: true, email: true },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Could not create account." }, { status: 500 });
  }
}
