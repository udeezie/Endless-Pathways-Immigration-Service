import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import BookConsultation from "./pages/BookConsultation";
import Loader from "./components/Loader";
import BackToTop from "./components/BackToTop";
import LeafBackground from "./components/LeafBackground";

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
      <Route path="/services/:serviceId" element={<MainLayout><ServiceDetail /></MainLayout>} />
      <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
      <Route path="/events" element={<MainLayout><Events /></MainLayout>} />
      <Route path="/blogs" element={<MainLayout><Blogs /></MainLayout>} />
      <Route path="/blogs/:id" element={<MainLayout><BlogPost /></MainLayout>} />
      <Route path="/book-consultation" element={<MainLayout><BookConsultation /></MainLayout>} />
    </Routes>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <LeafBackground>
        {loading ? <Loader /> : <AppContent />}
        <BackToTop />
      </LeafBackground>
    </Router>
  );
}

export default App;