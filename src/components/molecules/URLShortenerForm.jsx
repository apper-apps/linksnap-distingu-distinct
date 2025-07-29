import { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { urlService } from "@/services/api/urlService";

const URLShortenerForm = ({ onURLShortened }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!validateURL(url)) {
      setError("Please enter a valid URL (including http:// or https://)");
      return;
    }

    setLoading(true);
    try {
      const shortenedURL = await urlService.create({
        originalUrl: url.trim()
      });
      
      setUrl("");
      toast.success("URL shortened successfully!", {
        icon: <ApperIcon name="Link" className="w-5 h-5" />
      });
      
      if (onURLShortened) {
        onURLShortened(shortenedURL);
      }
    } catch (err) {
      toast.error("Failed to shorten URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card variant="gradient" className="mb-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mb-4">
          <ApperIcon name="Link" className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Shorten Your URL
        </h2>
        <p className="text-gray-600">
          Transform long URLs into short, trackable links
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-semibold text-gray-700 mb-2">
            Enter your long URL
          </label>
          <Input
            id="url"
            type="url"
            placeholder="https://example.com/very/long/url/that/needs/shortening"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            error={error}
            icon="Globe"
            className="text-base py-4"
          />
          {error && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <ApperIcon name="AlertCircle" className="w-4 h-4 mr-1" />
              {error}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full justify-center"
          icon="Zap"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </Button>
      </form>
    </Card>
  );
};

export default URLShortenerForm;