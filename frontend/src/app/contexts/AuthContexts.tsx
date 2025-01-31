import { createContext, useCallback, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";

interface AuthContextValue {
    signedIn: boolean;
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

    const signin = useCallback((acessToken: string) => {
        localStorage.setItem(localStorageKeys.ACESS_TOKEN, acessToken);
        setSignedIn(true);
    }, []);

    const signout = useCallback(() => {
        localStorage.removeItem(localStorageKeys.ACESS_TOKEN);
        setSignedIn(false);
    }, []);

    return (
        <AuthContext.Provider value={{ signedIn, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}
