import { EyeIcon } from "../../../components/icons/EyeIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { AccountCard } from "./AccountCard";
import "swiper/swiper-bundle.css";
import { AccountsSliderNavigation } from "./AccountsSliderNavigation";

export function Accounts() {
    return (
        <div className="bg-teal-900 rounded 2xl h-full w-full md:p-10 px-4 py-8 flex flex-col">
            <div>
                <span className="tracking-[-0.5px] block text-white">
                    Saldo total
                </span>
                <div className="flex items-center gap-2">
                    <strong className="text-2xl tracking-[-1px] text-white">
                        R$ 1000,00
                    </strong>
                    <button className="h-8 flex items-center justify-center w-8">
                        <EyeIcon open />
                    </button>
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-end">
                <div>
                    <Swiper spaceBetween={16} slidesPerView={2.2}>
                        <div
                            slot="container-start"
                            className="flex items-center justify-between mb-4"
                        >
                            <strong className="text-white tracking-[-1px] text-lg font-bold">
                                Minhas contas
                            </strong>
                            <AccountsSliderNavigation />
                        </div>
                        <SwiperSlide>
                            <AccountCard
                                color="#7950F2"
                                name="Nubank"
                                balance={1000.23}
                                type="CASH"
                            />
                        </SwiperSlide>

                        <SwiperSlide>
                            <AccountCard
                                color="#333"
                                name="XP"
                                balance={1000.23}
                                type="INVESTMENT"
                            />
                        </SwiperSlide>

                        <SwiperSlide>
                            <AccountCard
                                color="#0f0"
                                name="Carteira"
                                balance={1000.23}
                                type="CASH"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
