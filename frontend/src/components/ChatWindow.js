import React, { useState } from "react";
import "./ChatWindow.css";

import { SlEnergy, SlRefresh } from "react-icons/sl";
import { BsFillCpuFill } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { FcPortraitMode } from "react-icons/fc";
import { IoIosWarning } from "react-icons/io";
import TextComponent from "./pages/TextComponent";
import ScrollBarFeed from "react-scrollable-feed";

const ChatWindow = () => {
    const [showChatBox, setShowChatBox] = useState(true);
    const [inputText, setInputText] = useState("");
    const [chatLog, setChatLog] = useState([]);

    function clearChat() {
        setChatLog([]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowChatBox(false);
        let chatLogNew = [...chatLog, { user: "me", message: `${inputText}` }];
        setInputText("");
        setChatLog(chatLogNew);

        // Fetch Request { sending as a message to localhost:3050}
        const response = await fetch("http://localhost:3050/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: chatLogNew.map((message) => message.message).join(""),
            }),
        });

        const data = await response.json();
        setChatLog([
            ...chatLogNew,
            { user: "gpt", message: `${data.message}` },
        ]);
        console.log(data.message);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            event.stopPropagation();
            handleSubmit(event);
        }
    };

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    return (
        <div className="main-chat-box">
            {showChatBox && (
                <section className="chat-box">
                    <h1>ChatBOT</h1>
                    <div className="icon-uses">
                        <SlEnergy size={20} />
                        <p>Uses</p>
                    </div>
                    <div className="home-paragraph-text-main">
                        <TextComponent
                            text={
                                "This Al is trained on the Agenda and Nonprofit Technology Conference site info using vector embeddings. You can ask it to create a schedule based on your interests, or about other activities going on, location info, and who knows what else. Note this tool is not affiliated with NTEN or 23NTC, it was created by CauseWriter Al to help our favorite conference."
                            }
                        />
                    </div>
                    <div className="bot-first-message">
                        <BsFillCpuFill
                            style={{
                                background: "#50afe4",
                                padding: "5px",
                            }}
                        />
                        <p>Ask a question about 23NTC and I'll try to answer</p>
                    </div>
                </section>
            )}

            <section className="chat-log">
                <ScrollBarFeed>
                    {chatLog.map((message, i) => (
                        <ChatMessage key={i} message={message} />
                    ))}
                </ScrollBarFeed>
            </section>

            <section className="chat-box-input-main">
                <div className="chat-box-input">
                    <div className="chat-box-input-with-sentBtn">
                        <form onSubmit={handleSubmit}>
                            <textarea
                                value={inputText}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                rows={2}
                                placeholder="Type your message..."
                            />
                            <button type="submit">
                                <FiSend />
                            </button>
                        </form>
                    </div>

                    <div onClick={clearChat} className="clear-response-button">
                        <SlRefresh />
                    </div>
                </div>

                <div className="clear-response">
                    <button onClick={clearChat}>Clear Responses</button>
                </div>
                <div className="chat-box-input-bottom-text">
                    <IoIosWarning />
                    <p>If chat wanders you can ask</p>
                </div>
            </section>
        </div>
    );
};

const ChatMessage = ({ message }) => {
    return (
        <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
            <div className="chat-message-center">
                <div
                    className={`chat-avatar ${
                        message.user === "gpt" && "chatgpt"
                    }`}
                >
                    {message.user === "gpt" ? (
                        <BsFillCpuFill />
                    ) : (
                        <FcPortraitMode />
                    )}
                </div>
                <div className="message">{message.message}</div>
            </div>
        </div>
    );
};

export default ChatWindow;
