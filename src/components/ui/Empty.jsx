import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Empty = () => {
  return (
    <Card className="text-center py-16">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full flex items-center justify-center mb-6">
          <ApperIcon name="Link" className="w-10 h-10 text-primary-600" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          No URLs yet
        </h3>
        
        <p className="text-gray-600 mb-8 max-w-md">
          Start by shortening your first URL! Paste a long URL above and click "Shorten URL" to get started.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="primary" 
            icon="Plus"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Shorten Your First URL
          </Button>
          <Button 
            variant="outline" 
            icon="HelpCircle"
            onClick={() => window.open('https://linksnap.help', '_blank')}
          >
            Learn More
          </Button>
        </div>
        
        <div className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg max-w-md">
          <h4 className="font-semibold text-gray-900 mb-2">
            Why use LinkSnap?
          </h4>
          <ul className="text-sm text-gray-600 space-y-1 text-left">
            <li className="flex items-center gap-2">
              <ApperIcon name="Check" className="w-4 h-4 text-green-500" />
              Track clicks in real-time
            </li>
            <li className="flex items-center gap-2">
              <ApperIcon name="Check" className="w-4 h-4 text-green-500" />
              Easy copy-to-clipboard
            </li>
            <li className="flex items-center gap-2">
              <ApperIcon name="Check" className="w-4 h-4 text-green-500" />
              Clean, professional links
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default Empty;