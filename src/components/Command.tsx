import React, { useState, useEffect, useRef } from "react";
import { getCommandResponse } from "../services/geminiService";
import type { Message } from "../types";

const useTypewriter = (text: string, speed = 30) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!text) return;
    setDisplayText("");
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return displayText;
};

export const Command: React.FC = () => {
  const [history, setHistory] = useState<Message[]>([
    { sender: "user", text: "what is the status?" },
    { sender: "ai", text: "All systems are operational" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const typedResponse = useTypewriter(
    history[history.length - 1]?.sender === "ai"
      ? history[history.length - 1].text
      : ""
  );

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, typedResponse]);

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: "user", text: input };
    setHistory((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const aiResponseText = await getCommandResponse(input);
      const aiMessage: Message = { sender: "ai", text: aiResponseText };
      setHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: Message = {
        sender: "ai",
        text: "Error: Connection to NOVACORE failed.",
      };
      setHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow overflow-y-auto pr-2">
        <p className="text-cyan-300">&gt; what is the status?</p>
        <p className="text-cyan-300">&gt; All systems are operational</p>
        {history.map((msg, index) => (
          <div key={index}>
            {msg.sender === "user" && (
              <p className="text-cyan-300 text-glow-cyan">&gt; {msg.text}</p>
            )}
            {msg.sender === "ai" && (
              <p className="t                            npm i --save-dev @types/react @types/react-domext-white">
                {index === history.length - 1 && isLoading === false
                  ? typedResponse
                  : msg.text}
                {index === history.length - 1 && isLoading && (
                  <span className="animate-ping">_</span>
                )}
              </p>
            )}
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>
      <form onSubmit={handleSumbit} className="flex-shrink-0 mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-transparent  focus:outline-none focus:border-cyan-300 pt-1 text-cyan-300 text-glow-cyan"
          placeholder={isLoading ? "Awaiting response..." : "Enter command..."}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};
