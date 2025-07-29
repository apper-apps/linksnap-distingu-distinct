import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  className, 
  variant = "default",
  hover = false,
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: "bg-white border border-gray-200 shadow-sm",
    glass: "glass-card border border-white/20 shadow-xl",
    gradient: "bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg"
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl p-6 transition-all duration-200",
        variants[variant],
        hover && "hover:shadow-lg hover:scale-[1.02] cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;