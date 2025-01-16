"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { database } from "../../../firebase";
import {
  ref,
  onValue,
  push,
  remove,
  set,
  onDisconnect,
} from "firebase/database";
import {
  MessageCircle,
  Send,
  Trash2,
  Link,
  Users,
  ArrowLeft, // Import ArrowLeft icon
} from "lucide-react";

export default function CommunityChat() {
  const router = useRouter(); // Initialize useRouter
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const username = prompt("Enter your username:");
    setUser(username || "Anonymous");

    const messagesRef = ref(database, "messages");
    onValue(
      messagesRef,
      (snapshot) => {
        const data = snapshot.val();
        const messagesArray = data ? Object.values(data) : [];
        setMessages(messagesArray);
      },
      (error) => {
        console.error("Error reading messages:", error);
      }
    );

    // Listen for typing status changes
    const typingRef = ref(database, "typing");
    onValue(typingRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usersTyping = Object.keys(data).filter((key) => data[key]);
        setTypingUsers(usersTyping);
      } else {
        setTypingUsers([]);
      }
    });

    // Cleanup on disconnect
    const userRef = ref(database, `typing/${user}`);
    onDisconnect(userRef).remove();
  }, [user]);

  // Automatically scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Triggered whenever messages are updated

  const fetchLinkPreview = async (url) => {
    const apiKey = "05156c75b8f99130d9379bd0cba30c70";
    const apiUrl = `https://api.linkpreview.net/?key=${apiKey}&q=${encodeURIComponent(
      url
    )}`;
    try {
      const response = await fetch(apiUrl);
      return await response.json();
    } catch (error) {
      console.error("Error fetching link preview:", error);
      return null;
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const sanitizedInput = input.trim();
    if (sanitizedInput === "") return;

    const urlRegex = /https?:\/\/[^\s]+/g;
    const urls = sanitizedInput.match(urlRegex);

    let linkPreview = null;
    if (urls && urls.length > 0) {
      linkPreview = await fetchLinkPreview(urls[0]);
    }

    const newMessage = {
      text: sanitizedInput,
      sender: user || "Anonymous",
      timestamp: new Date().toLocaleTimeString(),
      linkPreview: linkPreview,
    };

    const messagesRef = ref(database, "messages");
    push(messagesRef, newMessage).catch((error) => {
      console.error("Error sending message:", error);
    });

    setInput("");
    setIsTyping(false);
    set(ref(database, `typing/${user}`), false); // Reset typing status
  };

  const clearChat = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear the chat?"
    );
    if (confirmClear) {
      const messagesRef = ref(database, "messages");
      remove(messagesRef).catch((error) => {
        console.error("Error clearing chat:", error);
      });
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
      set(ref(database, `typing/${user}`), true); // Set typing status
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default behavior (new line)
      sendMessage(e); // Send the message
    }
    // Allow Shift + Enter to insert a new line
  };

  const handleBlur = () => {
    setIsTyping(false);
    set(ref(database, `typing/${user}`), false); // Reset typing status
  };

  const getInitial = (name) => {
    return (name || "A").charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-screen-md mx-auto h-screen flex flex-col p-4">
        {/* Back Button at Top Left */}
        <button
          onClick={() => router.push("/content/commu")} // Navigate to /content/commu
          className="fixed top-4 left-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors z-50"
        >
          <ArrowLeft size={24} className="text-gray-700" />
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-600 p-2 rounded-xl">
                <MessageCircle className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-gray-900">
                  Community Chat
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users size={14} />
                  <span>{messages.length} messages</span>
                </div>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-xl hover:bg-red-50"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto rounded-2xl bg-white shadow-sm border border-gray-100 mb-4"
        >
          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === user ? "justify-end" : "justify-start"
                } group`}
              >
                <div
                  className={`flex items-start gap-3 max-w-[90%] md:max-w-[80%]`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center 
                    ${
                      message.sender === user
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {getInitial(message.sender)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">
                        {message.sender || "Anonymous"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {message.timestamp}
                      </span>
                    </div>
                    <div
                      className={`rounded-2xl p-4 ${
                        message.sender === user
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p>{message.text}</p>

                      {message.linkPreview && (
                        <div className="mt-3 rounded-xl overflow-hidden bg-white shadow-sm">
                          <a
                            href={message.linkPreview.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block hover:opacity-90 transition-opacity"
                          >
                            <img
                              src={message.linkPreview.image}
                              alt={message.linkPreview.title}
                              className="w-full h-32 object-cover"
                            />
                            <div className="p-3">
                              <div className="flex items-center gap-1 text-purple-600 text-sm mb-1">
                                <Link size={14} />
                                <span className="font-medium">
                                  {message.linkPreview.title}
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 line-clamp-2">
                                {message.linkPreview.description}
                              </p>
                            </div>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Typing Indicator */}
            {typingUsers.length > 0 && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3 max-w-[90%] md:max-w-[80%]">
                  <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center bg-gray-100 text-gray-700">
                    {getInitial(typingUsers[0])}
                  </div>
                  <div className="rounded-2xl p-4 bg-gray-100 text-gray-900">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {typingUsers.join(", ")} is typing...
                      </span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <form
            onSubmit={sendMessage}
            className="flex flex-col md:flex-row gap-3"
          >
            <textarea
              className="flex-1 px-4 py-2 md:px-6 md:py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all text-gray-700 placeholder-gray-400 resize-none"
              placeholder="Type your message..."
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              rows={1} // Start with a single line
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all flex items-center justify-center gap-2"
            >
              <Send size={20} />
              <span className="hidden md:inline">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
