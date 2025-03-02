import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export default function SuccessIcon({ size = 100, color = "#28a745" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Círculo de fundo */}
      <Circle cx="50" cy="50" r="45" stroke={color} strokeWidth="5" fill="none" />
      {/* Caminho do check */}
      <Path
        d="M30 50 L44 65 L70 35"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
