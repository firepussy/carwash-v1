import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export async function loginWithCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;

  const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: "8h" });
  return { token, user: { id: user.id, email: user.email, role: user.role } };
}

export function setSessionCookie(token: string) {
  cookies().set("session", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/" });
}

export function getSession() {
  const token = cookies().get("session")?.value;
  if (!token) return null;
  try { return jwt.verify(token, JWT_SECRET) as { id: string; role: string; email: string }; }
  catch { return null; }
}
