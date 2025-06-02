import React, { useRef, useEffect, useState } from "react";
import { IoIosArrowRoundDown, IoIosArrowRoundForward } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import ChatbotIcon from "./ChatbotIcon.jsx";
import ChatForm from "./ChatForm.jsx";
import ChatMessage from "./ChatMessage.jsx";
import { companyInfo } from "./CompanyInfo.jsx";
import postAPI from "../../api/postAPI.jsx";

const ChatBot = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: companyInfo,
    },
  ]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();
  const [showPopup, setShowPopup] = useState(false);

  const [step, setStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    note: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const questions = [
    "What is your name?",
    "What is your email address?",
    "What is your phone number?",
    "What service are you interested in?",
    "If have any message, please write message?",
    "Thank you for your details. How can I help you?",
  ];

  const validateInput = (field, value) => {
    switch (field) {
      case "name":
        return /^[a-zA-Z ]{3,}$/.test(value) ? "" : "Please enter a valid name";
      case "email":
        return /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? ""
          : "Please enter a valid email address.";
      case "phone":
        return /^\d{10}$/.test(value)
          ? ""
          : "Please enter 10-digit phone number.";
      case "service":
        return value.trim()
          ? ""
          : "Please specify the service you are interested in.";
      default:
        return "";
    }
  };

  const handleInputChange = (value) => {
    const field = Object.keys(userInfo)[step];
    const error = validateInput(field, value);

    if (error) {
      setErrorMessage(error);
      setChatHistory((prev) => [...prev, { role: "model", text: error }]);
      return;
    }

    setErrorMessage("");
    setUserInfo((prev) => ({ ...prev, [field]: value }));
    setStep((prev) => prev + 1);
  };

  // const handleSubmitUserInfo = async () => {
  //     if (!userInfo.name || !userInfo.email || !userInfo.phone || !userInfo.service) {
  //         setStep(0);
  //         return;
  //     }

  //     try {
  //         console.log(userInfo);

  //         const response = await postAPI('/contactuss', userInfo, {
  //             'Content-Type': 'application/json'
  //         }, true);
  //         console.log(response);

  //         setChatHistory((prev) => {
  //             const finalMessage = questions[5];
  //             if (!prev.some((msg) => msg.text === finalMessage)) {
  //                 return [...prev, { role: 'model', text: finalMessage }];
  //             }
  //             return prev;
  //         });

  //         setStep(5);
  //     } catch (error) {
  //         console.error('Error submitting user info:', error);
  //         alert('Error submitting your information. Please try again.');
  //         return setStep(0);
  //     }
  // };

  // const handleSubmitUserInfo = async () => {
  //     if (!userInfo.name || !userInfo.email || !userInfo.phone || !userInfo.service) {
  //         setStep(0);
  //         return;
  //     }
  //     try {
  //         console.log(userInfo);

  //         const response = await postAPI('/contactuss', userInfo, {
  //             'Content-Type': 'application/json'
  //         }, true);
  //         console.log(response);

  //         setChatHistory((prev) => {
  //             const finalMessage = questions[5];
  //             if (!prev.some((msg) => msg.text === finalMessage)) {
  //                 return [...prev, { role: 'model', text: finalMessage }];
  //             }
  //             return prev;
  //         });
  //         if (!response.hasError) {
  //             console.log("userinfo submitted");
  //             setStep(5);

  //           } else {
  //             console.log("pls fill again");

  //           }

  //     } catch (error) {
  //         console.error("error while submitting");

  //        setChatHistory((prev) => [...prev, { role: 'model', text: "Sorry, some error occurred. Please fill the details again." }]);

  //         setUserInfo({ name: '', email: '', phone: '', service: '', note: '' });
  //         setStep(0);
  //     }
  // };

  // useEffect(() => {
  //     if (step < questions.length) {
  //         const currentQuestion = questions[step];
  //         setChatHistory((prev) => {
  //             // Ensure questions are not added twice
  //             if (!prev.some((msg) => msg.text === currentQuestion)) {
  //                 return [...prev, { role: 'model', text: currentQuestion }];
  //             }
  //             return prev;
  //         });
  //     }

  //     // Automatically submit when the user reaches the last input
  //     if (step === 5) {
  //         handleSubmitUserInfo();
  //     }
  // }, [step]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userDetails = localStorage.getItem("userDetails");

    if (accessToken && userDetails) {
      // If user is already authenticated, skip questions and go directly to chat
      setChatHistory([{ role: "model", text: "Hello, How can I help you?" }]);
      setStep(5); // Skip to the help message step
      return;
    }

    if (step < questions.length) {
      const currentQuestion = questions[step];
      setChatHistory((prev) => {
        if (!prev.some((msg) => msg.text === currentQuestion)) {
          return [...prev, { role: "model", text: currentQuestion }];
        }
        return prev;
      });
    }

    if (step === 5) {
      handleSubmitUserInfo();
    }
  }, [step]);

  const handleSubmitUserInfo = async () => {
    if (
      !userInfo.name ||
      !userInfo.email ||
      !userInfo.phone ||
      !userInfo.service
    ) {
      setStep(0);
      return;
    }

    try {
      const response = await postAPI(
        "/contactus",
        userInfo,
        {
          "Content-Type": "application/json",
        },
        true
      );

      // If API call is successful, show the final message
      if (!response.hasError) {
        setChatHistory((prev) => {
          const finalMessage = questions[5];
          if (!prev.some((msg) => msg.text === finalMessage)) {
            return [...prev, { role: "model", text: finalMessage }];
          }
          return prev;
        });
        setStep(5); // Proceed to the help message
      } else {
        throw new Error("Form submission failed"); // Trigger error handling
      }
    } catch (error) {
      console.error("Error while submitting");

      // Display the error message and reset the chat history to the initial state
      setChatHistory([
        { hideInChat: true, role: "model", text: companyInfo },
        {
          role: "model",
          text: "Sorry, some error occurred. Please fill the details again.",
        },
        { role: "model", text: questions[0] }, // Restart from the first question
      ]);

      // Reset user information and restart from the first question
      setUserInfo({ name: "", email: "", phone: "", service: "", note: "" });
      setStep(0); // Restart from the first question
    }
  };

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text, isError },
      ]);
    };

    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    const apiUrl = process.env.REACT_APP_API_URL_CHAT || "";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error.message || "Something Went Wrong");

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory("Failed to get a response. Please try again.", true);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!showChatbot) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 5000); // Hide after 5 seconds
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [showChatbot]);

  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        id="chatbot-toggler"
      >
        <span className="material-symbols-rounded">
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlMTEelnh5ku1vaSWwLN2blXbK4qGNASRy4w&s"
            }
            alt={""}
          />
        </span>
        <span className="material-symbols-rounded">
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlMTEelnh5ku1vaSWwLN2blXbK4qGNASRy4w&s"
            }
            alt={""}
          />
        </span>

        {showPopup && (
          <div className="chatbot-popup-message">
            <p className="mb-0">👋 Hello! I am Edi, here to help you.</p>
          </div>
        )}
      </button>
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            {/* <ChatbotIcon /> */}
            <span className="message-bot-img">
              <img
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlMTEelnh5ku1vaSWwLN2blXbK4qGNASRy4w&s"
                }
                alt={""}
              />
            </span>
            <h2 className="logo-text m-0">Edi</h2>
          </div>
          <button
            onClick={() => setShowChatbot((prev) => !prev)}
            className="material-symbols-rounded"
          >
            <IoIosArrowRoundDown />
          </button>
        </div>

        <div ref={chatBodyRef} className="chat-body">
          {/* {chatHistory.map((chat, index) => <ChatMessage key={index} chat={chat} />)} */}
          {chatHistory.map((chat, index) => (
            <ChatMessage
              key={index}
              chat={chat}
              handleInputChange={handleInputChange}
            />
          ))}
          {/* {errorMessage && <p className='chatbot-error-msg'>{errorMessage}</p>} */}
        </div>

        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
            step={step}
            handleInputChange={handleInputChange}
            handleSubmitUserInfo={handleSubmitUserInfo}
            userInfo={userInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
