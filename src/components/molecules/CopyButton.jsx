import { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const CopyButton = ({ text, variant = "outline", size = "sm", className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard!", {
        icon: <ApperIcon name="Check" className="w-5 h-5" />
      });
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={className}
      icon={copied ? "Check" : "Copy"}
    >
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
};

export default CopyButton;