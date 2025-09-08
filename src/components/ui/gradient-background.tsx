"use client";

import { cn } from "@/lib/utils";

export const GradientBackground = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "min-h-screen w-full relative bg-white dark:bg-black",
        className
      )}
    >
      {/* Light mode gradient */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background: "#ffffff",
          backgroundImage: `
            radial-gradient(
              circle at top left,
              rgba(173, 109, 244, 0.5),
              transparent 70%
            )
          `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Dark mode gradient */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background: "#000000",
          backgroundImage: `
            radial-gradient(
              circle at top left,
              rgba(139, 69, 219, 0.3),
              rgba(59, 130, 246, 0.2) 50%,
              transparent 70%
            ),
            radial-gradient(
              circle at bottom right,
              rgba(168, 85, 247, 0.2),
              transparent 60%
            )
          `,
          filter: "blur(100px)",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
};
