
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatbotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const defaultMessages: Message[] = [
  {
    id: 1,
    text: "Hi there! I'm your shopping assistant. How can I help you today?",
    isBot: true,
    timestamp: new Date(),
  },
];

// These are predefined responses the bot can give
const botResponses = {
  default: "I'm not sure I understand. Can you try asking something about our products, shipping, or returns policy?",
  greeting: "Hello! How can I assist you with your shopping today?",
  products: "We have a wide range of products across different categories. You can browse them all on our main page or use the search feature to find something specific.",
  shipping: "We offer free shipping on orders over $50. Standard delivery takes 3-5 business days.",
  returns: "Our return policy allows you to return items within 30 days of receipt for a full refund.",
  payment: "We accept all major credit cards, PayPal, and Apple Pay.",
  discount: "You can find our current promotions on the homepage. We also offer a 10% discount for new customers when you sign up for our newsletter.",
  help: "I can help with information about our products, shipping, returns policy, and more. Just let me know what you're looking for!",
};

// Simple function to determine which response to provide
function getBotResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return botResponses.greeting;
  } else if (lowerMessage.includes("product") || lowerMessage.includes("item")) {
    return botResponses.products;
  } else if (lowerMessage.includes("ship") || lowerMessage.includes("delivery")) {
    return botResponses.shipping;
  } else if (lowerMessage.includes("return") || lowerMessage.includes("refund")) {
    return botResponses.returns;
  } else if (lowerMessage.includes("pay") || lowerMessage.includes("card")) {
    return botResponses.payment;
  } else if (lowerMessage.includes("discount") || lowerMessage.includes("promo")) {
    return botResponses.discount;
  } else if (lowerMessage.includes("help")) {
    return botResponses.help;
  } else {
    return botResponses.default;
  }
}

export function ChatbotDialog({ open, onOpenChange }: ChatbotDialogProps) {
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to the bottom when new messages come in
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  // Focus input when dialog opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot response after a slight delay
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(input),
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] h-[500px] flex flex-col p-0">
        <DialogHeader className="px-4 py-3 border-b flex flex-row items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-primary">
            <AvatarImage src="/placeholder.svg" alt="Robot" />
            <AvatarFallback className="bg-primary/10">
              <Bot className="h-6 w-6 text-primary" />
            </AvatarFallback>
          </Avatar>
          <DialogTitle>Shopping Assistant</DialogTitle>
        </DialogHeader>
        
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="flex flex-col gap-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex max-w-[80%] rounded-lg p-3",
                  message.isBot 
                    ? "bg-muted self-start rounded-tl-none" 
                    : "bg-primary text-primary-foreground self-end rounded-tr-none"
                )}
              >
                {message.isBot && (
                  <Avatar className="h-6 w-6 mr-2 shrink-0">
                    <AvatarImage src="/placeholder.svg" alt="Robot" />
                    <AvatarFallback className="bg-primary/10">
                      <Bot className="h-3 w-3 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div>{message.text}</div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-3 border-t flex gap-2">
          <Input
            ref={inputRef}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSendMessage} disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
