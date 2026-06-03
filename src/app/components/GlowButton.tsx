"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";

type GlowButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export default function GlowButton({
  children,
  className = "",
  href,
  type = "button",
  disabled,
  onClick,
}: GlowButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  // The cursor-tracked glow layer + the content above it.
  const inner = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--neonA) / 0.35), transparent 60%)",
        }}
      />
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  const style: CSSProperties = { ["--mx" as string]: "50%", ["--my" as string]: "50%" };
  const cls = `group relative overflow-hidden ${className}`;

  if (href) {
    return (
      <a href={href} onMouseMove={handleMove} onClick={onClick} className={cls} style={style} ref={ref as React.Ref<HTMLAnchorElement>}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onMouseMove={handleMove}
      onClick={onClick}
      className={cls}
      style={style}
      ref={ref as React.Ref<HTMLButtonElement>}
    >
      {inner}
    </button>
  );
}
