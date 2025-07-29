import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import CopyButton from "@/components/molecules/CopyButton";
import ApperIcon from "@/components/ApperIcon";

const URLCard = ({ url }) => {
  const [clicks, setClicks] = useState(url.clicks);
  const [animateClick, setAnimateClick] = useState(false);

  useEffect(() => {
    if (url.clicks !== clicks) {
      setAnimateClick(true);
      setClicks(url.clicks);
      setTimeout(() => setAnimateClick(false), 600);
    }
  }, [url.clicks]);

  const shortUrl = `https://short.ly/${url.shortCode}`;
  const truncateUrl = (url, maxLength = 50) => {
    return url.length > maxLength ? `${url.substring(0, maxLength)}...` : url;
  };

  return (
    <Card hover className="transition-all duration-300 hover:border-primary-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-primary-100 to-accent-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="Link2" className="w-5 h-5 text-primary-600" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-gray-900 truncate">
                  {shortUrl}
                </h3>
                <Badge 
                  variant={clicks > 0 ? "gradient" : "default"}
                  className={animateClick ? "animate-count-up" : ""}
                >
                  {clicks} clicks
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 break-all">
                {truncateUrl(url.originalUrl)}
              </p>
              
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <ApperIcon name="Calendar" className="w-3 h-3" />
                  Created {formatDistanceToNow(new Date(url.createdAt), { addSuffix: true })}
                </span>
                {url.lastClickedAt && (
                  <span className="flex items-center gap-1">
                    <ApperIcon name="MousePointer" className="w-3 h-3" />
                    Last clicked {formatDistanceToNow(new Date(url.lastClickedAt), { addSuffix: true })}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <CopyButton 
            text={shortUrl}
            variant="outline"
            size="sm"
          />
        </div>
      </div>
    </Card>
  );
};

export default URLCard;