import { useState } from "react";
import { Bot, Send, X } from "lucide-react";

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Xin chào! Tôi có thể hỗ trợ bạn tối ưu lịch trình du lịch.",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      text: input,
    };

    const aiMessage = {
      role: "ai",
      text: "Mình đã nhận câu hỏi của bạn. Phần này sau có thể nối API AI để trả lời thật.",
    };

    setMessages([...messages, userMessage, aiMessage]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {open && (
        <div className="mb-4 w-80 overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-100">
          <div className="flex items-center justify-between bg-[#1b2559] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <Bot size={22} />
              <div>
                <h3 className="font-bold">AI Travel Assistant</h3>
                <p className="text-xs text-white/70">Đang hỗ trợ lịch trình</p>
              </div>
            </div>

            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="h-80 space-y-3 overflow-y-auto bg-[#f8faff] p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    msg.role === "user"
                      ? "bg-[#1b2559] text-white"
                      : "bg-white text-gray-600 shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t bg-white p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Nhập câu hỏi..."
              className="flex-1 rounded-2xl bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1b2559]/20"
            />

            <button
              onClick={handleSend}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1b2559] text-white"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

     <button
        onClick={() => setOpen(true)}
        className="flex h-16 w-16 items-center justify-center rounded-full 
        bg-gradient-to-br from-[#1b2559] to-[#3b82f6]
        text-white shadow-2xl hover:scale-105 transition-all duration-300"
        >
        <Bot size={30} />
    </button>
    </div>
  );
}