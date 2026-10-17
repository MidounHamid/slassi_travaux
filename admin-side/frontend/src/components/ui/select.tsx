import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Option {
  value: string;
  label: string;
  badge?: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  size?: "sm" | "default";
}

export function Select({
  value,
  onChange,
  options,
  placeholder = "Select...",
  className,
  size = "sm",
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block text-left w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center justify-between rounded-md border border-slate-700 bg-slate-900/90 text-slate-100 shadow-xs hover:border-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors cursor-pointer",
          size === "sm" ? "h-7 px-2.5 py-1 text-xs" : "h-9 px-3 py-1.5 text-sm",
          className
        )}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className="ml-1.5 h-3.5 w-3.5 shrink-0 text-slate-400 opacity-70" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-1 min-w-[160px] w-full rounded-md border border-slate-700 bg-slate-900 shadow-xl py-1 text-xs backdrop-blur-md animate-in fade-in-80 zoom-in-95">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between px-3 py-1.5 text-left transition-colors hover:bg-sky-600/20 hover:text-sky-300 cursor-pointer",
                option.value === value
                  ? "bg-slate-800 text-sky-400 font-medium"
                  : "text-slate-300"
              )}
            >
              <span>{option.label}</span>
              {option.badge && (
                <span className="ml-2 text-[10px] text-slate-400 font-mono bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                  {option.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
