import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative inline-flex cursor-pointer overflow-hidden rounded-full border border-[var(--border-subtle)] bg-[var(--card-bg)] px-6 py-2.5 text-sm font-semibold text-[var(--text-primary)] shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-70",
        className,
      )}
      {...props}
    >
      <span className="inline-flex items-center gap-1 transition-all duration-300 group-hover:translate-x-10 group-hover:opacity-0">
        {text}
      </span>
      <div className="absolute inset-0 z-10 flex translate-x-6 items-center justify-center gap-2 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <span>{text}</span>
        <ArrowRight className="h-4 w-4" />
      </div>
      <div className="pointer-events-none absolute left-[25%] top-[45%] h-2 w-2 scale-100 rounded-full bg-gradient-to-r from-[#5CA9E9] to-[#38BDF8] opacity-0 transition-all duration-300 group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:scale-110 group-hover:opacity-100" />
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };

