
import { Header } from "./header";
import { Footer } from "./footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ChatbotButton } from "@/components/chatbot/chatbot-button";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20 pb-10">
        {children}
      </main>
      <Footer />
      <ChatbotButton />
    </div>
  );
}
