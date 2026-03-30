import React from "react";
import styled, { keyframes } from "styled-components";

/* ---------------- Animations ---------------- */

const speeder = keyframes`
  0% { transform: translate(2px,1px) rotate(0deg); }
  25% { transform: translate(-1px,-2px) rotate(-1deg); }
  50% { transform: translate(-2px,1px) rotate(1deg); }
  75% { transform: translate(2px,2px) rotate(0deg); }
  100% { transform: translate(1px,-2px) rotate(-1deg); }
`;

const moveClouds = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-2000px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

/* ---------------- Component ---------------- */

const Loader: React.FC = () => {
  return (
    <Wrapper>
      <div className="clouds">
        <div className="cloud cloud1" />
        <div className="cloud cloud2" />
        <div className="cloud cloud3" />
      </div>

      <div className="loader">
        <span>
          <span />
          <span />
          <span />
          <span />
        </span>

        <div className="base">
          <span />
          <div className="face" />
        </div>
      </div>
    </Wrapper>
  );
};

export default Loader;

/* ---------------- Styled Wrapper ---------------- */

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  overflow: hidden;
  z-index: 9999;
  animation: ${fadeIn} 0.6s ease-in;

  /* ---------------- Loader ---------------- */

  .loader {
    position: relative;
    animation: ${speeder} 0.4s linear infinite;
  }

  .loader > span {
    height: 5px;
    width: 35px;
    background: #ef4444;
    position: absolute;
    top: -19px;
    left: 60px;
    border-radius: 2px 10px 1px 0;
  }

  .loader > span > span {
    width: 30px;
    height: 1px;
    background: white;
    position: absolute;
    animation: 0.4s linear infinite;
  }

  .loader > span > span:nth-child(1) {
    animation-name: moveLine;
  }
  .loader > span > span:nth-child(2) {
    top: 3px;
    animation-name: moveLine;
    animation-duration: 0.6s;
  }
  .loader > span > span:nth-child(3) {
    top: 1px;
    animation-name: moveLine;
    animation-duration: 0.5s;
  }
  .loader > span > span:nth-child(4) {
    top: 4px;
    animation-name: moveLine;
    animation-duration: 0.8s;
  }

  @keyframes moveLine {
    from { left: 0; }
    to { left: -100px; opacity: 0; }
  }

  .base span {
    position: absolute;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-right: 100px solid #e2e8f0;
    border-bottom: 6px solid transparent;
  }

  .base span::before {
    content: "";
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background: #e2e8f0;
    position: absolute;
    right: -110px;
    top: -16px;
  }

  .base span::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-right: 55px solid #e2e8f0;
    border-bottom: 16px solid transparent;
    top: -16px;
    right: -98px;
  }

  .face {
    position: absolute;
    height: 12px;
    width: 20px;
    background: #e2e8f0;
    border-radius: 20px 20px 0 0;
    transform: rotate(-40deg);
    right: -125px;
    top: -15px;
  }

  .face::after {
    content: "";
    height: 12px;
    width: 12px;
    background: #ef4444;
    right: 4px;
    top: 7px;
    position: absolute;
    transform: rotate(40deg);
    border-radius: 0 0 2px 2px;
  }

  /* ---------------- Clouds ---------------- */

  .clouds {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .cloud {
    position: absolute;
    background: white;
    border-radius: 50%;
    opacity: 0.1;
    animation: ${moveClouds} linear infinite;
  }

  .cloud::before,
  .cloud::after {
    content: "";
    position: absolute;
    background: white;
    border-radius: 50%;
  }

  .cloud::before {
    width: 60%;
    height: 60%;
    top: -30%;
    left: 10%;
  }

  .cloud::after {
    width: 40%;
    height: 40%;
    top: -20%;
    left: 50%;
  }

  .cloud1 {
    width: 120px;
    height: 70px;
    top: 20%;
    left: 120%;
    animation-duration: 8s;
  }

  .cloud2 {
    width: 180px;
    height: 90px;
    top: 50%;
    left: 150%;
    animation-duration: 12s;
  }

  .cloud3 {
    width: 90px;
    height: 60px;
    top: 75%;
    left: 180%;
    animation-duration: 10s;
  }
`;