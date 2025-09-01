"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, Home, Settings, Grid, BarChart2, User } from "lucide-react";

// Supabase config
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function HomePage() {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen w-full flex frosty text-white">
      {/* Sidebar */}
      <aside className="w-16 flex flex-col justify-between items-center py-6 border-r border-white/10 bg-neutral-950 opacity-20">
        <div className="flex flex-col gap-6">
          <button className="p-2 hover:text-primary">
            <Home size={20} />
          </button>
          <button className="p-2 hover:text-primary">
            <Grid size={20} />
          </button>
          <button className="p-2 hover:text-primary">
            <BarChart2 size={20} />
          </button>
          <button className="p-2 hover:text-primary">
            <Settings size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <button className="p-2 hover:text-primary">
            <User size={20} />
          </button>
          {session && (
            <Button
              onClick={handleLogout}
              size="icon"
              variant="ghost"
              className="text-muted-foreground hover:text-red-500"
            >
              <LogOut size={18} />
            </Button>
          )}
        </div>
      </aside>

      {/* Main dashboard */}
      <main className="flex-1 px-12 py-10 overflow-y-auto">
        {/* Top bar: Greeting + right controls */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <span className="text-3xl font-light">Morning</span>
            <span className="text-3xl font-semibold ml-2">
              {session ? session.user.user_metadata?.full_name : "Viktor"}
            </span>
            <div className="text-neutral-400 mt-2 text-sm">
              here's a quick look at how things are going.
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-white/20 text-white/70 px-4 py-2 hover:bg-white/10">
              Customize
            </Button>
            <button className="p-2 rounded-md hover:bg-white/10">
              <svg width={20} height={20} fill="none" stroke="currentColor">
                <rect x="3" y="6" width="14" height="2" rx="1"/>
                <rect x="3" y="12" width="14" height="2" rx="1"/>
              </svg>
            </button>
            <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
              <User size={20} />
            </div>
          </div>
        </div>

        {/* Dashboard cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {/* Revenue Insights */}
          <div className="border rounded-xl p-5 shadow relative">
            <div className="text-sm font-semibold mb-1">Revenue Insights</div>
            <div className="text-base">
              <span className="text-green-500 font-bold">Revenue is up 12%</span> compared to last month.
            </div>
            <div className="absolute bottom-4 left-4 text-xs text-neutral-400">Want to see a breakdown?</div>
          </div>
          {/* Profit Analysis */}
          <div className="border rounded-xl p-5 shadow">
            <div className="text-sm font-semibold mb-1">Profit Analysis</div>
            <div className="flex items-end space-x-2 h-12 mb-2 mt-2">
              <div className="w-1.5 h-6 bg-white/40 rounded" />
              <div className="w-1.5 h-8 bg-white/80 rounded" />
              <div className="w-1.5 h-10 bg-white rounded" />
              <div className="w-1.5 h-7 bg-white/75 rounded" />
              <div className="w-1.5 h-9 bg-white/50 rounded" />
              <div className="w-1.5 h-8 bg-white/60 rounded" />
            </div>
            <div className="text-base">
              Avg profit over 6 months: <span className="font-bold">$1,450.50</span>
            </div>
          </div>
          {/* Cash Runway */}
          <div className="border  rounded-xl p-5 shadow">
            <div className="text-sm font-semibold mb-1">Cash Runway</div>
            <div className="text-3xl font-bold mt-2 mb-2 text-white">9 months</div>
            <div className="text-xs text-neutral-400">See burnrate</div>
          </div>
          {/* File Management */}
          <div className="border  rounded-xl p-5 shadow col-span-1">
            <div className="text-sm font-semibold mb-1">File Management</div>
            <div className="text-base">
              <span className="text-cyan-400 font-bold">2 new uploaded files</span>, automatically categorized as agreements
            </div>
            <div className="text-xs text-neutral-400 mt-3">Show documents</div>
          </div>
          {/* Monthly Spending */}
          <div className="border  rounded-xl p-5 shadow">
            <div className="text-sm font-semibold mb-1">Monthly Spending</div>
            <div className="text-3xl font-semibold mt-2 mb-2">$5,278.50</div>
            <div className="text-xs text-neutral-400">See biggest cost</div>
          </div>
          {/* Outstanding Invoices */}
          <div className="border rounded-xl p-5 shadow">
            <div className="text-sm font-semibold mb-1">Outstanding Invoices</div>
            <div className="text-base">
              4 unpaid, total <span className="font-bold">$12,500</span>
            </div>
            <div className="text-xs text-neutral-400 mt-3">See unpaid invoices</div>
          </div>
          {/* Account Balance */}
          <div className="border  rounded-xl p-5 shadow col-span-1">
            <div className="text-sm font-semibold mb-1">Account Balance</div>
            <div className="text-base mb-2">
              $24,356 across currencies
            </div>
            <div className="text-xs text-neutral-400">See account balances</div>
          </div>
          {/* Software Costs */}
          <div className="border rounded-xl p-5 shadow">
            <div className="text-sm font-semibold mb-1">Software Costs</div>
            <div className="text-base">
              Your <span className="text-orange-400 font-bold">software costs increased by 10%</span> this month
            </div>
            <div className="mt-4 w-full h-6">
              <svg width="100%" height="100%" viewBox="0 0 120 16" fill="none">
                <path d="M0 8 Q30 5 60 10 Q90 15 120 8" stroke="#fff" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <div className="text-xs text-neutral-400 mt-0">See which subscriptions went up?</div>
          </div>
        </div>
      </main>
    </div>
  );
}
