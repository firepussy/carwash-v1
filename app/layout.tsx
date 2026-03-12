import "./globals.css";
import Link from "next/link";
import { Providers } from "@/components/providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen">
            <header className="border-b bg-white">
              <nav className="mx-auto flex max-w-7xl items-center gap-6 p-4 text-sm">
                <Link href="/dashboard" className="font-semibold">CarWash MVP</Link>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/bookings">Bookings</Link>
                <Link href="/operations">Operations</Link>
                <Link href="/clients">Clients</Link>
              </nav>
            </header>
            <main className="mx-auto max-w-7xl p-6">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
