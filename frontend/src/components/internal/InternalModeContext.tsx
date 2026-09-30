
import React, { createContext, useContext, useState, useEffect } from "react";

type InternalModeContextType = {
  isInternal: boolean;
  enableInternalMode: () => void;
  disableInternalMode: () => void;
};

const InternalModeContext = createContext<InternalModeContextType | undefined>(undefined);

export function InternalModeProvider({ children }: { children: React.ReactNode }) {
  const [isInternal, setIsInternal] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("lud_internal_mode");
    if (stored === "true") {
      setIsInternal(true);
    }
  }, []);

  const enableInternalMode = () => {
    setIsInternal(true);
    localStorage.setItem("lud_internal_mode", "true");
  };

  const disableInternalMode = () => {
    setIsInternal(false);
    localStorage.setItem("lud_internal_mode", "false");
  };

  return (
    <InternalModeContext.Provider value={{ isInternal, enableInternalMode, disableInternalMode }}>
      {children}
    </InternalModeContext.Provider>
  );
}

export function useInternalMode() {
  const context = useContext(InternalModeContext);
  if (context === undefined) {
    throw new Error("useInternalMode must be used within an InternalModeProvider");
  }
  return context;
}
