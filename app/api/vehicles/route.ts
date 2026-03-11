import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET() { return NextResponse.json(await prisma.vehicle.findMany()); }
export async function POST(req: NextRequest) { return NextResponse.json(await prisma.vehicle.create({ data: await req.json() })); }
export async function PATCH(req: NextRequest) { const { id, ...data } = await req.json(); return NextResponse.json(await prisma.vehicle.update({ where: { id }, data })); }
export async function DELETE(req: NextRequest) { const { id } = await req.json(); await prisma.vehicle.delete({ where: { id } }); return NextResponse.json({ ok: true }); }
