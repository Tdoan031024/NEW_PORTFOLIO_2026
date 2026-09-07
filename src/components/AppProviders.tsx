"use client";

import { LanguageProvider } from "@/components/LanguageProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";
import GlobalStarfield from "@/components/GlobalStarfield";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <GlobalStarfield />
        <CustomCursor />
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}
