import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const clients = await prisma.client.findMany({ include: { vehicles: true, bookings: { include: { orders: true } } } });
  const data = clients.map((c) => ({
    ...c,
    visitCount: c.bookings.length,
    totalSpent: c.bookings.reduce((sum, b) => sum + b.orders.reduce((a, o) => a + o.totalPrice, 0), 0)
  }));
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const client = await prisma.client.create({ data: body });
  return NextResponse.json(client);
}

export async function PATCH(req: NextRequest) {
  const { id, ...data } = await req.json();
  const client = await prisma.client.update({ where: { id }, data });
  return NextResponse.json(client);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.client.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
