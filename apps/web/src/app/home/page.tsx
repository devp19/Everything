"use client";

import { useState, useEffect, useRef, JSX } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { GeistMono } from "geist/font/mono";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
} from "@/components/ui/context-menu";
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
  GripVertical,
} from "lucide-react";

// ============ Types ============
interface Position {
  x: number;
  y: number;
}

interface DashboardCardData {
  id: string;
  content: JSX.Element;
  x: number;
  y: number;
}

interface DashboardCardProps {
  card: DashboardCardData;
  isDragging: boolean;
  snapToGrid: boolean;
  onDragStart: (cardId: string) => void;
  onDragEnd: () => void;
  onDrag: (cardId: string, position: Position) => void;
}

interface Session {
  user?: {
    id: string;
    user_metadata?: {
      full_name?: string;
    };
  };
}

interface Profile {
  full_name: string;
}

// ============ Supabase ============
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ============ Card Content ============
const RevenueInsightsCard = () => (
  <>
    <div className="flex items-center gap-2 mb-2">
      <TrendingUp size={14} className="text-neutral-400" />
      <span className="text-xs text-neutral-400 font-medium">Revenue Insights</span>
      <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full ml-auto">New</span>
    </div>
    <div className="text-sm mb-4">
      You're on track this month! <span className="font-regular">Revenue is up 12%</span> compared to last month.
    </div>
    <div className="absolute bottom-4 left-6">
      <button className="text-xs text-neutral-500 hover:text-white no-drag">
        Want to see a breakdown?
      </button>
    </div>
  </>
);

const ProfitAnalysisCard = () => (
  <>
    <div className="flex items-center gap-2 mb-3">
      <BarChart2 size={14} className="text-neutral-400" />
      <span className="text-sm font-regular">Profit Analysis</span>
    </div>
    <div className="text-sm text-neutral-300 mb-3">
      Your average profit during 6 months is
    </div>
    <div className={`${GeistMono.className} text-2xl font-regular mb-4 tracking-tighter`}>$1,450.50</div>
  </>
);

const CashRunwayCard = () => (
  <>
    <div className="flex items-center gap-2 mb-3">
      <Clock size={14} className="text-neutral-400" />
      <span className="text-sm font-regular">Cash Runway</span>
    </div>
    <div className="text-sm text-neutral-300 mb-2">Your current runway is</div>
    <div className={`${GeistMono.className} text-2xl font-regular mb-4 tracking-tighter`}>9 months</div>
    <button className="text-xs text-neutral-500 hover:text-white no-drag">
      See burnrate
    </button>
  </>
);

const FileManagementCard = () => (
  <>
    <div className="flex items-center gap-2 mb-3">
      <FileText size={14} className="text-neutral-400" />
      <span className="text-sm font-regular">File Management</span>
    </div>
    <div className="text-sm mb-4">
      <span className="text-white font-regular">2 new uploaded files</span>, automatically categorized as{" "}
      <span className="font-regular">agreements</span>
    </div>
    <button className="text-xs text-neutral-500 hover:text-white no-drag">
      Show documents
    </button>
  </>
);

const MonthlySpendingCard = () => (
  <>
    <div className="flex items-center gap-2 mb-3">
      <DollarSign size={14} className="text-neutral-400" />
      <span className="text-sm font-regular">Monthly Spending</span>
    </div>
    <div className="text-sm text-neutral-300 mb-2">Spending this month</div>
    <div className={`${GeistMono.className} text-2xl font-regular mb-4 tracking-tighter`}>$5,278.50</div>
    <button className="text-xs text-neutral-500 hover:text-white no-drag">
      See biggest cost
    </button>
  </>
);

const OutstandingInvoicesCard = () => (
  <>
    <div className="flex items-center gap-2 mb-3">
      <Receipt size={14} className="text-neutral-400" />
      <span className="text-sm font-regular">Outstanding Invoices</span>
    </div>
    <div className="text-sm mb-4">
      You currently have <span className="font-regular">4 unpaid</span> and{" "}
      <span className={`${GeistMono.className} font-regular mb-4 tracking-tighter`}>$12,500</span> outstanding in
      outstanding invoices
    </div>
    <button className="text-xs text-neutral-500 hover:text-white no-drag">
      See unpaid invoices
    </button>
  </>
);

