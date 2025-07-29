import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import Dashboard from "@/components/pages/Dashboard";
import Links from "@/components/pages/Links";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/links" element={<Links />} />
          </Routes>
        </Layout>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;