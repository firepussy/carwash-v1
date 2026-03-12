"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function BookingForm({ onSubmit, initial }: { onSubmit: (payload: any) => Promise<void>; initial?: any }) {
  const [form, setForm] = useState(initial ?? { clientId: "", vehicleId: "", serviceId: "", boxId: "", date: "", time: "", status: "NEW" });
  return (
    <form className="grid grid-cols-2 gap-3" onSubmit={async (e) => { e.preventDefault(); await onSubmit(form); }}>
      <Input placeholder="Client ID" value={form.clientId} onChange={(e) => setForm({ ...form, clientId: e.target.value })} />
      <Input placeholder="Vehicle ID" value={form.vehicleId} onChange={(e) => setForm({ ...form, vehicleId: e.target.value })} />
      <Input placeholder="Service ID" value={form.serviceId} onChange={(e) => setForm({ ...form, serviceId: e.target.value })} />
      <Input placeholder="Wash Box ID" value={form.boxId} onChange={(e) => setForm({ ...form, boxId: e.target.value })} />
      <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
      <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
      <Input placeholder="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} />
      <div className="col-span-2"><Button type="submit">Save Booking</Button></div>
    </form>
  );
}
