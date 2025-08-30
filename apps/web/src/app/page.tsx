"use client";

export default function Home() {
  return (
    <div className="frosty flex flex-col min-h-screen">
      <header className="drag h-10 w-full flex items-center justify-between px-4">
        <span className="text-white/70 font-semibold">Everything Dashboard</span>
      
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center text-white">
        <div className="inline-flex text-center items-center gap-4">
                  <h1 className="font-regular text-2xl">Everything Dashboard</h1>
        </div>
      </main>
    </div>
  );
}
