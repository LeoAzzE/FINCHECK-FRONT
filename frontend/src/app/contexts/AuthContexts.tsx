import { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/usersService";
import toast from "react-hot-toast";
import { LaunchScreen } from "../../view/components/LaunchScreen";
import { User } from "../entities/User";

interface AuthContextValue {
    signedIn: boolean;
    user: User | undefined;
    signin(acessToken: string): void;
    signout(): void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [signedIn, setSignedIn] = useState<boolean>(() => {
        const storageAcessToken = localStorage.getItem(
            localStorageKeys.ACESS_TOKEN
        );

        return !!storageAcessToken;
    });

    const { isError, isFetching, isSuccess, data } = useQuery({
        queryKey: ["users", "me"],
        queryFn: () => usersService.me(),
        enabled: signedIn,
        staleTime: Infinity,
    });

    const signin = useCallback((accessToken: string) => {
        localStorage.setItem(localStorageKeys.ACESS_TOKEN, accessToken);

        setSignedIn(true);
    }, []);

    const signout = useCallback(() => {
        localStorage.removeItem(localStorageKeys.ACESS_TOKEN);
        setSignedIn(false);
    }, []);

    useEffect(() => {
        if (isError) {
            toast.error("Sua sessão expirou");
            signout();
        }
    }, [isError, signout]);

    return (
        <AuthContext.Provider
            value={{
                signedIn: isSuccess && signedIn,
                signin,
                signout,
                user: data,
            }}
        >
            <LaunchScreen isLoading={isFetching} />
            {!isFetching && children}
        </AuthContext.Provider>
    );
}
