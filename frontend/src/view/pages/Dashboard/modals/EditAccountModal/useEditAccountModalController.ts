import { z } from "zod";
import { useDashboard } from "../../components/DashBoardContext/useDashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { bankAccontsService } from "../../../../../app/services/bankAccountsService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";

const schema = z.object({
    name: z.string().min(1, "Nome da conta é obrigatório."),
    initialBalance: z.string().min(1, "Saldo inicial é obrigatório."),
    type: z.enum(["CHECKING", "INVESTMENT", "CASH"]),
    color: z.string().min(1, "Cor é obrigatória."),
});

type FormData = z.infer<typeof schema>;

export function useEditccountModalController() {
    const { isEditAccountModalOpen, closeEditAccountModal } = useDashboard();

    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const queryClient = useQueryClient();

    const { isPending, mutateAsync } = useMutation({
        mutationFn: bankAccontsService.create,
    });

    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            await mutateAsync({
                ...data,
                initialBalance: currencyStringToNumber(data.initialBalance),
            });

            toast.success("Conta cadastrada com sucesso!");
            closeEditAccountModal();
            reset();
            queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
        } catch {
            toast.error("Erro ao cadastrar a conta!");
        }
    });

    return {
        isEditAccountModalOpen,
        closeEditAccountModal,
        register,
        errors,
        handleSubmit,
        control,
        isPending,
    };
}
