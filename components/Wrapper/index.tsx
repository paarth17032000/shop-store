import { ReactNode } from 'react';

interface WrapperProps {
  className?: string;
  children: ReactNode;
}

export default function Wrapper({ className, children }: WrapperProps) {
  return (
    <div
      className={`w-full max-w-[1280px] mx-auto px-5 md:px-10 ${className || ''}`}
    >
      {children}
    </div>
  );
}
