import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className, 
  variant = "default",
  size = "sm",
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-primary-100 text-primary-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    gradient: "bg-gradient-to-r from-primary-500 to-accent-500 text-white"
  };

  const sizes = {
    sm: "px-2 py-1 text-xs font-medium",
    md: "px-3 py-1.5 text-sm font-medium",
    lg: "px-4 py-2 text-base font-semibold"
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full transition-colors",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;