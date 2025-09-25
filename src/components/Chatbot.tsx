import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your TechStore assistant. How can I help you today?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Simulate API call to Gemini
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText })
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      // Fallback response if API fails
      const fallbackResponses = [
        "I'm here to help you with any questions about our products!",
        "That's a great question! Let me help you find what you're looking for.",
        "I'd be happy to assist you with your shopping needs.",
        "Feel free to ask me about our products, shipping, or returns policy!"
      ];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 z-50 bg-gradient-to-r from-teal-500 to-orange-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-500 to-orange-500 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">TechStore Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.isBot ? 'justify-start' : 'justify-end'
                }`}
              >
                {message.isBot && (
                  <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      : 'bg-teal-500 text-white'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                {!message.isBot && (
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                  <Bot className="w-3 h-3 text-white" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputText.trim()}
                className="bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white p-2 rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;