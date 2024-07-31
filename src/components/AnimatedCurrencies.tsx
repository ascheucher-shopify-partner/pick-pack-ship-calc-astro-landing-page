import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCurrenciesProps {
  size: number;
  morphDuration: number;
  showDuration: number;
  fontFamily?: string;
  kerning?: number;
  maxRandomStepOffset?: number;
}

const AnimatedCurrencies: React.FC<AnimatedCurrenciesProps> = ({
  size,
  morphDuration,
  showDuration,
  fontFamily = "'Rubik Dirt', cursive",
  kerning = 10,
  maxRandomStepOffset = 20
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const totalSteps = 5;

  const symbolRef = useRef<SVGTextElement>(null);

  const getRandomPosition = () => {
    const maxSafeOffset = maxRandomStepOffset * 0.6;
    return {
      x: Math.random() * maxSafeOffset * 2 - maxSafeOffset,
      y: Math.random() * maxSafeOffset * 2 - maxSafeOffset
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % totalSteps);
      setPosition(getRandomPosition());  // Move this line inside the interval
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), morphDuration);
    }, showDuration + morphDuration);

    return () => clearInterval(interval);
  }, [showDuration, morphDuration, maxRandomStepOffset]);

  const symbols = [
    { symbol: '$', color: 'green', prefix: '+' },
    { symbol: '$', color: 'red', prefix: '-' },
    { symbol: '€', color: 'green', prefix: '+' },
    { symbol: '€', color: 'red', prefix: '-' },
    { symbol: '?', color: 'black', prefix: '' },
  ];

  const currentSymbol = symbols[currentStep];

  const getAnimationStyle = () => ({
    transition: `all ${morphDuration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
    transform: isAnimating ? 'scale(1)' : 'scale(0.33)',
    opacity: isAnimating ? 1 : 0
  });

  const getQuestionMarkStyle = () => ({
    ...getAnimationStyle(),
    animation: isAnimating
      ? `pulse ${showDuration}ms ${morphDuration}ms infinite alternate`
      : 'none'
  });

  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100">
      <g transform={`translate(${position.x}, ${position.y})`}>
        {currentStep < 4 ? (
          <>
            <text
              ref={symbolRef}
              x={kerning}
              y="0"
              fontSize="40"
              fill={currentSymbol.color}
              fontFamily={fontFamily}
              textAnchor="middle"
              alignmentBaseline="central"
              style={getAnimationStyle()}
            >
              {currentSymbol.symbol}
            </text>
            <text
              x={-kerning}
              y="0"
              fontSize="40"
              fill={currentSymbol.color}
              fontFamily={fontFamily}
              textAnchor="middle"
              alignmentBaseline="central"
              style={getAnimationStyle()}
            >
              {currentSymbol.prefix}
            </text>
          </>
        ) : (
          <text
            ref={symbolRef}
            x="0"
            y="0"
            fontSize="40"
            fill={currentSymbol.color}
            fontFamily={fontFamily}
            textAnchor="middle"
            alignmentBaseline="central"
            style={getQuestionMarkStyle()}
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