import { createContext, useCallback, useState } from "react";

interface DashBoardContextValue {
    areValuesVisible: boolean;
    isNewAccountModalOpen: boolean;
    isNewTransactionModalOpen: boolean;
    newTransactionType: "INCOME" | "EXPENSE" | null;
    toggleValuesVisibility(): void;
    closeNewAccountModal(): void;
    openNewAccountModal(): void;
    closeNewTransactionModal(): void;
    openNewTransactionModal(type: "INCOME" | "EXPENSE"): void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const DashboardContext = createContext({} as DashBoardContextValue);

export function DashBoardProvider({ children }: { children: React.ReactNode }) {
    const [areValuesVisible, setAreValuesVisible] = useState(true);
    const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
        useState(false);
    const [newTransactionType, setNewTransactionType] = useState<
        "INCOME" | "EXPENSE" | null
    >(null);

    const toggleValuesVisibility = useCallback(() => {
        setAreValuesVisible((prevState) => !prevState);
    }, []);

    const openNewAccountModal = useCallback(() => {
        setIsNewAccountModalOpen(true);
    }, []);

    const closeNewAccountModal = useCallback(() => {
        setIsNewAccountModalOpen(false);
    }, []);

    const openNewTransactionModal = useCallback(
        (type: "INCOME" | "EXPENSE") => {
            setNewTransactionType(type);
            setIsNewTransactionModalOpen(true);
        },
        []
    );

    const closeNewTransactionModal = useCallback(() => {
        setNewTransactionType(null);
        setIsNewTransactionModalOpen(false);
    }, []);

    return (
        <DashboardContext.Provider
            value={{
                areValuesVisible,
                toggleValuesVisibility,
                closeNewAccountModal,
                isNewAccountModalOpen,
                openNewAccountModal,
                isNewTransactionModalOpen,
                closeNewTransactionModal,
                openNewTransactionModal,
                newTransactionType,
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
}
