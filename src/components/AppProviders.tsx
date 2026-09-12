"use client";

import { LanguageProvider } from "@/components/LanguageProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import GlobalStarfield from "@/components/GlobalStarfield";
import CustomCursor from "@/components/CustomCursor";

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
