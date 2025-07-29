import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  icon,
  iconPosition = "left",
  loading = false,
  children, 
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-lg hover:shadow-xl hover:from-primary-700 hover:to-accent-600 btn-glow",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow-md",
    outline: "border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:border-primary-600",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm font-medium",
    md: "px-4 py-2.5 text-sm font-semibold",
    lg: "px-6 py-3 text-base font-semibold",
    xl: "px-8 py-4 text-lg font-bold"
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={loading}
      {...props}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          className="w-4 h-4 mr-2 animate-spin" 
        />
      )}
      {icon && iconPosition === "left" && !loading && (
        <ApperIcon 
          name={icon} 
          className="w-4 h-4 mr-2" 
        />
      )}
      {children}
      {icon && iconPosition === "right" && !loading && (
        <ApperIcon 
          name={icon} 
          className="w-4 h-4 ml-2" 
        />
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;