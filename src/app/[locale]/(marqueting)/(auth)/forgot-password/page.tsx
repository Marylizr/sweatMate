"use client";

import { useState } from "react";
import fetchResource, { ApiError } from "@/lib/fetchResource";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    try {
      const res = await fetchResource<{ message: string }>(
        "POST",
        "forgot-password",
        { noAuth: true, body: { email } }
      );
      setMsg(res?.message ?? "Check your inbox for reset instructions.");
    } catch (e: any) {
      if (e instanceof ApiError) setErr(e.data?.message || "Request failed");
      else setErr(e?.message || "Unexpected error");
    }
  };

  return (
    <form onSubmit={onSubmit}>{/* ... */}</form>
  );
}
