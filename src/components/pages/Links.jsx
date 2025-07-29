import { useState } from "react";
import { motion } from "framer-motion";
import URLList from "@/components/organisms/URLList";
import ApperIcon from "@/components/ApperIcon";

const Links = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Links
          </h1>
          <p className="text-gray-600">
            Manage and track all your shortened URLs in one place
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full">
          <ApperIcon name="BarChart3" className="w-5 h-5 text-primary-600" />
          <span className="text-sm font-semibold text-primary-700">
            Analytics Dashboard
          </span>
        </div>
      </motion.div>

      {/* URL List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <URLList refreshTrigger={refreshTrigger} />
      </motion.div>
    </div>
  );
};

export default Links;