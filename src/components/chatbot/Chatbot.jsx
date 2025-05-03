import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { sendMessageToChatBot } from '../../features/chatbot/chatbotApi';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your virtual assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const botReply = await sendMessageToChatBot(inputMessage);

      const botMessage = {
        text: botReply,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: 'Sorry, I couldn’t fetch a response. Please try again later.',
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(messages);
  return (
    <div className="position-fixed bottom-0 end-0 m-4 z-index-1050">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="btn btn-dark rounded-circle shadow d-flex align-items-center justify-content-center"
          style={{ width: '60px', height: '60px' }}
          aria-label="Open chatbot"
        >
          <FaRobot size={24} />
        </button>
      )}

      {isOpen && (
        <div
          className="card border-0 shadow"
          style={{ width: '24rem', height: '500px', overflow: 'hidden' }}
        >
          {/* Header */}
          <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <FaRobot />
              <strong>ChunaabBot</strong>
            </div>
            <button
              onClick={toggleChat}
              className="btn btn-sm btn-light"
              aria-label="Close chatbot"
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="card-body overflow-auto bg-light" style={{ flex: 1 }}>
            {messages.map((message, index) => {
              const isUser = message.sender === 'user';
              const bubbleStyle = isUser
                ? 'bg-dark text-white ms-auto'
                : 'bg-white text-dark border';

              return (
                <div
                  key={index}
                  className={`mb-3 d-flex ${isUser ? 'justify-content-end' : 'justify-content-start'}`}
                >
                  <div
                    className={`p-3 rounded ${bubbleStyle}`}
                    style={{
                      maxWidth: '85%',
                      lineHeight: 1.4,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                    }}
                  >
                    <div>{message.text}</div>
                    <div className="text-end small opacity-50 mt-2">
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="d-flex justify-content-start mb-3">
                <div
                  className="bg-white border rounded px-3 py-2 d-inline-block"
                  style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
                >
                  <div className="d-flex gap-1">
                    <div
                      className="spinner-grow spinner-grow-sm text-secondary"
                      role="status"
                    ></div>
                    <div
                      className="spinner-grow spinner-grow-sm text-secondary"
                      role="status"
                    ></div>
                    <div
                      className="spinner-grow spinner-grow-sm text-secondary"
                      role="status"
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="card-footer bg-white border-top">
            <form onSubmit={handleSendMessage} className="w-100">
              <div className="input-group w-100">
                <input
                  type="text"
                  className="form-control flex-grow-1"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="btn btn-dark"
                  disabled={!inputMessage.trim() || isLoading}
                >
                  <IoSend />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
