import React, { useRef, useEffect } from "react";

type CommandPaletteModalProps = {
  onClose: () => void;
};

export function CommandPaletteModal({ onClose }: CommandPaletteModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.66)",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      {/* Container for top-center positioning */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "48px",          // controls vertical offset from top
          transform: "translateX(-50%)",
        }}
      >
        {/* Modal card */}
        <div
          style={{
            background: "#222",
            borderRadius: 12,
            padding: "0 20px 0 16px",
            minWidth: 400,
            maxWidth: 600,
            height: 46,
            boxShadow: "0 2px 24px 0 rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            gap: 16,
            border: "1px solid #333",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search icon */}
          <svg width={16} height={16} viewBox="0 0 20 20" fill="none" style={{ color: "#bbb" }}>
            <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5" />
            <line x1="14" y1="14" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {/* Search input */}
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#e0e0e0",
              fontSize: 18,
              flex: 1,
              padding: 0,
            }}
          />
          {/* Esc key hint */}
          <span
            style={{
              background: "#242424",
              borderRadius: 8,
              border: "1px solid #333",
              padding: "3px 13px",
              color: "#fff",
              fontSize: 13,
            //   fontFamily: "monospace",
              opacity: 0.9,
              userSelect: "none",
              marginLeft: 12
            }}
          >
            Esc
          </span>
        </div>
      </div>
    </div>
  );
}
