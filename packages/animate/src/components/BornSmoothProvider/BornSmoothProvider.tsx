import { createContext, useContext } from "react";

interface BornSmoothContextValue {
  // TODO: add your context values here
}

const BornSmoothContext = createContext<BornSmoothContextValue>({});

function BornSmoothProvider({ children }: { children: React.ReactNode }) {
  const value = {
    // TODO: add context values here
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
