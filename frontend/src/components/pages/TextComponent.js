import React, { useState, useEffect } from "react";

function TextComponent({ text }) {
    const [showFullText, setShowFullText] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // check if user is on a mobile device
        const userAgent =
            navigator.userAgent || navigator.vendor || window.opera;
        setIsMobile(/android|ios|ipad|iphone/i.test(userAgent));
    }, []);

    const handleClick = () => {
        setShowFullText(!showFullText);
    };

    return (
        <div className="home-paragraph-text">
            <p>
                {showFullText || !isMobile ? (
                    text
                ) : (
                    <span>
                        {text.slice(0, 230)}{" "}
                        <button
                            style={{
                                background: "transparent",
                                color: "gray",
                                border: "none",
                                outline: "none",
                            }}
                            href="#"
                            onClick={handleClick}
                        >
                            ...more
                        </button>
                    </span>
                )}
            </p>
        </div>
    );
}

export default TextComponent;
