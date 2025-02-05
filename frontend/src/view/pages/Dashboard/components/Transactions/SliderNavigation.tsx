import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

export function SliderNavigation() {
    const swiper = useSwiper();

    return (
        <>
            <button
                onClick={() => swiper.slidePrev()}
                className="absolute left-0 top-1/2 bg-gradient-to-r from-gray-100 to-transparent z-10 -translate-y-1/2 w-12 h-12 flex items-center justify-center"
            >
                <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
            </button>
            <button className="absolute right-0 bg-gradient-to-l from-gray-100 to-transparent z-10 top-1/2 w-12 h-12 -translate-y-1/2 flex items-center justify-center">
                <ChevronRightIcon
                    onClick={() => swiper.slideNext()}
                    className="w-6 h-6 text-gray-800"
                />
            </button>
        </>
    );
}
