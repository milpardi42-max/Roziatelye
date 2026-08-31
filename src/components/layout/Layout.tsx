import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useEffect, useState } from "react";

export function Layout() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Page transition: fade out then back in
    setVisible(false);
    window.scrollTo({ top: 0, behavior: "instant" });
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main
        className="flex-1 transition-opacity duration-500 ease-out"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
