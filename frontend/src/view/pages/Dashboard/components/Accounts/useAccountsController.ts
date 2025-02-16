import { useMemo, useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DashBoardContext/useDashboard";
import { useQuery } from "@tanstack/react-query";
import { bankAccontsService } from "../../../../../app/services/bankAccountsService";

export function useAccountsController() {
    const windowWidth = useWindowWidth();
    const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
        useDashboard();

    const [sliderState, setSliderState] = useState({
        isBeginnin: true,
        isEnd: false,
    });

    const { data = [], isFetching } = useQuery({
        queryKey: ["bankAccounts"],
        queryFn: bankAccontsService.getAll,
    });

    const currentBalance = useMemo(() => {
        if (!data) return 0;

        return data.reduce(
            (total, account) => total + account.currentBalance,
            0
        );
    }, [data]);

    return {
        sliderState,
        setSliderState,
        windowWidth,
        toggleValuesVisibility,
        areValuesVisible,
        isLoading: isFetching,
        accounts: data,
        openNewAccountModal,
        currentBalance,
    };
}
