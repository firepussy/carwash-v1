import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const boxes = await prisma.washBox.findMany({ include: { bookings: { where: { status: { in: ["CONFIRMED", "IN_PROGRESS"] } }, include: { vehicle: true, orders: true }, take: 1, orderBy: { startTime: "asc" } } } });
  return NextResponse.json(boxes.map((b) => {
    const bk = b.bookings[0];
    return {
      id: b.id,
      bookingId: bk?.id ?? null,
      name: b.name,
      status: bk ? bk.status : b.status,
      currentCar: bk ? `${bk.vehicle.brand} ${bk.vehicle.model}` : null,
      currentService: "Assigned Service",
      start: bk?.orders[0]?.actualStart || bk?.startTime || null
    };
  }));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const order = await prisma.order.create({ data: body });
  return NextResponse.json(order);
}

export async function PATCH(req: NextRequest) {
  const { bookingId, action } = await req.json();
  if (action === "start") {
    await prisma.booking.update({ where: { id: bookingId }, data: { status: "IN_PROGRESS" } });
  } else if (action === "finish") {
    await prisma.booking.update({ where: { id: bookingId }, data: { status: "DONE" } });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.order.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
