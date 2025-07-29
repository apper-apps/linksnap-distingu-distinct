import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import URLShortenerForm from "@/components/molecules/URLShortenerForm";
import URLCard from "@/components/molecules/URLCard";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { urlService } from "@/services/api/urlService";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const loadUrls = async () => {
    try {
      setError("");
      const data = await urlService.getAll();
      setUrls(data);
    } catch (err) {
      setError("Failed to load URLs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUrls();
  }, [refreshTrigger]);

  const handleURLShortened = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleRetry = () => {
    setLoading(true);
    loadUrls();
  };

  const recentUrls = urls.slice(0, 5);
  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to <span className="gradient-text">LinkSnap</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Transform your long URLs into short, trackable links and monitor their performance in real-time.
        </p>
      </motion.div>

      {/* URL Shortener Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <URLShortenerForm onURLShortened={handleURLShortened} />
      </motion.div>

      {/* Statistics Cards */}
      {!loading && !error && urls.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card variant="gradient" className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg mx-auto mb-4">
              <ApperIcon name="Link2" className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold gradient-text mb-2">
              {urls.length}
            </div>
            <p className="text-gray-600 font-medium">
              Total Links
            </p>
          </Card>

          <Card variant="gradient" className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mx-auto mb-4">
              <ApperIcon name="MousePointer" className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {totalClicks.toLocaleString()}
            </div>
            <p className="text-gray-600 font-medium">
              Total Clicks
            </p>
          </Card>

          <Card variant="gradient" className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mx-auto mb-4">
              <ApperIcon name="TrendingUp" className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {urls.length > 0 ? Math.round(totalClicks / urls.length) : 0}
            </div>
            <p className="text-gray-600 font-medium">
              Avg Clicks/Link
            </p>
          </Card>
        </motion.div>
      )}

      {/* Recent Links Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Recent Links
          </h2>
          {urls.length > 5 && (
            <Badge variant="gradient">
              Showing 5 of {urls.length}
            </Badge>
          )}
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <Error message={error} onRetry={handleRetry} />
        ) : recentUrls.length === 0 ? (
          <Card className="text-center py-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full flex items-center justify-center mb-4">
                <ApperIcon name="Link" className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No links yet
              </h3>
              <p className="text-gray-600">
                Your shortened URLs will appear here once you create them.
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {recentUrls.map((url, index) => (
              <motion.div
                key={url.Id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <URLCard url={url} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;