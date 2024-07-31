import React, { useState, useEffect } from 'react';

interface AnimatedCurrenciesProps {
  size: number;
  morphDuration: number;
  showDuration: number;
  fontFamily?: string;
  kerning?: number;
}

const AnimatedCurrencies: React.FC<AnimatedCurrenciesProps> = ({
  size,
  morphDuration,
  showDuration,
  fontFamily = "'Rubik Dirt', cursive",
  kerning = 10 // Default kerning value
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % totalSteps);
    }, showDuration + morphDuration);

    return () => clearInterval(interval);
  }, [showDuration, morphDuration]);

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
      {currentStep < 4 && (
        <>
          <text
            x={30 + kerning}
            y="65"
            fontSize="60"
            fill={currentSymbol.color}
            fontFamily={fontFamily}
            style={{ transition: `all ${morphDuration}ms` }}
          >
            {currentSymbol.symbol}
          </text>
          <text
            x="10"
            y="65"
            fontSize="60"
            fill={currentSymbol.color}
            fontFamily={fontFamily}
            style={{ transition: `all ${morphDuration}ms` }}
          >
            {currentSymbol.prefix}
          </text>
        </>
      )}

      {currentStep === 4 && (
        <text
          x="50"
          y="65"
          fontSize="60"
          fill={currentSymbol.color}
          fontFamily={fontFamily}
          textAnchor="middle"
          style={{
            transition: `all ${morphDuration}ms`,
            animation: `pulse ${showDuration * 2}ms infinite alternate`
          }}
        >
          {currentSymbol.symbol}
        </text>
      )}

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