"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  Home,
  Settings,
  Grid,
  BarChart2,
  User,
  Search,
  Sun,
  Clock,
  FileText,
  DollarSign,
  TrendingUp,
  Receipt,
  CreditCard,
  Plus,
  MessageCircle,
  ArrowUp,
} from "lucide-react";

// page.tsx or layout.tsx
import { GeistMono } from 'geist/font/mono'


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

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) {
        fetchProfile(data.session.user.id);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", userId)
      .single();

    if (!error) {
      setProfile(data);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen w-full flex frosty text-white">
      {/* Sidebar */}
      <aside className="w-16 flex flex-col justify-between items-center py-6 bg-neutral-900/50 border-r border-white/10">
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div className="p-2">
            <Sun size={24} className="text-white" />
          </div>

          <button className="p-2 hover:cursor-pointer">
            <Grid size={20} />
          </button>
          <button className="p-2 hover:cursor-pointer">
            <Home size={20} />
          </button>
          <button className="p-2 hover:cursor-pointer">
            <FileText size={20} />
          </button>
          <button className="p-2 hover:cursor-pointer">
            <Receipt size={20} />
          </button>
          <button className="p-2 hover:cursor-pointer">
            <Clock size={20} />
          </button>
          <button className="p-2 hover:cursor-pointer">
            <FileText size={20} />
          </button>
          <button className="p-2 hover:cursor-pointer">
            <User size={20} />
          </button>
          <button className="p-2 hover:cursor-pointer">
            <Settings size={20} />
          </button>
          <button className="p-2 hover:cursor-pointer" onClick={handleLogout}
>
            <LogOut size={20} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Search Bar */}
        <div className="px-8 py-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            <Search size={16} className="text-neutral-400" />
            <input
              type="text"
              placeholder="Find anything"
              className="bg-transparent text-neutral-400 placeholder-neutral-500 border-none outline-none flex-1 text-sm"
            />
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className={`${GeistMono.className} text-4xl font-light tracking-tighter`}>
                Morning{" "}
                <span className="font-regular text-muted-foreground">
                  {session?.user?.user_metadata?.full_name
                    ? session.user.user_metadata.full_name.split(" ")[0]
                    : ""}
                  ,
                </span>
              </h1>
              <p className="text-neutral-400 mt-2 text-sm">
                here's a quick look at how things are going.
              </p>
            </div>
            <div className="flex items-center gap-3">
             
              <button className="p-2 rounded hover:bg-white/10">
                <div className="w-5 h-2 flex flex-col gap-1">
                  <div className="w-full h-0.5 bg-white/60"></div>
                  <div className="w-full h-0.5 bg-white/60"></div>
                </div>
              </button>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Revenue Insights */}
            <div className="bg-neutral-900/30 border border-white/10  p-6 relative">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={14} className="text-neutral-400" />
                <span className="text-xs text-neutral-400 font-medium">
                  Revenue Insights
                </span>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full ml-auto">
                  New
                </span>
              </div>
              <div className="text-sm mb-4">
                You're on track this month!{" "}
                <span className="font-regular">Revenue is up 12%</span>{" "}
                compared to last month.
              </div>
              <div className="absolute bottom-4 left-6">
                <button className="text-xs text-neutral-500 hover:text-cyan-400">
                  Want to see a breakdown?
                </button>
              </div>
            </div>

            {/* Profit Analysis */}
            <div className="bg-neutral-900/30 border border-white/10  p-6">
              <div className="flex items-center gap-2 mb-3">
                <BarChart2 size={14} className="text-neutral-400" />
                <span className="text-sm font-regular">Profit Analysis</span>
              </div>
              <div className={"text-sm text-neutral-300 mb-3"}>
                Your average profit during 6 months is
              </div>
              <div className={`${GeistMono.className} text-2xl font-regular mb-4 tracking-tighter`}>$1,450.50</div>
              {/* <div className="flex items-end gap-1 h-12">
                <div className="w-2 h-6 bg-white/40 rounded-sm"></div>
                <div className="w-2 h-8 bg-white/60 rounded-sm"></div>
                <div className="w-2 h-10 bg-white/80 rounded-sm"></div>
                <div className="w-2 h-7 bg-white/50 rounded-sm"></div>
                <div className="w-2 h-9 bg-white/70 rounded-sm"></div>
                <div className="w-2 h-8 bg-white rounded-sm"></div>
              </div> */}
            </div>

            {/* Cash Runway */}
            <div className="bg-neutral-900/30 border border-white/10  p-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={14} className="text-neutral-400" />
                <span className="text-sm font-regular">Cash Runway</span>
              </div>
              <div className="text-sm text-neutral-300 mb-2">
                Your current runway is
              </div>
              <div className={`${GeistMono.className} text-2xl font-regular mb-4 tracking-tighter`}>9 months</div>
              <button className="text-xs text-neutral-500 hover:text-cyan-400">
                See burnrate
              </button>
            </div>

            {/* File Management */}
            <div className="bg-neutral-900/30 border border-white/10  p-6">
              <div className="flex items-center gap-2 mb-3">
                <FileText size={14} className="text-neutral-400" />
                <span className="text-sm font-regular">File Management</span>
              </div>
              <div className="text-sm mb-4">
                <span className="text-white font-regular">
                  2 new uploaded files
                </span>
                , automatically categorized as{" "}
                <span className="font-regular">agreements</span>
              </div>
              <button className="text-xs text-neutral-500 hover:text-cyan-400">
                Show documents
              </button>
            </div>

            {/* Monthly Spending */}
            <div className="bg-neutral-900/30 border border-white/10  p-6">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign size={14} className="text-neutral-400" />
                <span className="text-sm font-regular">Monthly Spending</span>
              </div>
              <div className="text-sm text-neutral-300 mb-2">
                Spending this month
              </div>
              <div className={`${GeistMono.className} text-2xl font-regular mb-4 tracking-tighter`}>$5,278.50</div>
              <button className="text-xs text-neutral-500 hover:text-cyan-400">
                See biggest cost
              </button>
            </div>

            {/* Outstanding Invoices */}
            <div className="bg-neutral-900/30 border border-white/10  p-6">
              <div className="flex items-center gap-2 mb-3">
                <Receipt size={14} className="text-neutral-400" />
                <span className="text-sm font-regular">
                  Outstanding Invoices
                </span>
                
              </div>
              <div className="text-sm mb-4">
                You currently have{" "}
                <span className="font-regular">4 unpaid</span> and{" "}
                <span className={`${GeistMono.className} font-regular mb-4 tracking-tighter`}>$12,500</span> outstanding in
                outstanding invoices
              </div>
              <button className="text-xs text-neutral-500 hover:text-cyan-400">
                See unpaid invoices
              </button>
            </div>

            {/* Account Balance */}
            <div className="bg-neutral-900/30 border border-white/10  p-6">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard size={14} className="text-neutral-400" />
                <span className="text-sm font-regular">Account Balance</span>
              </div>
              <div className="text-sm text-neutral-300 mb-2">
                Total account balance is{" "}
                <span className={`${GeistMono.className} mb-4 tracking-tighter`}>$24,356</span> in two different
                currencies
              </div>
              <button className="text-xs text-neutral-500 hover:text-cyan-400 mt-4">
                See account balances
              </button>
            </div>

            {/* Software Costs */}
            <div className="bg-neutral-900/30 border border-white/10  p-6">
              <div className="flex items-center gap-2 mb-3">
                <Settings size={14} className="text-neutral-400" />
                <span className="text-sm font-regular">Software Costs</span>
              </div>
              <div className="text-sm mb-4">
                Your{" "}
                <span className={`${GeistMono.className} font-regular mb-4 tracking-tighter`}>
                  software costs increased by 10%
                </span>{" "}
                this month
              </div>
              <div className="mb-3">
                <svg
                  width="100%"
                  height="24"
                  viewBox="0 0 120 24"
                  className="text-white"
                >
                  <path
                    d="M0 18 Q20 12 40 15 Q60 8 80 12 Q100 6 120 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <button className="text-xs text-neutral-500 hover:text-cyan-400">
                See which subscriptions went up?
              </button>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="flex items-center gap-6 py-4">
            <button className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white">
              <BarChart2 size={16} />
              Revenue
            </button>
            <button className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white">
              <FileText size={16} />
              Duplicate invoice
            </button>
            <button className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white">
              <DollarSign size={16} />
              Expenses
            </button>
            <button className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white">
              <Clock size={16} />
              Time track
            </button>
            <button className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white">
              <Plus size={16} />
              New task
            </button>
            <button className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white">
              <FileText size={16} />
              Health report
            </button>
          </div>
        </div>

        {/* Bottom Chat Bar */}
        <div className="px-8 py-4 border-t border-white/10">
          <div className="flex items-center gap-4">
            <div className="flex-1 flex items-center gap-3 bg-neutral-900/50  px-4 py-3">
              <input
                type="text"
                placeholder="Ask anything"
                className="bg-transparent text-white placeholder-neutral-500 border-none outline-none flex-1"
              />
              <button className="text-neutral-400 hover:text-white">
                <Plus size={16} />
              </button>
              <button className="text-neutral-400 hover:text-white">
                <MessageCircle size={16} />
              </button>
            </div>
            <button className="w-10 h-10 bg-white text-black  flex items-center justify-center hover:bg-neutral-200">
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
