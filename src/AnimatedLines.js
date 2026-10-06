import React from "react";
import { motion, useReducedMotion } from "motion/react";

const STRIPES = [
  { color: "#CE7052", duration: 0 },
  { color: "#DC9954", duration: 0 },
  { color: "#D3C598", duration: 0 },
];

export default function AnimatedLines() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        width: "110%",
        marginLeft: "-5%",
        marginTop: "-1.3rem",
        marginBottom: "3rem",
      }}
    >
      {STRIPES.map(({ color, duration }) => (
        <motion.div
          key={color}
          style={{ height: 16, borderRadius: 8, backgroundColor: color }}
          initial={{ width: reduceMotion ? "100%" : 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: reduceMotion ? 0 : duration,
            delay: reduceMotion ? 0 : 0,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}