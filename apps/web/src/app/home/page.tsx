"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, Home, Settings, Grid, BarChart2, User } from "lucide-react";

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
      (_event, session) => {
        setSession(session);
      }
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
    <div className="frosty flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-16 flex flex-col justify-between items-center py-6 border-r border-white/10">
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

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-regular mb-8">
          {session ? `Morning, ${session.user.user_metadata?.full_name}` : "Welcome!"}
        </h1>

        {/* Grid layout for widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 border border-white/10 rounded-xl">
            <h2 className="text-lg font-medium">Revenue Insights</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Revenue is up 12% compared to last month.
            </p>
          </div>
          <div className="p-4 border border-white/10 rounded-xl">
            <h2 className="text-lg font-medium">Profit Analysis</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Avg profit over 6 months: $1,450.50
            </p>
          </div>
          <div className="p-4 border border-white/10 rounded-xl">
            <h2 className="text-lg font-medium">Cash Runway</h2>
            <p className="text-3xl font-semibold mt-2">9 months</p>
          </div>
          <div className="p-4 border border-white/10 rounded-xl">
            <h2 className="text-lg font-medium">Monthly Spending</h2>
            <p className="text-2xl mt-2">$5,278.50</p>
          </div>
          <div className="p-4 border border-white/10 rounded-xl">
            <h2 className="text-lg font-medium">Outstanding Invoices</h2>
            <p className="text-sm mt-2">4 unpaid, total $12,500</p>
          </div>
          <div className="p-4 border border-white/10 rounded-xl">
            <h2 className="text-lg font-medium">Account Balance</h2>
            <p className="text-sm mt-2">$24,356 across currencies</p>
          </div>
        </div>
      </main>
    </div>
  );
}
