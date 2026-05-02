"use server";

import { compare } from "bcryptjs";
import { redirect } from "next/navigation";
import { clearAdminSession, createAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export type LoginState = {
  error?: string;
};

export async function loginAdmin(_state: LoginState, formData: FormData): Promise<LoginState> {
  const identity = String(formData.get("identity") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const remember = formData.get("remember") === "on";

  if (!identity || !password) {
    return { error: "Enter your username and password." };
  }

  const configuredEmail = process.env.ADMIN_EMAIL;
  const configuredHash = process.env.ADMIN_PASSWORD_HASH;

  if (configuredEmail && configuredHash && identity === configuredEmail.toLowerCase()) {
    const isValid = await compare(password, configuredHash);
    if (isValid) {
      await createAdminSession({
        userId: "env-admin",
        email: configuredEmail,
        name: "Mireya Admin",
        role: "ADMIN",
      }, remember);
      redirect("/mireya-studio/dashboard");
    }
  }

  // Artificial delay to mitigate brute-force attacks (OWASP A07)
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: identity }, { name: identity }],
      role: "ADMIN",
    },
  });

  if (user && (await compare(password, user.password))) {
    await createAdminSession({
      userId: user.id,
      email: user.email,
      name: user.name || "Mireya Admin",
      role: "ADMIN",
    }, remember);
    redirect("/mireya-studio/dashboard");
  }

  return { error: "Invalid admin credentials." };
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/mireya-studio");
}
