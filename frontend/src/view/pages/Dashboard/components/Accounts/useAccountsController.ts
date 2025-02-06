import { useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DashBoardContext/useDashboard";

export function useAccountsController() {
    const windowWidth = useWindowWidth();
    const { areValuesVisible, toggleValuesVisibility } = useDashboard();

    const [sliderState, setSliderState] = useState({
        isBeginnin: true,
        isEnd: false,
    });

    return {
        sliderState,
        setSliderState,
        windowWidth,
        toggleValuesVisibility,
        areValuesVisible,
        isLoading: false,
        accounts: []
    };
}
