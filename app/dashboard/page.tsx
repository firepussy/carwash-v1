"use client";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card } from "@/components/ui/card";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";

export default function DashboardPage() {
  const { data } = useQuery({ queryKey: ["dashboard"], queryFn: () => apiRequest<any>("/api/dashboard"), refetchInterval: 15000 });
  if (!data) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Cars Today" value={data.metrics.cars_today} />
        <StatCard label="Revenue Today" value={`$${data.metrics.revenue_today.toFixed(2)}`} />
        <StatCard label="Avg Ticket" value={`$${data.metrics.avg_ticket.toFixed(2)}`} />
        <StatCard label="Active Orders" value={data.metrics.active_orders} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="mb-2 text-lg font-semibold">Current Orders</h2>
          <Table><THead><TR><TH>Client</TH><TH>Status</TH><TH>Total</TH></TR></THead><TBody>
            {data.current_orders.map((o: any) => <TR key={o.id}><TD>{o.booking.client.name}</TD><TD>{o.status}</TD><TD>${o.totalPrice}</TD></TR>)}
          </TBody></Table>
        </Card>
        <Card>
          <h2 className="mb-2 text-lg font-semibold">Upcoming Bookings</h2>
          <Table><THead><TR><TH>Client</TH><TH>Time</TH><TH>Status</TH></TR></THead><TBody>
            {data.upcoming_bookings.map((b: any) => <TR key={b.id}><TD>{b.client.name}</TD><TD>{new Date(b.startTime).toLocaleTimeString()}</TD><TD>{b.status}</TD></TR>)}
          </TBody></Table>
        </Card>
      </div>
    </div>
  );
}
