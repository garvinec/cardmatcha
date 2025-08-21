"use client"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
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
} from "lucide-react"
import { useState } from "react"

interface ChatSession {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
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
    {
      id: "4",
      title: "Business Credit Cards",
      lastMessage: "Best business cards for small companies",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    },
    {
      id: "5",
      title: "Student Card Options",
      lastMessage: "Building credit as a college student",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
    },
  ])

  const [activeChat, setActiveChat] = useState<string>("1")
  const [editingTitle, setEditingTitle] = useState<string | null>(null)
  const [newTitle, setNewTitle] = useState("")
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })

  const createNewChat = () => {
    const newChatId = Date.now().toString()
    const newChat: ChatSession = {
      id: newChatId,
      title: "New Chat",
      lastMessage: "",
      timestamp: new Date(),
    }
    setChatSessions([newChat, ...chatSessions])
    setActiveChat(newChatId)
  }

  const deleteChat = (chatId: string) => {
    setChatSessions(chatSessions.filter((chat) => chat.id !== chatId))
    if (activeChat === chatId && chatSessions.length > 1) {
      const remainingChats = chatSessions.filter((chat) => chat.id !== chatId)
      setActiveChat(remainingChats[0]?.id || "")
    }
  }

  const startEditingTitle = (chatId: string, currentTitle: string) => {
    setEditingTitle(chatId)
    setNewTitle(currentTitle)
  }

  const saveTitle = (chatId: string) => {
    if (newTitle.trim()) {
      setChatSessions(chatSessions.map((chat) => (chat.id === chatId ? { ...chat, title: newTitle.trim() } : chat)))
    }
    setEditingTitle(null)
    setNewTitle("")
  }

  const cancelEditing = () => {
    setEditingTitle(null)
    setNewTitle("")
  }

  const clearAllChats = () => {
    setChatSessions([])
    setActiveChat("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-[calc(100vh-2rem)]">
          <div className="flex h-full">
            {/* Left Sidebar */}
            <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <Button
                  onClick={createNewChat}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 font-medium"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New chat
                </Button>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">Your conversations</span>
                    <button onClick={clearAllChats} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Clear All
                    </button>
                  </div>
                </div>

                <ScrollArea className="flex-1 px-4">
                  <div className="space-y-2">
                    {chatSessions.map((chat) => (
                      <div
                        key={chat.id}
                        className={`group flex items-center p-3 rounded-xl cursor-pointer transition-all ${
                          activeChat === chat.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-100"
                        }`}
                      >
                        <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                          <MessageSquare className="h-4 w-4 text-gray-600" />
                        </div>

                        <div className="flex-1 min-w-0" onClick={() => setActiveChat(chat.id)}>
                          {editingTitle === chat.id ? (
                            <input
                              type="text"
                              value={newTitle}
                              onChange={(e) => setNewTitle(e.target.value)}
                              onBlur={() => saveTitle(chat.id)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  saveTitle(chat.id)
                                }
                                if (e.key === "Escape") {
                                  cancelEditing()
                                }
                              }}
                              className="w-full text-sm font-medium bg-white border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              autoFocus
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            <p className="text-sm font-medium text-gray-900 truncate">{chat.title}</p>
                          )}
                        </div>

                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all ml-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              startEditingTitle(chat.id, chat.title)
                            }}
                            className="p-1.5 hover:bg-blue-100 rounded-full text-gray-400 hover:text-blue-600 transition-all"
                            title="Rename chat"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteChat(chat.id)
                            }}
                            className="p-1.5 hover:bg-red-100 rounded-full text-gray-400 hover:text-red-600 transition-all"
                            title="Delete chat"
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
              <div className="p-6 border-b border-gray-200 bg-white">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">Credit Card AI Advisor</h2>
                    <p className="text-sm text-gray-500">Ask me anything about credit cards and rewards</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-6">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <Bot className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Credexa AI</h3>
                    <p className="text-gray-600 mb-8 max-w-md">
                      I'm here to help you find the perfect credit cards and maximize your rewards. What would you like
                      to know?
                    </p>

                    {/* Suggested Questions */}
                    <div className="grid gap-3 max-w-2xl w-full">
                      {[
                        "What's the best cash back credit card for beginners?",
                        "Which card offers the highest travel rewards?",
                        "Should I get a card with an annual fee?",
                        "How can I maximize my grocery spending rewards?",
                      ].map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleInputChange({ target: { value: question } } as any)}
                          className="text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors"
                        >
                          <span className="text-sm text-gray-700">{question}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 max-w-4xl">
                    {messages.map((message, index) => (
                      <div key={message.id} className="space-y-4">
                        {/* User Message */}
                        {message.role === "user" && (
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="h-4 w-4 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 mb-1">You</p>
                              <div className="bg-gray-50 rounded-2xl p-4">
                                <p className="text-gray-800">{message.content}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* AI Message */}
                        {message.role === "assistant" && (
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 mb-1">Credit Card AI</p>
                              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                                <div className="prose prose-sm max-w-none">
                                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{message.content}</p>
                                </div>

                                {/* Message Actions */}
                                <div className="flex items-center space-x-2 mt-4 pt-3 border-t border-gray-100">
                                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Like">
                                    <ThumbsUp className="h-4 w-4 text-gray-500" />
                                  </button>
                                  <button
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Dislike"
                                  >
                                    <ThumbsDown className="h-4 w-4 text-gray-500" />
                                  </button>
                                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Copy">
                                    <Copy className="h-4 w-4 text-gray-500" />
                                  </button>
                                  <button
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Regenerate"
                                  >
                                    <RotateCcw className="h-4 w-4 text-gray-500" />
                                  </button>
                                  <button
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-auto"
                                    title="More"
                                  >
                                    <MoreHorizontal className="h-4 w-4 text-gray-500" />
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
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 mb-1">Credit Card AI</p>
                          <div className="bg-white border border-gray-200 rounded-2xl p-4">
                            <div className="flex items-center space-x-2">
                              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                              <span className="text-sm text-gray-600">Thinking...</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>

              {/* Input Area */}
              <div className="p-6 border-t border-gray-200 bg-white">
                <form onSubmit={handleSubmit} className="flex items-end space-x-3">
                  <div className="flex-1 relative">
                    <Input
                      value={input}
                      onChange={handleInputChange}
                      placeholder="What's on your mind?"
                      className="w-full py-3 px-4 pr-12 border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-blue-500 resize-none"
                      disabled={isLoading}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-2xl flex-shrink-0"
                  >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
