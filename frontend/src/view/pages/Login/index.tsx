import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useLoginController } from "./useLoginController";

export function Login() {
    const { handleSubmit, register, errors } = useLoginController();
    return (
        <>
            <header className="flex flex-col items-center gap-4 text-center">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tighter-[-1px]">
                    Entre em sua conta
                </h1>
                <p className="space-x-2">
                    <span className="text-gray-700 tracking-tighter-[-0.5px]">
                        Novo por aqui ?
                    </span>
                    <Link
                        className=" tracking-tighter-[-0.5px] font-medium text-teal-900"
                        to="/register"
                    >
                        Crie uma conta
                    </Link>
                </p>
            </header>
            <form
                onSubmit={handleSubmit}
                className="mt-[60px] flex flex-col gap-4"
            >
                <Input
                    {...register("email")}
                    error={errors.email?.message}
                    type="email"
                    placeholder="E-mail"
                ></Input>
                <Input
                    {...register("password")}
                    error={errors.password?.message}
                    type="password"
                    placeholder="Senha"
                ></Input>
                <Button type="submit" className="mt-2">
                    Entrar
                </Button>
            </form>
        </>
    );
}
