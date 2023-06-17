import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const Card = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "rounded-lg shadow-even mx-4 py-8 px-4 bg-white",
        className
      )}
    >
      {children}
    </div>
  );
};
