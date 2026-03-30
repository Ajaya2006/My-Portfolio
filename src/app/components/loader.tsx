import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="main-container">
        <div className="loader">
          <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="chipGradient" x1={0} y1={0} x2={0} y2={1}>
                <stop offset="0%" stopColor="#2d2d2d" />
                <stop offset="100%" stopColor="#0f0f0f" />
              </linearGradient>

              <linearGradient id="textGradient" x1={0} y1={0} x2={0} y2={1}>
                <stop offset="0%" stopColor="#eeeeee" />
                <stop offset="100%" stopColor="#888888" />
              </linearGradient>

              <linearGradient id="pinGradient" x1={1} y1={0} x2={0} y2={0}>
                <stop offset="0%" stopColor="#bbbbbb" />
                <stop offset="50%" stopColor="#888888" />
                <stop offset="100%" stopColor="#555555" />
              </linearGradient>
            </defs>

            {/* Circuit Traces */}
            <g id="traces">
              {/* Left Side */}
              <path d="M100 100 H200 V205 H300" className="trace-bg" />
              <path d="M100 100 H200 V205 H300" className="trace-flow purple" />

              <path d="M80 180 H180 V225 H300" className="trace-bg" />
              <path d="M80 180 H180 V225 H300" className="trace-flow blue" />

              <path d="M60 260 H150 V245 H300" className="trace-bg" />
              <path d="M60 260 H150 V245 H300" className="trace-flow yellow" />

              <path d="M100 350 H200 V265 H300" className="trace-bg" />
              <path d="M100 350 H200 V265 H300" className="trace-flow green" />

              {/* Right Side */}
              <path d="M700 90 H600 V205 H500" className="trace-bg" />
              <path d="M700 90 H600 V205 H500" className="trace-flow blue" />

              <path d="M740 160 H620 V225 H500" className="trace-bg" />
              <path d="M740 160 H620 V225 H500" className="trace-flow green" />

              <path d="M720 250 H610 V245 H500" className="trace-bg" />
              <path d="M720 250 H610 V245 H500" className="trace-flow red" />

              <path d="M680 340 H590 V265 H500" className="trace-bg" />
              <path d="M680 340 H590 V265 H500" className="trace-flow yellow" />
            </g>

            {/* Chip Body */}
            <rect
              x={300}
              y={180}
              width={200}
              height={110}
              rx={24}
              ry={24}
              fill="url(#chipGradient)"
              stroke="#222"
              strokeWidth={3}
              className="chip-body"
            />

            {/* Inner Glow Layer */}
            <rect
              x={308}
              y={188}
              width={184}
              height={94}
              rx={18}
              ry={18}
              fill="rgba(255,255,255,0.02)"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth={1}
            />

            {/* Left Pins */}
            <g>
              <rect x={292} y={200} width={8} height={12} fill="url(#pinGradient)" rx={2} />
              <rect x={292} y={223} width={8} height={12} fill="url(#pinGradient)" rx={2} />
              <rect x={292} y={246} width={8} height={12} fill="url(#pinGradient)" rx={2} />
              <rect x={292} y={269} width={8} height={12} fill="url(#pinGradient)" rx={2} />
            </g>

            {/* Right Pins */}
            <g>
              <rect x={500} y={200} width={8} height={12} fill="url(#pinGradient)" rx={2} />
              <rect x={500} y={223} width={8} height={12} fill="url(#pinGradient)" rx={2} />
              <rect x={500} y={246} width={8} height={12} fill="url(#pinGradient)" rx={2} />
              <rect x={500} y={269} width={8} height={12} fill="url(#pinGradient)" rx={2} />
            </g>

            {/* Loading Text */}
            <text
              x={400}
              y={236}
              fontFamily="Arial, sans-serif"
              fontSize={18}
              fill="url(#textGradient)"
              textAnchor="middle"
              className="chip-text"
            >
              SYSTEM
            </text>

            <text
              x={400}
              y={262}
              fontFamily="Arial, sans-serif"
              fontSize={18}
              fill="url(#textGradient)"
              textAnchor="middle"
              className="chip-text"
            >
              BOOTING
            </text>

            {/* End Nodes */}
            <circle cx={100} cy={100} r={5} fill="black" />
            <circle cx={80} cy={180} r={5} fill="black" />
            <circle cx={60} cy={260} r={5} fill="black" />
            <circle cx={100} cy={350} r={5} fill="black" />

            <circle cx={700} cy={90} r={5} fill="black" />
            <circle cx={740} cy={160} r={5} fill="black" />
            <circle cx={720} cy={250} r={5} fill="black" />
            <circle cx={680} cy={340} r={5} fill="black" />
          </svg>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .main-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    padding: 20px;
  }

  .loader {
    width: min(92vw, 860px);
    will-change: transform, opacity;
    transform: translateZ(0);
  }

  svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .trace-bg {
    stroke: #2f2f2f;
    stroke-width: 2;
    fill: none;
  }

  .trace-flow {
    stroke-width: 2;
    fill: none;
    stroke-dasharray: 45 420;
    stroke-dashoffset: 465;
    filter: drop-shadow(0 0 3px currentColor);
    animation: flow 2.6s linear infinite;
    will-change: stroke-dashoffset;
  }

  .yellow {
    stroke: #ffea00;
    color: #ffea00;
  }

  .blue {
    stroke: #00ccff;
    color: #00ccff;
  }

  .green {
    stroke: #00ff15;
    color: #00ff15;
  }

  .purple {
    stroke: #9900ff;
    color: #9900ff;
  }

  .red {
    stroke: #ff3300;
    color: #ff3300;
  }

  .chip-body {
    filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.45));
  }

  .chip-text {
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
  }

  @keyframes flow {
    to {
      stroke-dashoffset: 0;
    }
  }

  @media (max-width: 768px) {
    .loader {
      width: min(96vw, 720px);
    }
  }

  @media (max-width: 480px) {
    .loader {
      width: 98vw;
    }
  }
`;

export default Loader;