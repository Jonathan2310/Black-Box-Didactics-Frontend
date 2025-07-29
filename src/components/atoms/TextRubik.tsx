import styled from "styled-components";
import React from "react";

interface TextProps {
  size?: string;
  weight?: string;
  color?: string;
  align?: string;
  lineHeight?: string;
  uppercase?: boolean;
  children: React.ReactNode;
  as?: React.ElementType;
}

const StyledText = styled.p<TextProps>`
  font-family: 'Rubik', sans-serif;
  font-size: ${({ size }) => size || '16px'};
  font-weight: ${({ weight }) => weight || '400'};
  color: ${({ color }) => color || '#000000'};
  text-align: ${({ align }) => align || 'left'};
  line-height: ${({ lineHeight }) => lineHeight || 'normal'};
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')};
  margin: 0;
`;

export default function TextRubik({
  size,
  weight,
  color,
  align,
  lineHeight,
  uppercase,
  children,
  as = "p",
}: TextProps) {
  return (
    <StyledText
      as={as}
      size={size}
      weight={weight}
      color={color}
      align={align}
      lineHeight={lineHeight}
      uppercase={uppercase}
    >
      {children}
    </StyledText>
  );
}
