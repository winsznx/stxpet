import { CSSProperties } from 'react';

interface DividerProps {
  color?: string;
  style?: CSSProperties;
}

export function Divider({ color = 'rgba(255,255,255,0.06)', style }: DividerProps) {
  return <hr style={{ border: 0, borderTop: `1px solid ${color}`, margin: 0, ...style }} />;
}
