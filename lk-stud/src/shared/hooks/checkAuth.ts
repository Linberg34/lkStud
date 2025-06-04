import { useState, useEffect } from "react";
import { refresh } from "../../app/api/services/auth-service";

interface AuthInfo {
    isAuthenticated: boolean;
}

export function useAuth(): AuthInfo {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const refreshToken = localStorage.getItem("refreshToken");

            if (!refreshToken) {
                setIsAuthenticated(false);
                return;
            }

            try {
                await refresh({ refreshToken });
                setIsAuthenticated(true);
            } catch {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    return { isAuthenticated };
}