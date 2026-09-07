import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import BookConsultation from "./pages/BookConsultation";
import CrsCalculator from "./pages/CrsCalculator";
import Loader from "./components/Loader";
import BackToTop from "./components/BackToTop";
import ScrollProgress from "./components/ScrollProgress";
import AmbientBackground from "./components/AmbientBackground";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AmbientBackground>
        <MainLayout />
      </AmbientBackground>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "services", element: <Services /> },
      { path: "services/:serviceId", element: <ServiceDetail /> },
      { path: "contact", element: <Contact /> },

      // The dedicated reviews page was folded into the home page; keep the old
      // URL working for anyone holding a link to it.
      { path: "client-reviews", element: <Navigate to="/" replace /> },

      // Anything else lands on the home page rather than React Router's raw
      // developer error screen.
      { path: "*", element: <Navigate to="/" replace /> },
      { path: "events", element: <Events /> },
      { path: "blogs", element: <Blogs /> },
      { path: "blogs/:id", element: <BlogPost /> },
      { path: "book-consultation", element: <BookConsultation /> },
      { path: "crs-calculator", element: <CrsCalculator /> },
    ],
  },
]);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <AmbientBackground>
        <Loader />
      </AmbientBackground>
    );
  }

  return (
    <>
      <ScrollProgress />
      <RouterProvider router={router} />
      <BackToTop />
    </>
  );
}

export default App;
