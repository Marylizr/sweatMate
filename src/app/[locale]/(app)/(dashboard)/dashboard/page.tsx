// src/app/(dashboard)/dashboard/page.tsx
"use client";

import Card from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-bg text-text-primary">
      <div className="container mx-auto py-8 space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Card>
            <div className="p-5">
              <h2 className="text-sm text-text-secondary mb-1">KPI 1</h2>
              <p className="text-3xl font-semibold">42</p>
            </div>
          </Card>

          <Card>
            <div className="p-5">
              <h2 className="text-sm text-text-secondary mb-1">KPI 2</h2>
              <p className="text-3xl font-semibold">128</p>
            </div>
          </Card>

          <Card className="md:col-span-2 xl:col-span-1">
            <div className="p-5">
              <h2 className="text-sm text-text-secondary mb-1">KPI 3</h2>
              <p className="text-3xl font-semibold">7.5%</p>
            </div>
          </Card>

          <Card className="md:col-span-2">
            <div className="p-5">
              <h2 className="text-base font-medium mb-3">Activity Feed</h2>
              <div className="text-sm text-text-secondary">
                No activity yet.
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-5">
              <h2 className="text-base font-medium mb-3">Quick Actions</h2>
              <div className="flex gap-2">
                <button className="rounded-lg px-3 py-1.5 text-sm border border-white/10 hover:bg-white/5 transition">
                  New Client
                </button>
                <button className="rounded-lg px-3 py-1.5 text-sm bg-accent text-white hover:bg-accent-soft transition">
                  New Event
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
