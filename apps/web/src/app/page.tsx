"use client";

export default function Home() {
  return (
    <div className="frosty flex flex-col min-h-screen">
      {/* Draggable Top Bar */}
      <header className="drag h-10 w-full flex items-center justify-between px-4">
        <span className="text-white/70 font-semibold">Everything Dashboard</span>
      
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center text-white">
        <h1 className="text-2xl font-regular">Everything.</h1>
      </main>
    </div>
  );
}
