import { PrismaClient, Role, BookingStatus, OrderStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.orderService.deleteMany();
  await prisma.order.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.client.deleteMany();
  await prisma.service.deleteMany();
  await prisma.washBox.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash("password123", 10);
  await prisma.user.createMany({ data: [
    { email: "admin@carwash.com", password, role: Role.ADMIN },
    { email: "staff@carwash.com", password, role: Role.STAFF },
    { email: "owner@carwash.com", password, role: Role.OWNER }
  ]});

  const clients = await Promise.all(Array.from({ length: 10 }).map((_, i) => prisma.client.create({ data: { name: `Client ${i+1}`, phone: `+10000000${i+1}` } })));
  const vehicles = await Promise.all(clients.map((client, i) => prisma.vehicle.create({ data: { clientId: client.id, brand: ["BMW","Audi","Tesla","Mercedes","Lexus"][i%5], model: `Model ${i+1}`, plateNumber: `CW-${1000+i}` } })));

  const services = await Promise.all([
    prisma.service.create({ data: { name: "Express Wash", durationMinutes: 20, price: 25 } }),
    prisma.service.create({ data: { name: "Full Wash", durationMinutes: 40, price: 50 } }),
    prisma.service.create({ data: { name: "Interior Cleaning", durationMinutes: 30, price: 35 } }),
    prisma.service.create({ data: { name: "Wax", durationMinutes: 25, price: 30 } }),
    prisma.service.create({ data: { name: "Detailing", durationMinutes: 60, price: 120 } })
  ]);

  const boxes = await Promise.all(Array.from({ length: 4 }).map((_, i) => prisma.washBox.create({ data: { name: `BOX ${i+1}` } })));

  for (let i = 0; i < 20; i++) {
    const start = new Date();
    start.setHours(8 + (i % 10), (i % 2) * 30, 0, 0);
    start.setDate(start.getDate() + Math.floor(i / 6));
    const end = new Date(start.getTime() + 45 * 60000);
    const booking = await prisma.booking.create({
      data: {
        clientId: clients[i % clients.length].id,
        vehicleId: vehicles[i % vehicles.length].id,
        boxId: boxes[i % boxes.length].id,
        startTime: start,
        endTime: end,
        status: [BookingStatus.NEW, BookingStatus.CONFIRMED, BookingStatus.IN_PROGRESS, BookingStatus.DONE][i % 4]
      }
    });

    if (i % 2 === 0) {
      const order = await prisma.order.create({
        data: {
          bookingId: booking.id,
          actualStart: start,
          actualEnd: i % 4 === 0 ? end : null,
          totalPrice: services[i % services.length].price,
          status: i % 4 === 0 ? OrderStatus.COMPLETED : OrderStatus.IN_PROGRESS
        }
      });
      await prisma.orderService.create({ data: { orderId: order.id, serviceId: services[i % services.length].id, price: services[i % services.length].price } });
    }
  }
}

main().finally(() => prisma.$disconnect());
