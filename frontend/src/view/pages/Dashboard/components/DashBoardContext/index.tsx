import { createContext, useCallback, useState } from "react";

interface DashBoardContextValue {
    areValuesVisible: boolean;
    toggleValuesVisibility(): void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const DashboardContext = createContext({} as DashBoardContextValue);

export function DashBoardProvider({ children }: { children: React.ReactNode }) {
    const [areValuesVisible, setAreValuesVisible] = useState(true);

    const toggleValuesVisibility = useCallback(() => {
        setAreValuesVisible((prevState) => !prevState);
    }, []);

    return (
        <DashboardContext.Provider
            value={{ areValuesVisible, toggleValuesVisibility }}
        >
            {children}
        </DashboardContext.Provider>
    );
}
