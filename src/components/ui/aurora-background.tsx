"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div className={cn("relative w-full bg-black", className)} {...props}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-70 blur-3xl">
          <div 
            className="absolute top-0 -left-10 w-72 h-72 bg-[#FF6B6B] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
          />
          <div 
            className="absolute top-0 -right-10 w-72 h-72 bg-[#4ECDC4] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
          />
          <div 
            className="absolute -bottom-10 left-20 w-72 h-72 bg-[#1A535C] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
          />
          <div 
            className="absolute -bottom-10 right-20 w-72 h-72 bg-[#FF6B6B] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
          />
        </div>
      </div>
      {children}
    </div>
    </div>
    );
};
