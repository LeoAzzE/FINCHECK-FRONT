import { z } from "zod";
import { useDashboard } from "../../components/DashBoardContext/useDashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { bankAccontsService } from "../../../../../app/services/bankAccountsService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";
import { useState } from "react";

const schema = z.object({
    name: z.string().min(1, "Nome da conta é obrigatório."),
    initialBalance: z.union([
        z.string().min(1, "Saldo inicial é obrigatório."),
        z.number(),
    ]),
    type: z.enum(["CHECKING", "INVESTMENT", "CASH"]),
    color: z.string().min(1, "Cor é obrigatória."),
});

type FormData = z.infer<typeof schema>;

export function useEditccountModalController() {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { isEditAccountModalOpen, closeEditAccountModal, accountBankEdited } =
        useDashboard();

    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
        control,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            color: accountBankEdited?.color,
            name: accountBankEdited?.name,
            type: accountBankEdited?.type,
            initialBalance: accountBankEdited?.initialBalance,
        },
    });

    const queryClient = useQueryClient();

    const { isPending, mutateAsync } = useMutation({
        mutationFn: bankAccontsService.update,
    });

    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            await mutateAsync({
                ...data,
                initialBalance: currencyStringToNumber(data.initialBalance),
                id: accountBankEdited!.id,
            });

            toast.success("A conta foi eitada com sucesso");
            closeEditAccountModal();
            queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
        } catch {
            toast.error("Erro ao salvar as alterações!");
        }
    });

    function handleOpenDeleteModal() {
        setIsDeleteModalOpen(true);
    }

    function handleCloseDeleteModal() {
        setIsDeleteModalOpen(false);
    }

    return {
        isEditAccountModalOpen,
        closeEditAccountModal,
        register,
        handleCloseDeleteModal,
        handleOpenDeleteModal,
        errors,
        handleSubmit,
        control,
        isPending,
        isDeleteModalOpen,
    };
}
