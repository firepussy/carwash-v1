"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { BookingForm } from "@/components/bookings/booking-form";
import { Modal, ModalContent, ModalTrigger } from "@/components/ui/dialog";

export default function BookingsPage() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["bookings"], queryFn: () => apiRequest<any[]>("/api/bookings"), refetchInterval: 10000 });

  async function createBooking(payload: any) {
    const startTime = new Date(`${payload.date}T${payload.time}`);
    const endTime = new Date(startTime.getTime() + 30 * 60000);
    await apiRequest("/api/bookings", { method: "POST", body: JSON.stringify({
      clientId: payload.clientId, vehicleId: payload.vehicleId, boxId: payload.boxId, startTime, endTime, status: payload.status
    })});
    await qc.invalidateQueries({ queryKey: ["bookings"] });
  }

  async function cancel(id: string) {
    await apiRequest("/api/bookings", { method: "PATCH", body: JSON.stringify({ id, status: "CANCELLED" })});
    await qc.invalidateQueries({ queryKey: ["bookings"] });
  }

  if (!data) return <p>Loading...</p>;

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Bookings</h1>
        <Modal>
          <ModalTrigger asChild><Button>Create Booking</Button></ModalTrigger>
          <ModalContent><h2 className="mb-3 text-lg font-semibold">New Booking</h2><BookingForm onSubmit={createBooking} /></ModalContent>
        </Modal>
      </div>
      <Table><THead><TR><TH>Client</TH><TH>Vehicle</TH><TH>Box</TH><TH>Time</TH><TH>Status</TH><TH /></TR></THead><TBody>
        {data.map((b) => <TR key={b.id}><TD>{b.client.name}</TD><TD>{`${b.vehicle.brand} ${b.vehicle.model}`}</TD><TD>{b.box.name}</TD><TD>{new Date(b.startTime).toLocaleString()}</TD><TD><Badge>{b.status}</Badge></TD><TD><Button size="sm" variant="outline" onClick={() => cancel(b.id)}>Cancel</Button></TD></TR>)}
      </TBody></Table>
    </Card>
  );
}
