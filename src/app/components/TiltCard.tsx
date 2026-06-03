"use client";

import { useRef, useState } from "react";

export default function TiltCard({
  children,
  className = "",
  onClick,
  max = 8,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>("");

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rotateY = (px - 0.5) * 2 * max;
    const rotateX = -(py - 0.5) * 2 * max;
    setTransform(
      `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.015)`
    );
  };

  const reset = () => setTransform("");

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ transform, transition: "transform 0.25s ease-out", transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </div>
  );
}
