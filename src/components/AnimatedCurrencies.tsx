import React, { useState, useEffect } from 'react';

interface AnimatedCurrencyProps {
  size: number;
  morphDuration: number;
  showDuration: number;
}

const AnimatedCurrencies: React.FC<AnimatedCurrencyProps> = ({ size, morphDuration, showDuration }) => {
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
      <defs>
        <path id="dollarPath" d="M50 20V80M40 30H60M40 70H60" />
        <path id="euroPath" d="M60 30H40Q30 30 30 50T40 70H60M40 50H55" />
        <path id="questionPath" d="M40 30Q50 20 60 30T50 55V70M50 80V85" />
      </defs>

      {currentStep < 4 && (
        <>
          <text
            x="30"
            y="65"
            fontSize="60"
            fill={currentSymbol.color}
            style={{ transition: `all ${morphDuration}ms` }}
          >
            {currentSymbol.symbol}
          </text>
          <text
            x="10"
            y="65"
            fontSize="60"
            fill={currentSymbol.color}
            style={{ transition: `all ${morphDuration}ms` }}
          >
            {currentSymbol.prefix}
          </text>
        </>
      )}

      {currentStep === 4 && (
        <path
          d={symbols[currentStep].symbol === '?' ? "M40 30Q50 20 60 30T50 55V70M50 80V85" : ""}
          stroke="black"
          strokeWidth="8"
          fill="none"
          style={{
            transition: `all ${morphDuration}ms`,
            animation: `pulse ${showDuration * 2}ms infinite alternate`
          }}
        />
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