import { useEffect, useState } from "react";

export function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener("rezise", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return width;
}
