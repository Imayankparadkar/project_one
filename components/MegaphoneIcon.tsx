"use client";

import { cn } from "@/lib/utils";
import type { HTMLMotionProps, Variants } from "motion/react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";

import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

export interface MegaphoneIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MegaphoneIconProps extends HTMLMotionProps<"div"> {
  size?: number;
  duration?: number;
  isAnimated?: boolean;
}

const MegaphoneIcon = forwardRef<MegaphoneIconHandle, MegaphoneIconProps>(
  (
    {
      onMouseEnter,
      onMouseLeave,
      className,
      size = 24,
      duration = 1,
      isAnimated = true,
      ...props
    },
    ref
  ) => {
    const controls = useAnimation();
    const reduced = useReducedMotion();
    const isControlled = useRef(false);

    useImperativeHandle(ref, () => {
      isControlled.current = true;
      return {
        startAnimation: () =>
          reduced ? controls.start("normal") : controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleEnter = useCallback(
      (e?: React.MouseEvent<HTMLDivElement>) => {
        if (!isAnimated || reduced) return;
        if (!isControlled.current) controls.start("animate");
        else onMouseEnter?.(e as any);
      },
      [controls, reduced, isAnimated, onMouseEnter]
    );

    const handleLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlled.current) {
          controls.start("normal");
        } else {
          onMouseLeave?.(e as any);
        }
      },
      [controls, onMouseLeave]
    );

    // 🎯 Megaphone shake animation
    const megaphoneVariants: Variants = {
      normal: { rotate: 0 },
      animate: {
        rotate: [0, -12, 10, -6, 4, -2, 0],
        transition: {
          duration: 1.4 * duration,
          ease: "easeInOut",
        },
      },
    };

    // 🔊 Sound wave animation
    const waveVariants: Variants = {
      normal: { opacity: 0, scale: 0.8 },
      animate: {
        opacity: [0, 1, 0],
        scale: [0.8, 1.3, 1.6],
        transition: {
          duration: 1.4 * duration,
          ease: "easeOut",
        },
      },
    };

    return (
      <motion.div
        className={cn("relative inline-flex", className)}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={controls}
          initial="normal"
          variants={megaphoneVariants}
        >
          {/* Megaphone body */}
          <path d="M3 11v2a1 1 0 0 0 1 1h2l4 3V7L6 10H4a1 1 0 0 0-1 1z" />
          <line x1="14" y1="9" x2="21" y2="6" />
          <line x1="14" y1="15" x2="21" y2="18" />
        </motion.svg>

        {/* Sound Wave Effect */}
        <motion.span
          className="absolute right-0 top-1/2 h-3 w-3 rounded-full bg-current"
          style={{ transform: "translate(50%, -50%)" }}
          variants={waveVariants}
          animate={controls}
        />
      </motion.div>
    );
  }
);

MegaphoneIcon.displayName = "MegaphoneIcon";
export { MegaphoneIcon };
