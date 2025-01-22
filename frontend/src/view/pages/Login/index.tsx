import { Link } from "react-router-dom";
import { Input } from "../../components/input";

export function Login() {
    return (
        <div>
            <header className="flex flex-col items-center gap-4">
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
            <form className="mt-[60px] flex flex-col gap-4">
                <Input type="email"></Input>
                <Input type="password"></Input>
                <button className="mt-2" type="submit">
                    Entrar
                </button>
            </form>
        </div>
    );
}
