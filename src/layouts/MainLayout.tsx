import React from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout: React.FC = () => {
  // Keying on the path remounts this wrapper on every navigation, which is what
  // restarts the dissolve. Deliberately pathname only: keying on search or hash
  // too would replay the animation for in-page anchors.
  const { pathname } = useLocation();

  return (
    <div className="main-layout">
      <ScrollRestoration />
      <Header />
      <main className="main-content">
        <div className="route-view" key={pathname}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;