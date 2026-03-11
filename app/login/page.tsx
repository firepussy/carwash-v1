"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@carwash.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
    if (!res.ok) return setError("Invalid credentials");
    const data = await res.json();
    setAuth(data);
    router.push("/dashboard");
  }

  return (
    <div className="mx-auto mt-16 max-w-md">
      <Card>
        <h1 className="mb-4 text-2xl font-semibold">Sign in</h1>
        <form className="space-y-3" onSubmit={submit}>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button className="w-full" type="submit">Login</Button>
        </form>
      </Card>
    </div>
  );
}
