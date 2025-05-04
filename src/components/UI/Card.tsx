
import { ReactNode } from "react";

const GlassmorphicCard = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`p-6 rounded-xl backdrop-blur-sm bg-white/40 dark:bg-white/10 border border-white/50 dark:border-white/20 shadow-lg hover:shadow-xl transition duration-300 ${className}`}>
    {children}
  </div>
);

export default GlassmorphicCard;
