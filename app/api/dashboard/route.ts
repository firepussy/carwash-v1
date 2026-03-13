import { NextResponse } from "next/server";
import { startOfDay, endOfDay } from "date-fns";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());

  const [todayBookings, todayOrders, activeOrders, current_orders, upcoming_bookings] = await Promise.all([
    prisma.booking.count({ where: { startTime: { gte: todayStart, lte: todayEnd } } }),
    prisma.order.findMany({ where: { createdAt: { gte: todayStart, lte: todayEnd } } }),
    prisma.order.count({ where: { status: "IN_PROGRESS" } }),
    prisma.order.findMany({ take: 5, orderBy: { createdAt: "desc" }, include: { booking: { include: { client: true } } } }),
    prisma.booking.findMany({ where: { startTime: { gte: new Date() } }, include: { client: true }, orderBy: { startTime: "asc" }, take: 5 })
  ]);

  const revenue = todayOrders.reduce((sum, o) => sum + o.totalPrice, 0);
  const avg = todayOrders.length ? revenue / todayOrders.length : 0;

  return NextResponse.json({
    metrics: { cars_today: todayBookings, revenue_today: revenue, avg_ticket: avg, active_orders: activeOrders },
    current_orders,
    upcoming_bookings
  });
}
