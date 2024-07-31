import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCurrenciesProps {
  size: number;
  morphDuration: number;
  showDuration: number;
  fontFamily?: string;
  kerning?: number;
  maxOffset?: number;
}

const AnimatedCurrencies: React.FC<AnimatedCurrenciesProps> = ({
  size,
  morphDuration,
  showDuration,
  fontFamily = "'Rubik Dirt', cursive",
  kerning = 10,
  maxOffset = 20
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const totalSteps = 5;

  const symbolRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % totalSteps);
      setPosition({
        x: Math.random() * maxOffset * 2 - maxOffset,
        y: Math.random() * maxOffset * 2 - maxOffset
      });
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), morphDuration);
    }, showDuration + morphDuration);

    return () => clearInterval(interval);
  }, [showDuration, morphDuration, maxOffset]);

  const symbols = [
    { symbol: '$', color: 'green', prefix: '+' },
    { symbol: '$', color: 'red', prefix: '-' },
    { symbol: '€', color: 'green', prefix: '+' },
    { symbol: '€', color: 'red', prefix: '-' },
    { symbol: '?', color: 'black', prefix: '' },
  ];

  const currentSymbol = symbols[currentStep];

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <g transform={`translate(${50 + position.x}, ${50 + position.y})`}>
        {currentStep < 4 ? (
          <>
            <text
              ref={symbolRef}
              x={kerning}
              y="0"
              fontSize="60"
              fill={currentSymbol.color}
              fontFamily={fontFamily}
              textAnchor="middle"
              alignmentBaseline="central"
              style={{
                transition: `all ${morphDuration}ms`,
                transform: isAnimating ? 'scale(1)' : 'scale(0.33)',
                opacity: isAnimating ? 1 : 0
              }}
            >
              {currentSymbol.symbol}
            </text>
            <text
              x={-kerning}
              y="0"
              fontSize="60"
              fill={currentSymbol.color}
              fontFamily={fontFamily}
              textAnchor="middle"
              alignmentBaseline="central"
              style={{
                transition: `all ${morphDuration}ms`,
                transform: isAnimating ? 'scale(1)' : 'scale(0.33)',
                opacity: isAnimating ? 1 : 0
              }}
            >
              {currentSymbol.prefix}
            </text>
          </>
        ) : (
          <text
            ref={symbolRef}
            x="0"
            y="0"
            fontSize="60"
            fill={currentSymbol.color}
            fontFamily={fontFamily}
            textAnchor="middle"
            alignmentBaseline="central"
            style={{
              transition: `all ${morphDuration}ms`,
              transform: isAnimating ? 'scale(1)' : 'scale(0.33)',
              opacity: isAnimating ? 1 : 0,
              animation: `pulse ${showDuration}ms infinite alternate`
            }}
          >
            {currentSymbol.symbol}
          </text>
        )}
      </g>

      <style>
        {`
          @keyframes pulse {
            from { transform: scale(0.8); }
            to { transform: scale(1.2); }
          }
        `}
      </style>
    </svg>
  );
};

export default AnimatedCurrencies;