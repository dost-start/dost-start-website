import { Card } from "./CardSwap";
import { ReactNode } from "react";

interface ImageCardProps {
  children?: ReactNode;
}

export default function ImageCard({ children }: ImageCardProps) {
  return (
    <Card customClass="overflow-hidden bg-white flex flex-col">
      {/* macOS Window Controls */}
      <div className="h-8 bg-gray-100 flex items-center px-3 gap-2 z-10 border-b border-gray-200 flex-shrink-0">
        <div className="w-3 h-3 rounded-full bg-black flex items-center justify-center group transition-colors hover:brightness-90">
          <svg className="w-2 h-2 opacity-0 group-hover:opacity-100" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="w-3 h-3 rounded-full bg-accent flex items-center justify-center group transition-colors hover:brightness-90">
          <svg className="w-2 h-2 opacity-0 group-hover:opacity-100" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="w-3 h-3 rounded-full bg-primary flex items-center justify-center group transition-colors hover:brightness-90">
          <svg className="w-2 h-2 opacity-0 group-hover:opacity-100" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      {/* Image content */}
      <div className="flex-1 bg-gray-50 relative">
        {children}
      </div>
    </Card>
  );
}
