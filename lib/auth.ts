import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";

const cookieName = "mireya_admin_session";
const defaultSessionTtlMs = 1000 * 60 * 60 * 24;
const rememberedSessionTtlMs = 1000 * 60 * 60 * 24 * 30;

export type AdminSession = {
  userId: string;
  email: string;
  name: string;
  role: "ADMIN";
  expiresAt: string;
};

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be set to a strong secret.");
  }

  return new TextEncoder().encode(secret);
}

export async function createAdminSession(
  payload: Omit<AdminSession, "expiresAt">,
  remember = true,
) {
  const expires = new Date(Date.now() + (remember ? rememberedSessionTtlMs : defaultSessionTtlMs));
  const session: AdminSession = {
    ...payload,
    expiresAt: expires.toISOString(),
  };
  const token = await new SignJWT(session)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(expires.getTime() / 1000))
    .sign(getSessionSecret());

  const cookieStore = await cookies();
  cookieStore.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires,
    path: "/",
  });
}

export async function readAdminSession() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSessionSecret());
    if (payload.role !== "ADMIN" || !payload.userId || !payload.email) return null;

    return payload as AdminSession;
  } catch {
    return null;
  }
}

export const requireAdmin = cache(async () => {
  const session = await readAdminSession();
  if (!session) {
    redirect("/mireya-studio");
  }

  return session;
});

export async function clearAdminSession() {
  (await cookies()).delete(cookieName);
}
