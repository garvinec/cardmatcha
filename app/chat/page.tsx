import { ModernChatInterface } from "@/components/modern-chat-interface";
import { Header } from "@/components/header";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-matcha-100">
      <Header currentPage="chat" />
      <div className="pt-48">
        <ModernChatInterface />
      </div>
    </div>
  );
}
