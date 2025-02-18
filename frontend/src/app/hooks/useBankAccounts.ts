import { useQuery } from "@tanstack/react-query";
import { bankAccontsService } from "../services/bankAccountsService/index";

export function useBankAccounts() {
    const { data, isFetching } = useQuery({
        queryKey: ["bankAccounts"],
        queryFn: bankAccontsService.getAll,
        staleTime: Infinity,
    });

    return { accounts: data ?? [], isFetching };
}
