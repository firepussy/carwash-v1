"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { Modal, ModalContent, ModalTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClientForm } from "@/components/clients/client-form";

export default function ClientsPage() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["clients"], queryFn: () => apiRequest<any[]>("/api/clients") });

  async function addClient(payload: any) {
    await apiRequest("/api/clients", { method: "POST", body: JSON.stringify(payload) });
    await qc.invalidateQueries({ queryKey: ["clients"] });
  }

  if (!data) return <p>Loading...</p>;

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Clients CRM</h1>
        <Modal><ModalTrigger asChild><Button>Add Client</Button></ModalTrigger><ModalContent><ClientForm onSubmit={addClient} /></ModalContent></Modal>
      </div>
      <Table><THead><TR><TH>Name</TH><TH>Phone</TH><TH>Vehicles</TH><TH>Visits</TH><TH>Total Spent</TH></TR></THead><TBody>
        {data.map((c) => <TR key={c.id}><TD>{c.name}</TD><TD>{c.phone}</TD><TD>{c.vehicles.length}</TD><TD>{c.visitCount}</TD><TD>${c.totalSpent.toFixed(2)}</TD></TR>)}
      </TBody></Table>
    </Card>
  );
}
