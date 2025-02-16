import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { AccountCard } from "../../components/Accounts/AccountCard";
import "swiper/swiper-bundle.css";
import { useAccountsController } from "./useAccountsController";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { cn } from "../../../../../app/utils/cn";
import { Spinner } from "../../../../components/Spinner";
import { SliderNavigation } from "../Accounts/SliderNavigation";
import { PlusIcon } from "@radix-ui/react-icons";

export function Accounts() {
    const {
        sliderState,
        setSliderState,
        windowWidth,
        areValuesVisible,
        toggleValuesVisibility,
        isLoading,
        accounts,
        currentBalance,
        openNewAccountModal,
    } = useAccountsController();
    return (
        <div className="bg-teal-900 rounded 2xl h-full w-full md:p-10 px-4 py-8 flex flex-col">
            {isLoading && (
                <div className="w-full h-full flex items-center justify-center">
                    <Spinner className="text-teal-950/50 fill-white" />
                </div>
            )}
            {!isLoading && (
                <>
                    <div>
                        <span className="tracking-[-0.5px] block text-white">
                            Saldo total
                        </span>
                        <div className="flex items-center gap-2">
                            <strong
                                className={cn(
                                    "text-2xl tracking-[-1px] text-white",
                                    !areValuesVisible && "blur-md"
                                )}
                            >
                                {formatCurrency(currentBalance)}
                            </strong>
                            <button
                                onClick={toggleValuesVisibility}
                                className="h-8 flex items-center justify-center w-8"
                            >
                                <EyeIcon open={!areValuesVisible} />
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
                        {accounts.length === 0 && (
                            <>
                                <div slot="container-start" className="mb-4">
                                    <strong className="text-white tracking-[-1px] text-lg font-bold">
                                        Minhas contas
                                    </strong>
                                </div>

                                <button
                                    onClick={openNewAccountModal}
                                    className="mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col items-center justify-center gap-4 text-white"
                                >
                                    <div className="w-11 h-11 rounded-full border-2 border-dashed border-white flex justify-center items-center ">
                                        <PlusIcon className="w-6 h-6" />
                                    </div>
                                    <span className="tracking-[-0.5px] font-medium block w-32 text-center">
                                        Cadastre uma nova conta
                                    </span>
                                </button>
                            </>
                        )}
                        {accounts.length > 0 && (
                            <div>
                                <Swiper
                                    spaceBetween={16}
                                    slidesPerView={
                                        windowWidth >= 500 ? 2.1 : 1.2
                                    }
                                    onSlideChange={(swiper) => {
                                        setSliderState({
                                            isBeginnin: swiper.isBeginning,
                                            isEnd: swiper.isEnd,
                                        });
                                    }}
                                >
                                    <div
                                        slot="container-start"
                                        className="flex items-center justify-between mb-4"
                                    >
                                        <strong className="text-white tracking-[-1px] text-lg font-bold">
                                            Minhas contas
                                        </strong>
                                        <SliderNavigation
                                            isBeginning={sliderState.isBeginnin}
                                            isEnd={sliderState.isEnd}
                                        />
                                    </div>
                                    {accounts.map((account) => (
                                        <SwiperSlide>
                                            <AccountCard data={account} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
