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
    <div className={twMerge("rounded-lg shadow-even bg-white", className)}>
      {children}
    </div>
  );
};
