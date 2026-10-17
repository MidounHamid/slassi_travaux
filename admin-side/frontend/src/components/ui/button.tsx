import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "cms";
  size?: "default" | "sm" | "lg" | "icon" | "xs";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

    const variantStyles = {
      default:
        "bg-sky-600 text-white shadow hover:bg-sky-500 active:bg-sky-700",
      destructive:
        "bg-rose-600 text-white shadow-sm hover:bg-rose-500 active:bg-rose-700",
      outline:
        "border border-slate-700 bg-slate-800/60 text-slate-200 shadow-sm hover:bg-slate-700/80 hover:text-white",
      secondary:
        "bg-slate-800 text-slate-100 shadow-sm hover:bg-slate-700 active:bg-slate-800",
      ghost:
        "text-slate-300 hover:bg-slate-800/80 hover:text-white",
      link:
        "text-sky-400 underline-offset-4 hover:underline",
      cms:
        "border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 shadow-xs",
    };

    const sizeStyles = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      xs: "h-6 rounded px-2 text-[11px]",
      lg: "h-10 rounded-md px-8",
      icon: "h-8 w-8",
    };

    return (
      <button
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
