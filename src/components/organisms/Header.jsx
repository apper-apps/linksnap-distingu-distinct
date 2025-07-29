import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "BarChart3" },
    { name: "Links", path: "/links", icon: "Link" }
  ];

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-accent-500 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <ApperIcon name="Zap" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">LinkSnap</h1>
              <p className="text-xs text-gray-500 -mt-1">Smart URL Shortener</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`
                }
              >
                <ApperIcon name={item.icon} className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            icon={mobileMenuOpen ? "X" : "Menu"}
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-lg"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`
                  }
                >
                  <ApperIcon name={item.icon} className="w-5 h-5" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;