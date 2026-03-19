import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useEffect } from "react";
import { Send, LogOut, Plus, Menu, X } from "lucide-react";

const Dashboard = () => {
  const chat = useChat();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    chat.initialiseSocketConnection();
  }, []);

  const { user } = useSelector((state) => state.auth);

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      // Add user message
      setMessages([...messages, { id: Date.now(), type: "user", content: currentMessage }]);
      setCurrentMessage("");
      
      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [...prev, { id: Date.now(), type: "ai", content: "This is an AI response..." }]);
      }, 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const chats = [
    { id: 1, title: "Chat 1" },
    { id: 2, title: "Chat 1" },
    { id: 3, title: "Chat 1" },
    { id: 4, title: "Chat 1" },
  ];

  return (
    <div className="flex h-screen bg-[#1c1c1c] text-neutral-200 font-sans selection:bg-teal-500/30 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-1/3 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute top-3/4 right-10 w-[300px] h-[300px] bg-teal-500/3 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Sidebar - Desktop Version */}
      <aside className="hidden md:flex w-64 bg-[#1c1c1c] border-r border-white/5 flex-col p-6 relative z-10">
        {/* Header */}
        <div className="mb-8 flex items-center gap-2">
          <svg className="w-6 h-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h1 className="text-xl font-semibold tracking-tight text-white">Agentra AI</h1>
        </div>

        {/* New Chat Button */}
        <button className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-3 px-4 rounded-xl mb-6 transition border border-white/10 shadow-[0_0_15px_rgba(20,184,166,0.1)] hover:shadow-[0_0_20px_rgba(20,184,166,0.2)]">
          <Plus size={20} />
          New Chat
        </button>

        {/* Chats Section */}
        <div className="flex-1 overflow-y-auto">
          <h2 className="text-sm font-semibold text-neutral-400 mb-3 px-2">chats</h2>
          <div className="space-y-2">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full text-left px-3 py-3 rounded-xl transition border ${
                  selectedChat === chat.id
                    ? "bg-white/10 text-white border-teal-500/50"
                    : "text-neutral-300 hover:bg-white/5 border-white/5 hover:border-white/10"
                }`}
              >
                {chat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <button className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-red-500/20 text-red-400 hover:text-red-300 py-3 px-4 rounded-xl transition border border-white/10 hover:border-red-500/30">
          <LogOut size={20} />
          Log Out
        </button>
      </aside>

      {/* Mobile Sidebar Backdrop Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-[#1c1c1c] border-r border-white/5 flex flex-col p-6 z-40 transition-transform duration-300 md:hidden ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        {/* Header */}
        <div className="mb-8 flex items-center gap-2">
          <svg className="w-6 h-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h1 className="text-xl font-semibold tracking-tight text-white">Agentra AI</h1>
        </div>

        {/* New Chat Button */}
        <button className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-3 px-4 rounded-xl mb-6 transition border border-white/10 shadow-[0_0_15px_rgba(20,184,166,0.1)] hover:shadow-[0_0_20px_rgba(20,184,166,0.2)]">
          <Plus size={20} />
          New Chat
        </button>

        {/* Chats Section */}
        <div className="flex-1 overflow-y-auto">
          <h2 className="text-sm font-semibold text-neutral-400 mb-3 px-2">chats</h2>
          <div className="space-y-2">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full text-left px-3 py-3 rounded-xl transition border ${
                  selectedChat === chat.id
                    ? "bg-white/10 text-white border-teal-500/50"
                    : "text-neutral-300 hover:bg-white/5 border-white/5 hover:border-white/10"
                }`}
              >
                {chat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <button className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-red-500/20 text-red-400 hover:text-red-300 py-3 px-4 rounded-xl transition border border-white/10 hover:border-red-500/30">
          <LogOut size={20} />
          Log Out
        </button>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-[#1c1c1c] relative z-10">
        {/* Top Bar with Hamburger Menu - Mobile Only */}
        <div className="md:hidden border-b border-white/5 p-4 flex items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-8 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <svg className="w-16 h-16 text-teal-500 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h2 className="text-3xl font-bold text-white mb-2">Agentra AI</h2>
                <p className="text-neutral-400">Start a conversation to begin</p>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-lg px-5 py-3 rounded-xl backdrop-blur-sm transition ${
                    msg.type === "user"
                      ? "bg-teal-500/20 text-white border border-teal-500/30 rounded-br-none"
                      : "bg-white/5 text-neutral-100 border border-white/10 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-white/5 p-6 bg-[#1c1c1c]">
          <div className="flex gap-3">
            <textarea
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="write your message here..."
              className="flex-1 bg-white/5 text-white placeholder-neutral-500 rounded-xl px-4 py-3 outline-none border border-white/10 focus:border-teal-500/50 focus:bg-white/10 focus:ring-1 focus:ring-teal-500/50 transition resize-none max-h-32"
              rows="1"
            />
            <button
              onClick={handleSendMessage}
              className="bg-teal-500 hover:bg-teal-400 text-white px-6 py-3 rounded-xl transition flex items-center justify-center shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] transform hover:-translate-y-0.5"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
