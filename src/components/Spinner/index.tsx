import React from 'react';
import styled from 'styled-components';

type Props = {
  style?: React.CSSProperties;
  useCurrentColor?: boolean;
};

export const Spinner = ({ style, useCurrentColor }: Props) => (
  <StyledSpinner
    style={style}
    useCurrentColor={useCurrentColor}
    viewBox="0 0 50 50"
  >
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="4"
    />
  </StyledSpinner>
);

const StyledSpinner = styled.svg<{ useCurrentColor?: boolean }>`
  animation: rotate 2s linear infinite;
  width: 50px;
  height: 50px;

  & .path {
    stroke: ${({ theme, useCurrentColor }) =>
      useCurrentColor ? 'currentColor' : theme.palette.primary.main};
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export default Spinner;
