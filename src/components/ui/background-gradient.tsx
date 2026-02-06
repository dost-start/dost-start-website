"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "motion/react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
          background:
            "radial-gradient(circle farthest-side at 0 100%, var(--primary), transparent), radial-gradient(circle farthest-side at 100% 0, var(--accent), transparent), radial-gradient(circle farthest-side at 100% 100%, var(--primary), transparent), radial-gradient(circle farthest-side at 0 0, var(--accent), #0a0a0a)",
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-70 group-hover:opacity-100 blur-xl transition duration-500 will-change-transform"
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
          background:
            "radial-gradient(circle farthest-side at 0 100%, var(--primary), transparent), radial-gradient(circle farthest-side at 100% 0, var(--accent), transparent), radial-gradient(circle farthest-side at 100% 100%, var(--primary), transparent), radial-gradient(circle farthest-side at 0 0, var(--accent), #0a0a0a)",
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] will-change-transform"
        )}
      />

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
