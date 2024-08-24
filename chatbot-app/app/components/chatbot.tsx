import React, { useState, useEffect } from "react";
import Image from "next/image";

const responses: Record<string, string> = {
  //predefined question and answers for user
  "What services do you offer?":
    "We offer a variety of services including web development, mobile app development, and digital marketing.",
  "How can I contact support?":
    "You can contact support via email at support@example.com or call us at 123-456-7890.",
};

const options = Object.keys(responses);

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ user?: string; bot: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  //Intial loading with some question for user
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([{ bot: "Hello, I am Harsh. How can I help you?" }]);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  //Function to be triggered when listed option is clicked
  const handleOptionClick = (option: string) => {
    const botResponse =
      responses[option] || "Sorry, I don't understand that question.";
    setMessages((prevMessages) => [
      ...prevMessages,
      { user: option, bot: botResponse },
    ]);
    setInput("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setIsTyping(true);

    // Clear the previous timeout if it's still active
    if (typingTimeout) clearTimeout(typingTimeout);

    // Setting a new timeout for automatic sending after 2 seconds of inactivity
    const newTimeout = setTimeout(() => {
      handleSend();
      setIsTyping(false);
    }, 2000);

    setTypingTimeout(newTimeout);
  };

  //Function to be triggered when send button is clicked
  const handleSend = () => {
    if (input.trim()) {
      const userMessage = input.trim();
      const botResponse =
        responses[userMessage] || "Sorry, I don't understand that question.";
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: userMessage, bot: botResponse },
      ]);
      setInput(""); // Clearing input after sending the message
      setIsTyping(false);
      if (typingTimeout) clearTimeout(typingTimeout); // Clearing timeout after sending
    }
  };

  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  //Loader UI
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader">
          <Image
            src="/images/loading.png" // Path relative to the `public` folder
            alt="loading Image"
            width={500} // Set desired width
            height={300} // Set desired height
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center bg-gray-50">
        <h2>Welcome to chatbot</h2>
      </div>
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col max-w-md w-full p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
          <div className="flex-grow flex flex-col overflow-y-auto p-4 bg-gray-100 rounded-lg">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                {msg.user && (
                  <>
                    <div className="font-bold">You:</div>
                    <div className="bg-blue-100 p-2 rounded-lg">{msg.user}</div>
                  </>
                )}
                <div className="font-bold mt-2">Bot:</div>
                <div className="bg-gray-200 p-2 rounded-lg">{msg.bot}</div>
              </div>
            ))}
            {isTyping && <div className="font-bold mt-2">You:</div>}
            {isTyping && (
              <div className="bg-gray-200 p-2 rounded-lg">Typing...</div>
            )}
          </div>

          {!isTyping && (
            <div className="mt-4">
              <div className="font-bold mb-2">Choose an option:</div>
              <ul className="space-y-2">
                {options.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className="cursor-pointer bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex mt-4">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              className="flex-1 p-2 border border-gray-300 rounded-lg"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSend}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