const AccountBalanceCard = () => (
  <>
    <div className="flex items-center gap-2 mb-3">
      <CreditCard size={14} className="text-neutral-400" />
      <span className="text-sm font-regular">Account Balance</span>
    </div>
    <div className="text-sm text-neutral-300 mb-2">
      Total account balance is{" "}
      <span className={`${GeistMono.className} mb-4 tracking-tighter`}>$24,356</span> in two different currencies
    </div>
    <button className="text-xs text-neutral-500 hover:text-white mt-4 no-drag">
      See account balances
    </button>
  </>
);

const SoftwareCostsCard = () => (
  <>
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
      <svg width="100%" height="24" viewBox="0 0 120 24" className="text-white">
        <path
          d="M0 18 Q20 12 40 15 Q60 8 80 12 Q100 6 120 10"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
    <button className="text-xs text-neutral-500 hover:text-white no-drag">
      See which subscriptions went up?
    </button>
  </>
);

// ============ Draggable Card ============
const CARD_WIDTH = 320;
const CARD_MINH = 160;
const SNAP = 24;

const DashboardCard: React.FC<DashboardCardProps> = ({
  card,
  isDragging,
  snapToGrid,
  onDragStart,
  onDragEnd,
  onDrag,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ x: card.x || 0, y: card.y || 0 });
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  // Keep internal position in sync if external changes (e.g., reset layout)
  useEffect(() => {
    setPosition({ x: card.x || 0, y: card.y || 0 });
  }, [card.x, card.y]);

  const beginDrag = (clientX: number, clientY: number) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setDragOffset({ x: clientX - rect.left, y: clientY - rect.top });
    onDragStart(card.id);
  };

  const onPointerDownMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest(".no-drag")) return;
    beginDrag(e.clientX, e.clientY);
  };

  const onPointerDownTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest(".no-drag")) return;
    const t = e.touches[0];
    beginDrag(t.clientX, t.clientY);
  };

  const updatePos = (clientX: number, clientY: number) => {
    if (!isDragging || !cardRef.current) return;
    const container = cardRef.current.parentElement as HTMLElement | null;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const cardW = cardRef.current.offsetWidth || CARD_WIDTH;
    const cardH = cardRef.current.offsetHeight || CARD_MINH;

    let newX = clientX - containerRect.left - dragOffset.x;
    let newY = clientY - containerRect.top - dragOffset.y;

    if (snapToGrid) {
      newX = Math.round(newX / SNAP) * SNAP;
      newY = Math.round(newY / SNAP) * SNAP;
    }

    newX = Math.max(0, Math.min(newX, containerRect.width - cardW));
    newY = Math.max(0, Math.min(newY, containerRect.height - cardH));

    setPosition({ x: newX, y: newY });
    onDrag(card.id, { x: newX, y: newY });
  };

  const handleMouseMove = (e: MouseEvent) => updatePos(e.clientX, e.clientY);
  const handleTouchMove = (e: TouchEvent) => {
    const t = e.touches[0];
    if (!t) return;
    // prevent page scroll while dragging
    e.preventDefault();
    updatePos(t.clientX, t.clientY);
  };
  const handlePointerUp = () => {
    if (isDragging) onDragEnd();
  };

  useEffect(() => {
    if (!isDragging) return;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handlePointerUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handlePointerUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handlePointerUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handlePointerUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, dragOffset, snapToGrid]);

  const cardStyle: React.CSSProperties = {
    position: "absolute",
    left: position.x,
    top: position.y,
    zIndex: isDragging ? 50 : 1,
    transform: isDragging ? "rotate(2deg)" : "none",
    transition: isDragging ? "none" : "transform 120ms ease",
    width: CARD_WIDTH,
    minHeight: CARD_MINH,
  };

  return (
    <div
      ref={cardRef}
      className={`bg-neutral-900/30 border border-white/10 p-6 cursor-move select-none ${
        isDragging ? "shadow-2xl opacity-90" : ""
      }`}
      style={cardStyle}
      onMouseDown={onPointerDownMouse}
      onTouchStart={onPointerDownTouch}
    >
      <div className="absolute top-2 right-2 opacity-30 hover:opacity-60">
        <GripVertical size={16} />
      </div>
      {card.content}
    </div>
  );
};

