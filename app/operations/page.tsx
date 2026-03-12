"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api";
import { BoxCard } from "@/components/operations/box-card";

export default function OperationsPage() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["operations"], queryFn: () => apiRequest<any[]>("/api/orders"), refetchInterval: 5000 });

  async function onAction(bookingId: string, action: string) {
    await apiRequest("/api/orders", { method: "PATCH", body: JSON.stringify({ bookingId, action }) });
    await qc.invalidateQueries({ queryKey: ["operations"] });
  }

  if (!data) return <p>Loading...</p>;
  return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{data.map((box) => <BoxCard key={box.id} box={box} onAction={onAction} />)}</div>;
}
