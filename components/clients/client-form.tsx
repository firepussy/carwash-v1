"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ClientForm({ onSubmit, initial }: { onSubmit: (payload: any) => Promise<void>; initial?: any }) {
  const [form, setForm] = useState(initial ?? { name: "", phone: "" });
  return (
    <form className="space-y-3" onSubmit={async (e) => { e.preventDefault(); await onSubmit(form); }}>
      <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <Button type="submit">Save Client</Button>
    </form>
  );
}
