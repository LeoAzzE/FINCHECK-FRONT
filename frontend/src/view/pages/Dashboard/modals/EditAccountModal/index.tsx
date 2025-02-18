import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { ColorsDropdownInput } from "../../../../components/ColorDropdownInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/inputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useEditccountModalController } from "./useEditAccountModalController";
import { TrashIcon } from "../../../../components/icons/TrashIcon";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal";

export function EditAccountModal() {
    const {
        isEditAccountModalOpen,
        closeEditAccountModal,
        errors,
        isDeleteModalOpen,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleSubmit,
        register,
        control,
        isPending,
        handleDeleteAccount,
        isLoadingDelete,
    } = useEditccountModalController();

    if (isDeleteModalOpen) {
        return (
            <ConfirmDeleteModal
                isLoading={isLoadingDelete}
                onConfirm={handleDeleteAccount}
                onClose={handleCloseDeleteModal}
                title="Tem certeza que deseja excluir esta conta?"
                description="Ao excluir a conta, também serão excluídos todos os registros de receita ee despesas relacionados."
            />
        );
    }

    return (
        <Modal
            title="Editar Conta"
            open={isEditAccountModalOpen}
            onClose={closeEditAccountModal}
            rightAction={
                <button onClick={handleOpenDeleteModal}>
                    <TrashIcon className="w-6 h-6 text-red-900" />
                </button>
            }
        >
            <form onSubmit={handleSubmit}>
                <div>
                    <span className="text-gray-600 tracking-[-0.5px] text-xs">
                        Saldo Inicial
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 tracking-[-0.5px] text-lg">
                            R$
                        </span>
                        <Controller
                            name="initialBalance"
                            control={control}
                            defaultValue="0"
                            render={({ field: { onChange, value } }) => (
                                <InputCurrency
                                    error={errors.initialBalance?.message}
                                    onChange={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-4">
                    <Input
                        {...register("name")}
                        error={errors.name?.message}
                        type="text"
                        name="name"
                        placeholder="Nome da Conta"
                    />
                    <Controller
                        control={control}
                        name="type"
                        defaultValue="CHECKING"
                        render={({ field: { onChange, value } }) => (
                            <Select
                                placeholder="Tipo"
                                onChange={onChange}
                                value={value}
                                error={errors.type?.message}
                                options={[
                                    {
                                        value: "CHECKING",
                                        label: "Conta corrente",
                                    },
                                    {
                                        value: "INVESTMENT",
                                        label: "Investimentos",
                                    },
                                    {
                                        value: "CASH",
                                        label: "Dinheiro Físico",
                                    },
                                ]}
                            />
                        )}
                    />

                    <Controller
                        name="color"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <ColorsDropdownInput
                                error={errors.color?.message}
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full mt-6"
                    isLoading={isPending}
                >
                    Criar
                </Button>
            </form>
        </Modal>
    );
}