// ============ Main Page ============
export default function HomePage() {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [snapToGrid, setSnapToGrid] = useState<boolean>(true);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const router = useRouter();

  // Seed positions (4 columns, 24px gap)
  const initialCards: DashboardCardData[] = [
    { id: "revenue", content: <RevenueInsightsCard />, x: 0, y: 0 },
    { id: "profit", content: <ProfitAnalysisCard />, x: 344, y: 0 },
    { id: "runway", content: <CashRunwayCard />, x: 688, y: 0 },
    { id: "files", content: <FileManagementCard />, x: 1032, y: 0 },
    { id: "spending", content: <MonthlySpendingCard />, x: 0, y: 200 },
    { id: "invoices", content: <OutstandingInvoicesCard />, x: 344, y: 200 },
    { id: "balance", content: <AccountBalanceCard />, x: 688, y: 200 },
    { id: "software", content: <SoftwareCostsCard />, x: 1032, y: 200 },
  ];

  const [cards, setCards] = useState<DashboardCardData[]>(initialCards);

  // Supabase session + profile
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) fetchProfile(data.session.user.id);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      if (s) fetchProfile(s.user.id);
      else setProfile(null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", userId)
      .single();
    if (!error && data) setProfile(data);
  };

  // Layout persistence
  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("dashboard_layout") : null;
    if (raw) {
      const saved = JSON.parse(raw) as { id: string; x: number; y: number }[];
      setCards((prev) =>
        prev.map((c) => {
          const hit = saved.find((s) => s.id === c.id);
          return hit ? { ...c, x: hit.x, y: hit.y } : c;
        })
      );
    }
  }, []);

  const saveLayout = () => {
    const layout = cards.map(({ id, x, y }) => ({ id, x, y }));
    localStorage.setItem("dashboard_layout", JSON.stringify(layout));
  };

  const resetLayout = () => {
    setCards(initialCards);
    localStorage.removeItem("dashboard_layout");
  };

  // Drag handlers
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleDragStart = (cardId: string) => setDraggingId(cardId);
  const handleDragEnd = () => setDraggingId(null);

  const handleDrag = (cardId: string, position: Position) => {
    setCards((prev) => prev.map((card) => (card.id === cardId ? { ...card, x: position.x, y: position.y } : card)));
  };

  // Subtle grid background for the canvas
  const canvasStyle: React.CSSProperties = {
    position: "relative",
    minHeight: 700,
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.1)",
    backgroundImage:
      "repeating-linear-gradient(0deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 1px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 1px, transparent 1px, transparent 24px)",
    backgroundSize: "24px 24px, 24px 24px",
  };

  return (
    <div className="min-h-screen w-full flex frosty text-white">
      {/* Sidebar */}
      <aside className="w-16 flex flex-col justify-between items-center py-6 bg-neutral-900/50 border-r border-white/10">
        <div className="flex flex-col gap-6">
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
          <button className="p-2 hover:cursor-pointer" onClick={handleLogout}>
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
              <p className="text-neutral-400 mt-2 text-sm">here&apos;s a quick look at how things are going.</p>
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

          {/* Card Canvas + Context Menu */}
          <ContextMenu>
            <ContextMenuTrigger>
              <div id="card-canvas" className="mb-8" style={canvasStyle}>
                {cards.map((card) => (
                  <DashboardCard
                    key={card.id}
                    card={card}
                    isDragging={draggingId === card.id}
                    snapToGrid={snapToGrid}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDrag={handleDrag}
                  />
                ))}
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuCheckboxItem checked={snapToGrid} onCheckedChange={setSnapToGrid}>
                Snap to Grid
              </ContextMenuCheckboxItem>
              <ContextMenuSeparator />
              <ContextMenuItem onClick={resetLayout}>Reset Layout</ContextMenuItem>
              <ContextMenuItem onClick={saveLayout}>Save Layout</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem className="opacity-60">Add New Card (todo)</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>

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
            <div className="flex-1 flex items-center gap-3 bg-neutral-900/50 px-4 py-3">
              <input
                type="text"
                placeholder="Ask anything"
                className="bg-transparent text-white placeholder-neutral-500 border-none outline-none flex-1"
              />
              <button className="text-neutral-400 hover:text-white no-drag">
                <Plus size={16} />
              </button>
              <button className="text-neutral-400 hover:text-white no-drag">
                <MessageCircle size={16} />
              </button>
            </div>
            <button className="w-10 h-10 bg-white text-black flex items-center justify-center hover:bg-neutral-200 no-drag">
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
