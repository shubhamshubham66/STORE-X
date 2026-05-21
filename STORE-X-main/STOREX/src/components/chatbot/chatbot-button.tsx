
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { ChatbotDialog } from "./chatbot-dialog";

export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40">
        <Button 
          variant="default" 
          size="icon" 
          className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary text-primary-foreground"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
      
      <ChatbotDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
