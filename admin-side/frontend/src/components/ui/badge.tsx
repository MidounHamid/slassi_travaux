import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "amber";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "border-transparent bg-sky-600 text-white shadow hover:bg-sky-500",
    secondary: "border-transparent bg-slate-800 text-slate-300 hover:bg-slate-700",
    destructive: "border-transparent bg-rose-600/90 text-white shadow hover:bg-rose-500",
    outline: "text-slate-300 border-slate-700",
    success: "border-transparent bg-emerald-600/20 text-emerald-400 border border-emerald-500/30",
    warning: "border-transparent bg-amber-500/20 text-amber-400 border border-amber-500/30",
    amber: "border-transparent bg-amber-600 text-white shadow",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
