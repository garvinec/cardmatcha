"use client";
// import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Plus,
  Bot,
  Loader2,
  Trash2,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Copy,
  MoreHorizontal,
  RotateCcw,
  User,
  Edit3,
} from "lucide-react";
import { useState } from "react";

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

export function ModernChatInterface() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Credit Card Recommendations",
      lastMessage: "What's the best cash back credit card for beginners?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "2",
      title: "Travel Rewards Comparison",
      lastMessage: "Compare Chase Sapphire vs Capital One Venture",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
      id: "3",
      title: "Annual Fee Analysis",
      lastMessage: "Is it worth paying an annual fee?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
  ]);

  const [activeChat, setActiveChat] = useState<string>("1");
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  // const { messages, input, handleInputChange, handleSubmit, isLoading } =
  //   useChat({
  //     api: "/api/chat",
  //   });

  const createNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: ChatSession = {
      id: newChatId,
      title: "New Conversation",
      lastMessage: "",
      timestamp: new Date(),
    };
    setChatSessions([newChat, ...chatSessions]);
    setActiveChat(newChatId);
  };

  const deleteChat = (chatId: string) => {
    setChatSessions(chatSessions.filter((chat) => chat.id !== chatId));
    if (activeChat === chatId && chatSessions.length > 1) {
      const remainingChats = chatSessions.filter((chat) => chat.id !== chatId);
      setActiveChat(remainingChats[0]?.id || "");
    }
  };

  const startEditingTitle = (chatId: string, currentTitle: string) => {
    setEditingTitle(chatId);
    setNewTitle(currentTitle);
  };

  const saveTitle = (chatId: string) => {
    if (newTitle.trim()) {
      setChatSessions(
        chatSessions.map((chat) =>
          chat.id === chatId ? { ...chat, title: newTitle.trim() } : chat
        )
      );
    }
    setEditingTitle(null);
    setNewTitle("");
  };

  const cancelEditing = () => {
    setEditingTitle(null);
    setNewTitle("");
  };

  const clearAllChats = () => {
    setChatSessions([]);
    setActiveChat("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-offwhite via-matcha-muted/40 to-offwhite p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-offwhite/85 backdrop-blur-md border border-matcha-muted/60 rounded-3xl shadow-2xl overflow-hidden h-[calc(100vh-3rem)]">
          <div className="flex h-full">
            {/* Left Sidebar */}
            <div className="w-80 bg-gradient-to-b from-offwhite/80 to-matcha-muted/40 border-r border-matcha-muted/50 flex flex-col">
              {/* Header */}
              <div className="p-8 border-b border-matcha-muted/50">
                <Button
                  onClick={createNewChat}
                  className="w-full bg-matcha text-matcha-foreground hover:bg-matcha-dark/80 rounded-full h-12 font-light shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New chat
                </Button>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-light text-gray-600">
                      Conversations
                    </span>
                    <button
                      onClick={clearAllChats}
                      className="text-xs text-green-700 hover:text-green-900 font-light transition-colors duration-300"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                <ScrollArea className="flex-1 px-6">
                  <div className="space-y-3">
                    {chatSessions.map((chat) => (
                      <div
                        key={chat.id}
                        className={`group flex items-center p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                          activeChat === chat.id
                            ? "bg-matcha-muted/60 border border-matcha-muted/70 shadow-sm"
                            : "hover:bg-matcha-muted/30"
                        }`}
                      >
                        <div className="w-9 h-9 bg-gradient-to-br from-matcha to-matcha-dark rounded-xl flex items-center justify-center mr-3 flex-shrink-0">
                          <MessageSquare className="h-4 w-4 text-offwhite" />
                        </div>

                        <div
                          className="flex-1 min-w-0"
                          onClick={() => setActiveChat(chat.id)}
                        >
                          {editingTitle === chat.id ? (
                            <input
                              type="text"
                              value={newTitle}
                              onChange={(e) => setNewTitle(e.target.value)}
                              onBlur={() => saveTitle(chat.id)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  saveTitle(chat.id);
                                }
                                if (e.key === "Escape") {
                                  cancelEditing();
                                }
                              }}
                              className="w-full text-sm font-light bg-offwhite border border-matcha-muted rounded-xl px-3 py-1 focus:outline-none focus:ring-2 focus:ring-matcha/20 text-matcha-foreground"
                              autoFocus
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            <p className="text-sm font-light text-matcha-foreground truncate">
                              {chat.title}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300 ml-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditingTitle(chat.id, chat.title);
                            }}
                            className="p-2 hover:bg-matcha-muted/60 rounded-full text-matcha-foreground/60 hover:text-matcha-dark transition-all duration-300"
                            title="Rename"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteChat(chat.id);
                            }}
                            className="p-2 hover:bg-destructive/20 rounded-full text-matcha-foreground/60 hover:text-destructive transition-all duration-300"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-8 border-b border-matcha-muted/50 bg-offwhite/70 backdrop-blur-sm">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-matcha-dark to-matcha-deep rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <Bot className="h-6 w-6 text-offwhite" />
                  </div>
                  <div>
                    <h2 className="font-light text-xl text-matcha-deep">
                      CardMatcha AI
                    </h2>
                    <p className="text-sm text-matcha-foreground/70 font-light">
                      Your credit card advisor
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-8">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center text-matcha-foreground">
                    <div className="w-20 h-20 bg-gradient-to-br from-matcha-muted to-matcha rounded-3xl flex items-center justify-center mb-8 shadow-lg">
                      <Bot className="h-10 w-10 text-matcha-deep" />
                    </div>
                    <h3 className="text-3xl font-light text-matcha-deep mb-4">
                      Welcome
                    </h3>
                    <p className="text-matcha-foreground/80 mb-12 max-w-md font-light text-lg leading-relaxed">
                      Ask me anything about credit cards, rewards, or finding
                      the perfect card for your lifestyle.
                    </p>

                    {/* Suggested Questions */}
                    <div className="grid gap-4 max-w-2xl w-full">
                      {[
                        "Best cash back card for beginners?",
                        "Highest travel rewards available?",
                        "Is an annual fee worth it?",
                        "Maximize grocery rewards?",
                      ].map((question, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            handleInputChange({
                              target: { value: question },
                            } as any)
                          }
                          className="text-left p-5 bg-gradient-to-r from-matcha-muted/30 to-matcha/20 hover:from-matcha-muted/50 hover:to-matcha/30 rounded-2xl border border-matcha-muted/60 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                          <span className="text-sm text-matcha-foreground font-light">
                            {question}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8 max-w-4xl">
                    {messages.map((message) => (
                      <div key={message.id} className="space-y-6">
                        {/* User Message */}
                        {message.role === "user" && (
                          <div className="flex items-start space-x-4">
                            <div className="w-9 h-9 bg-gradient-to-br from-offwhite to-matcha-muted rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                              <User className="h-4 w-4 text-matcha-dark" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-light text-matcha-foreground/70 mb-2">
                                You
                              </p>
                              <div className="bg-gradient-to-r from-offwhite to-matcha-muted/40 rounded-3xl p-5 shadow-sm">
                                <p className="text-matcha-foreground font-light leading-relaxed">
                                  {message.content}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* AI Message */}
                        {message.role === "assistant" && (
                          <div className="flex items-start space-x-4">
                            <div className="w-9 h-9 bg-gradient-to-br from-matcha-dark to-matcha-deep rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                              <Bot className="h-4 w-4 text-offwhite" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-light text-matcha-foreground/70 mb-2">
                                CardMatcha AI
                              </p>
                              <div className="bg-offwhite/85 backdrop-blur border border-matcha-muted/60 rounded-3xl p-5 shadow-sm">
                                <div className="prose prose-sm max-w-none">
                                  <p className="text-matcha-foreground whitespace-pre-wrap leading-relaxed font-light">
                                    {message.content}
                                  </p>
                                </div>

                                {/* Message Actions */}
                                <div className="flex items-center space-x-2 mt-5 pt-4 border-t border-matcha-muted/50">
                                  <button
                                    className="p-2 hover:bg-matcha-muted/50 rounded-xl transition-all duration-300"
                                    title="Like"
                                  >
                                    <ThumbsUp className="h-4 w-4 text-matcha-foreground/60" />
                                  </button>
                                  <button
                                    className="p-2 hover:bg-matcha-muted/50 rounded-xl transition-all duration-300"
                                    title="Dislike"
                                  >
                                    <ThumbsDown className="h-4 w-4 text-matcha-foreground/60" />
                                  </button>
                                  <button
                                    className="p-2 hover:bg-matcha-muted/50 rounded-xl transition-all duration-300"
                                    title="Copy"
                                  >
                                    <Copy className="h-4 w-4 text-matcha-foreground/60" />
                                  </button>
                                  <button
                                    className="p-2 hover:bg-matcha-muted/50 rounded-xl transition-all duration-300"
                                    title="Regenerate"
                                  >
                                    <RotateCcw className="h-4 w-4 text-matcha-foreground/60" />
                                  </button>
                                  <button
                                    className="p-2 hover:bg-matcha-muted/50 rounded-xl transition-all duration-300 ml-auto"
                                    title="More"
                                  >
                                    <MoreHorizontal className="h-4 w-4 text-matcha-foreground/60" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Loading State */}
                    {isLoading && (
                      <div className="flex items-start space-x-4">
                        <div className="w-9 h-9 bg-gradient-to-br from-matcha-dark to-matcha-deep rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Bot className="h-4 w-4 text-offwhite" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-light text-matcha-foreground/70 mb-2">
                            CardMatcha AI
                          </p>
                          <div className="bg-offwhite/85 backdrop-blur border border-matcha-muted/60 rounded-3xl p-5 shadow-sm">
                            <div className="flex items-center space-x-3">
                              <Loader2 className="h-4 w-4 animate-spin text-matcha-dark" />
                              <span className="text-sm text-matcha-foreground font-light">
                                Thinking...
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>

              {/* Input Area */}
              <div className="p-8 border-t border-matcha-muted/50 bg-offwhite/70 backdrop-blur-sm">
                <form
                  onSubmit={handleSubmit}
                  className="flex items-end space-x-4"
                >
                  <div className="flex-1 relative">
                    <Input
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Ask anything about credit cards..."
                      className="w-full py-4 px-6 border border-matcha-muted rounded-3xl focus:border-matcha focus:ring-2 focus:ring-matcha/20 resize-none font-light bg-offwhite/90 backdrop-blur transition-all duration-300 text-matcha-foreground placeholder:text-matcha-foreground/60"
                      disabled={isLoading}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-matcha text-matcha-foreground hover:bg-matcha-dark/80 p-4 rounded-3xl flex-shrink-0 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
