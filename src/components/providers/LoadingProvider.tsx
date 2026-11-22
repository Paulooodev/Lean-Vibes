"use client";

import { createContext, useContext, type ReactNode, useCallback, useMemo, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { Preloader } from "../layout/Preloader";
/** Shape of the data the context will share */
type LoadingContextValue = {
    isLoaded: boolean;
}

/** Create the context (The default state is already loaded) */
const LoadingContext = createContext<LoadingContextValue>({ isLoaded: true });

/** Hook to access the loading state from any component */
export const useLoading = () => useContext(LoadingContext);

export function LoadingProvider({ children }: { children: ReactNode}) {
    // Should start as not loaded (This way the preloader will show)
    const [isLoaded, setIsLoaded] = useState(false);

    // Function that marks the site as loaded (called by the Preloader when it finishes)
    const markLoaded = useCallback(() => setIsLoaded(true));

    // Memoize the context value so it doesn't cause unnecessary re-renders
    const value = useMemo(() => ({ isLoaded }), [isLoaded]);

    return (
       <MotionConfig reducedMotion="user">
        <LoadingContext.Provider value={value}>
           {/* Only show the preloader while the site is still loading */}
           <AnimatePresence>
              {!isLoaded && <Preloader key="preloader" onComplete={markLoaded} />}  
            </AnimatePresence> 
            {children}
        </LoadingContext.Provider>
       </MotionConfig> 
    )
}



