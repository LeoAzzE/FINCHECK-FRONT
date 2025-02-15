import { createContext, useCallback, useState } from "react";

interface DashBoardContextValue {
    areValuesVisible: boolean;
    isNewAccountModalOpen: boolean;
    toggleValuesVisibility(): void;
    closeNewAccountModal(): void;
    openNewAccountModal(): void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const DashboardContext = createContext({} as DashBoardContextValue);

export function DashBoardProvider({ children }: { children: React.ReactNode }) {
    const [areValuesVisible, setAreValuesVisible] = useState(true);
    const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(true);

    const toggleValuesVisibility = useCallback(() => {
        setAreValuesVisible((prevState) => !prevState);
    }, []);

    const openNewAccountModal = useCallback(() => {
        setIsNewAccountModalOpen(true);
    }, []);

    const closeNewAccountModal = useCallback(() => {
        setIsNewAccountModalOpen(false);
    }, []);

    return (
        <DashboardContext.Provider
            value={{
                areValuesVisible,
                toggleValuesVisibility,
                closeNewAccountModal,
                isNewAccountModalOpen,
                openNewAccountModal,
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
}
