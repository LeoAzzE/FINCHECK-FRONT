import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { SigninParams } from "../../../app/services/authService/signin";
import { authService } from "../../../app/services/authService";
import toast from "react-hot-toast";
import { useAuth } from "../../../app/hooks/useAuth";

const schema = z.object({
    email: z
        .string()
        .nonempty("E-mail é obrigatório")
        .email("Informe um e-mail válido"),
    password: z
        .string()
        .nonempty("Senha é obrigatória")
        .min(8, "Senha deve conter pelo menos 8 digitos"),
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const { isPending, mutateAsync } = useMutation({
        mutationFn: async (data: SigninParams) => {
            return authService.signin(data);
        },
    });

    const { signin } = useAuth();

    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            const {acessToken} = await mutateAsync(data);
            signin(acessToken);
        } catch {
            toast.error("Credenciais inválidas!");
        }
    });

    return { handleSubmit, register, errors, isPending };
}
