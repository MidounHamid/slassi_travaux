import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  fallback?: string;
  size?: "sm" | "default" | "lg";
}

export function Avatar({ className, src, fallback = "AD", size = "default", ...props }: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  const sizeStyles = {
    sm: "h-6 w-6 text-[10px]",
    default: "h-8 w-8 text-xs",
    lg: "h-10 w-10 text-sm",
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full border border-slate-700 bg-slate-800 font-semibold text-slate-200 select-none items-center justify-center",
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {src && !imageError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt="Avatar"
          onError={() => setImageError(true)}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  );
}
