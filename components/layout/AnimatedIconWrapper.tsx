"use client";
import React, { useRef, useEffect } from "react";

interface WrapperProps {
  children: React.ReactElement; // Base element type
  isHovered: boolean;
}

export function AnimatedIconWrapper({ children, isHovered }: WrapperProps) {
  // Hum define kar rahe hain ki ref ke andar kya methods honge
  const iconRef = useRef<{
    startAnimation: () => void;
    stopAnimation: () => void;
  }>(null);

  useEffect(() => {
    if (
      iconRef.current &&
      typeof iconRef.current.startAnimation === "function"
    ) {
      if (isHovered) {
        iconRef.current.startAnimation();
      } else {
        iconRef.current.stopAnimation();
      }
    }
  }, [isHovered]);

  // 'as any' yahan zaroori hai kyunki cloneElement aur refs ka combination
  // TS ke built-in types mein aksar conflict karta hai.
  return React.cloneElement(children as React.ReactElement<any>, {
    ref: iconRef,
    className: `${(children.props as any).className || ""} pointer-events-none`,
  });
}
