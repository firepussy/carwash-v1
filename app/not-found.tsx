import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto mt-20 max-w-lg rounded-xl border bg-white p-8 text-center shadow-sm">
      <h2 className="text-2xl font-semibold">Page not found</h2>
      <p className="mt-2 text-slate-600">The route may be wrong, or your Vercel deployment domain is pointing to an older deployment.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/" className="rounded-md bg-slate-900 px-4 py-2 text-white">Home</Link>
        <Link href="/login" className="rounded-md border px-4 py-2">Login</Link>
      </div>
    </div>
  );
}
