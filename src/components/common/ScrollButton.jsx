import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaArrowCircleUp } from "react-icons/fa";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  return (
    <ScrollButtonWrapper>
      <div className="scrollButtonWrap">
        <p className="scrollMsg" style={{ display: visible ? "block" : "none" }}>Back To Top</p>
        <FaArrowCircleUp
          onClick={scrollToTop}
          style={{ display: visible ? "block" : "none" }}
          className="scrollButton"
        />
      </div>
    </ScrollButtonWrapper>
  );
};

export default ScrollButton;

const ScrollButtonWrapper = styled.div`
  margin: 0;
  padding: 0;
  position: fixed;
  right: 10px;
  bottom: 20%;
  font-size: 3rem;
  color: white;
  z-index: 1;

  .scrollButtonWrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .scrollButton {
    cursor: pointer;
  }

  .scrollMsg {
    writing-mode: vertical-rl;
    user-select: none;
    -webkit-user-select: none;
    font-size: 2.2rem;
    text-align: center;
    margin-left: 5px;
  }
`;
