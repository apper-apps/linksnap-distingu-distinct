import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import URLCard from "@/components/molecules/URLCard";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { urlService } from "@/services/api/urlService";

const URLList = ({ refreshTrigger }) => {
  const [urls, setUrls] = useState([]);
  const [filteredUrls, setFilteredUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadUrls = async () => {
    try {
      setError("");
      const data = await urlService.getAll();
      setUrls(data);
      setFilteredUrls(data);
    } catch (err) {
      setError("Failed to load URLs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUrls();
  }, [refreshTrigger]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUrls(urls);
    } else {
      const filtered = urls.filter(url => 
        url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        url.shortCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUrls(filtered);
    }
  }, [searchTerm, urls]);

  const handleRetry = () => {
    setLoading(true);
    loadUrls();
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={handleRetry} />;
  }

  if (urls.length === 0) {
    return <Empty />;
  }

  return (
    <div className="space-y-6">
      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Your Links
          </h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full">
            <ApperIcon name="Link" className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">
              {urls.length} {urls.length === 1 ? "link" : "links"}
            </span>
          </div>
        </div>
        
        <SearchBar
          placeholder="Search URLs..."
          onSearch={setSearchTerm}
          className="w-full sm:w-80"
        />
      </div>

      {/* URL List */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {filteredUrls.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <ApperIcon name="Search" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No URLs found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search terms or create a new short URL.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredUrls.map((url, index) => (
                <motion.div
                  key={url.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <URLCard url={url} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Total Clicks Summary */}
      {filteredUrls.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl p-6 text-center text-white"
        >
          <h3 className="text-lg font-semibold mb-2">Total Performance</h3>
          <div className="text-3xl font-bold mb-1">
            {filteredUrls.reduce((sum, url) => sum + url.clicks, 0).toLocaleString()}
          </div>
          <p className="text-sm opacity-90">
            Total clicks across {filteredUrls.length} {filteredUrls.length === 1 ? "link" : "links"}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default URLList;