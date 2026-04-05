import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import ChatInput from "../components/ChatInput";
import MessageItem from "../components/MessageItem";
import EmptyState from "../components/EmptyState";
import { chatResponse } from "../api/chat.api";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isDark, setIsDark] = useState(true);
  const endOfChatRef = useRef(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");

    const newInteraction = {
      id: Date.now(),
      problem: userMsg,
      loading: true,
      solution_1: "",
      solution_2: "",
      judge: null
    };

    setMessages((prev) => [...prev, newInteraction]);

    // Fetch API response
    const responseData = await chatResponse(userMsg);

    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === newInteraction.id) {
          return {
            ...msg,
            loading: false,
            ...responseData // Spreading the imported mock API response object
          };
        }
        return msg;
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header isDark={isDark} toggleTheme={toggleTheme} />

      <main className="flex-1 overflow-y-auto p-6 max-w-6xl mx-auto w-full flex flex-col gap-10">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          messages.map((msg) => (
            <MessageItem key={msg.id} msg={msg} isDark={isDark} />
          ))
        )}
        <div ref={endOfChatRef} className="pb-4" />
      </main>

      <ChatInput input={input} setInput={setInput} handleSend={handleSend} />
    </div>
  );
}

export default App;
