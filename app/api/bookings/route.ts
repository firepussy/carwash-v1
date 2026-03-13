import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  return NextResponse.json(await prisma.booking.findMany({ include: { client: true, vehicle: true, box: true }, orderBy: { startTime: "desc" } }));
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json(await prisma.booking.create({ data: { ...body, startTime: new Date(body.startTime), endTime: new Date(body.endTime) } }));
}
export async function PATCH(req: NextRequest) {
  const { id, ...data } = await req.json();
  return NextResponse.json(await prisma.booking.update({ where: { id }, data }));
}
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.booking.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
