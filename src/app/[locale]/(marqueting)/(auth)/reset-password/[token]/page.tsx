"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import fetchResource, { ApiError } from "@/lib/fetchResource";

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    try {
      const res = await fetchResource<{ message: string }>(
        "POST",
        "reset-password",
        { noAuth: true, body: { token, password } }
      );
      setMsg(res?.message ?? "Password updated.");
      // opcional: router.push("/login");
    } catch (e: any) {
      if (e instanceof ApiError) setErr(e.data?.message || "Request failed");
      else setErr(e?.message || "Unexpected error");
    }
  };

  return (
    <form onSubmit={onSubmit}>{/* ... */}</form>
  );
}
