import React, { useRef } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";

const ChatForm = ({
  chatHistory,
  setChatHistory,
  generateBotResponse,
  step,
  handleInputChange,
  handleSubmitUserInfo,
}) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);
    inputRef.current.value = "";

    if (step <= 4) {
      handleInputChange(userMessage);
      if (step === 5) handleSubmitUserInfo(); // Submit after the last input
    } else {
      setTimeout(() => {
        setChatHistory((history) => [
          ...history,
          { role: "model", text: "Thinking..." },
        ]);
        generateBotResponse([
          ...chatHistory,
          { role: "user", text: `Using the details above: ${userMessage}` },
        ]);
      }, 600);
    }
  };

  return (
    <form className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        required
      />
      <button type="submit" className="material-symbols-rounded">
        <IoIosArrowRoundUp />
      </button>
    </form>
  );
};

export default ChatForm;
