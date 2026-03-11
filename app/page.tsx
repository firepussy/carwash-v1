import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold">Car Wash Management MVP</h1>
      <p className="text-slate-600">Use the dashboard modules to manage bookings, operations, and clients.</p>
      <div className="flex gap-3">
        <Link href="/login" className="rounded-md bg-slate-900 px-4 py-2 text-white">Go to Login</Link>
        <Link href="/dashboard" className="rounded-md border px-4 py-2">Open Dashboard</Link>
      </div>
    </section>
  );
}
