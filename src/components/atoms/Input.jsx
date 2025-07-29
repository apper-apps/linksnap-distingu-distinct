import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Input = forwardRef(({ 
  className, 
  type = "text",
  error,
  icon,
  iconPosition = "left",
  ...props 
}, ref) => {
  return (
    <div className="relative">
      {icon && iconPosition === "left" && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <ApperIcon 
            name={icon} 
            className="h-5 w-5 text-gray-400" 
          />
        </div>
      )}
      <input
        type={type}
        className={cn(
          "block w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 form-input focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none",
          icon && iconPosition === "left" && "pl-10",
          icon && iconPosition === "right" && "pr-10",
          error && "border-red-300 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        ref={ref}
        {...props}
      />
      {icon && iconPosition === "right" && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ApperIcon 
            name={icon} 
            className="h-5 w-5 text-gray-400" 
          />
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;