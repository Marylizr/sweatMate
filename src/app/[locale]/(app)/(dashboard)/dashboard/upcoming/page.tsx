"use client";

import { useEffect, useState } from "react";
import fetchResource, { ApiError } from "@/lib/fetchResource"; // ✅

type EventItem = {
  _id: string;
  title: string;
  date: string;
  duration: number;
  trainerOnly?: boolean;
  eventType?: string;
  location?: string;
};

export default function UpcomingMeetingsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const data = await fetchResource<EventItem[]>("GET", "events"); // ✅ genérico
        if (!alive) return;
        setEvents(Array.isArray(data) ? data : []);
      } catch (e: any) {
        if (!alive) return;
        if (e instanceof ApiError && e.status === 401) {
          setErr("Your session has expired. Please sign in again."); // ✅ sin UnauthorizedError
        } else if (e instanceof ApiError) {
          setErr(e.data?.message || `Request failed (${e.status})`);
        } else {
          setErr(e?.message || "Unexpected error");
        }
      } finally {
        alive && setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // ...tu render
  return null;
}
