import React from "react";

interface AnimatedHeaderProps {
  headerText: string;
  className?: string; // Optional prop
}

export const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ headerText, className }) => {
  let animationDelay = 200;

  return (
    <h1 className={className}>
      {headerText.split("").map((letter, i) => {
        if (letter === " ") {
          return <span key={`space-${i}`}>&nbsp;</span>; // Add a unique key for spaces
        }
        return (
          <span
            className="rubberBand translate-y-2 text-blue-400"
            key={i}
            data-aos="flip-left"
            data-aos-delay={`${(animationDelay += 100)}`}
          >
            {letter}
          </span>
        );
      })}
    </h1>
  );
};
