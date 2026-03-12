import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function BoxCard({ box, onAction }: { box: any; onAction: (bookingId: string, action: string) => void }) {
  return (
    <Card className="space-y-2">
      <div className="flex items-center justify-between"><h3 className="font-semibold">{box.name}</h3><Badge>{box.status}</Badge></div>
      <p className="text-sm">Car: {box.currentCar || "-"}</p>
      <p className="text-sm">Service: {box.currentService || "-"}</p>
      <p className="text-sm">Start: {box.start || "-"}</p>
      <div className="flex gap-2 pt-2">
        <Button size="sm" onClick={() => box.bookingId && onAction(box.bookingId, "start")} variant="outline">Start</Button>
        <Button size="sm" onClick={() => box.bookingId && onAction(box.bookingId, "finish")}>Finish</Button>
      </div>
    </Card>
  );
}
