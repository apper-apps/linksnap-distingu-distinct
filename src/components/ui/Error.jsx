import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <Card className="text-center py-12">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <ApperIcon name="AlertTriangle" className="w-8 h-8 text-red-600" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-gray-600 mb-6 max-w-sm">
          {message}
        </p>
        
        {onRetry && (
          <Button 
            variant="primary" 
            onClick={onRetry}
            icon="RefreshCw"
          >
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );
};

export default Error;