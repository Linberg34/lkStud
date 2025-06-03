import { useState, useEffect } from "react";

interface AuthInfo {
    isAuthenticated: boolean;
}

export function useAuth(): AuthInfo {
    const [auth, setAuth] = useState<AuthInfo>({
        isAuthenticated: false,
    });


    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            setAuth({ isAuthenticated: true });
        }
        setAuth({ isAuthenticated: false });
    }, []);

    return auth;
}
