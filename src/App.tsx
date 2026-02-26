import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import BookConsultation from "./pages/BookConsultation";
import ClientReviews from "./pages/ClientReviews";
import Loader from "./components/Loader";
import BackToTop from "./components/BackToTop";
import LeafBackground from "./components/LeafBackground";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LeafBackground>
        <MainLayout />
      </LeafBackground>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "services/:serviceId", element: <ServiceDetail /> },
      { path: "contact", element: <Contact /> },
      { path: "events", element: <Events /> },
      { path: "blogs", element: <Blogs /> },
      { path: "blogs/:id", element: <BlogPost /> },
      { path: "book-consultation", element: <BookConsultation /> },
      { path: "client-reviews", element: <ClientReviews /> },
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
      <LeafBackground>
        <Loader />
      </LeafBackground>
    );
  }

  return (
    <>
      <RouterProvider router={router} />
      <BackToTop />
    </>
  );
}

export default App;
