import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useRegisterController } from "./useRegisterController";

export function Register() {
    const { errors, handleSubmit, register, isPending } =
        useRegisterController();
    return (
        <>
            <header className="flex flex-col items-center gap-4 text-center">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tighter-[-1px]">
                    Crie sua Conta
                </h1>
                <p className="space-x-2">
                    <span className="text-gray-700 tracking-tighter-[-0.5px]">
                        Já possui uma conta ?
                    </span>
                    <Link
                        className=" tracking-tighter-[-0.5px] font-medium text-teal-900"
                        to="/login"
                    >
                        Fazer Login
                    </Link>
                </p>
            </header>
            <form
                onSubmit={handleSubmit}
                className="mt-[60px] flex flex-col gap-4"
            >
                <Input
                    {...register("name")}
                    error={errors.name?.message}
                    placeholder="Nome"
                ></Input>
                <Input
                    {...register("email")}
                    error={errors.email?.message}
                    type="email"
                    placeholder="E-mail"
                ></Input>
                <Input
                    {...register("password")}
                    type="password"
                    error={errors.password?.message}
                    placeholder="Senha"
                ></Input>
                <Button type="submit" className="mt-2" isLoading={isPending}>
                    Criar conta
                </Button>
            </form>
        </>
    );
}
