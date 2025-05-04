import React from "react";

const GlassmorphicSection: React.FC<{ className?: string; children?: React.ReactNode }> = ({ children, className = "" }) => (
  <section className={`relative p-8 rounded-2xl backdrop-blur-md bg-white/25 dark:bg-black/20 border border-white/30 dark:border-white/10 shadow-xl ${className}`}>
    {children}
  </section>
);

export default GlassmorphicSection;
