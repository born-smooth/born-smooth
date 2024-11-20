import { createContext, useContext, ReactNode } from "react";

interface BornSmoothContextValue {
  // Add your context values here
}

const BornSmoothContext = createContext<BornSmoothContextValue | undefined>(
  undefined
);

interface BornSmoothProviderProps {
  children: ReactNode;
}

function BornSmoothProvider({ children }: BornSmoothProviderProps) {
  const value = {
    // Add your context values here
  };

  return (
    <BornSmoothContext.Provider value={value}>
      {children}
    </BornSmoothContext.Provider>
  );
}

function useBornSmooth() {
  const context = useContext(BornSmoothContext);
  if (context === undefined) {
    throw new Error("useBornSmooth must be used within a BornSmoothProvider");
  }
  return context;
}

export { BornSmoothProvider, useBornSmooth };
