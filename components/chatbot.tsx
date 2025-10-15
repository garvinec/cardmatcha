"use client";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2 } from "lucide-react";

export function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
    });

  const suggestedQuestions = [
    "What's the best cash back credit card for beginners?",
    "Which card offers the highest travel rewards?",
    "Should I get a card with an annual fee?",
    "How can I maximize my grocery spending rewards?",
    "What's the difference between points and cash back?",
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bot className="mr-2 h-5 w-5 text-matcha-700" />
          AI Credit Card Advisor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chat Messages */}
          <ScrollArea className="h-96 w-full border rounded-lg p-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Bot className="mx-auto h-12 w-12 text-matcha-700 mb-4" />
                <p className="text-lg font-medium mb-2">
                  Welcome to CardMatcha!
                </p>
                <p className="text-sm">
                  Ask me anything about credit cards, rewards, or which card
                  might be best for you.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex-shrink-0">
                        <Bot className="h-6 w-6 text-matcha-700" />
                      </div>
                    )}
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.role === "user"
                          ? "bg-matcha-700 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                    {message.role === "user" && (
                      <div className="flex-shrink-0">
                        <User className="h-6 w-6 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start space-x-3">
                    <Bot className="h-6 w-6 text-matcha-700" />
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Suggested Questions */}
          {messages.length === 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs bg-matcha-50 text-gray-700 border-gray-300 hover:bg-matcha-100"
                    onClick={() => {
                      handleInputChange({ target: { value: question } } as any);
                    }}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about credit cards, rewards, or get personalized recommendations..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-matcha-700 hover:bg-matcha-800"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
