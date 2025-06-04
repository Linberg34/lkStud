import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class HttpClient {
    private axiosInstance: AxiosInstance;
    private refreshIntervalId: number | null = null;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json",
            },
        });

        this.axiosInstance.interceptors.request.use((config) => {
            const token = localStorage.getItem("accessToken");
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        this.axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (
                    error.response?.status === 401 &&
                    !originalRequest._retry &&
                    localStorage.getItem("refreshToken")
                ) {
                    originalRequest._retry = true;
                    try {
                        const refreshToken = localStorage.getItem("refreshToken");
                        const refreshResponse = await axios.post<{
                            accessToken: string;
                            refreshToken: string;
                        }>(
                            "https://lk-stud.api.kreosoft.space/api/auth/refresh",
                            { refreshToken }
                        );
                        const { accessToken, refreshToken: newRefreshToken } =
                            refreshResponse.data;

                        localStorage.setItem("accessToken", accessToken);
                        localStorage.setItem("refreshToken", newRefreshToken);

                        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                        return this.axiosInstance(originalRequest);
                    } catch (refreshError) {
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );

        this.startTokenRefresh();
    }

    private startTokenRefresh() {
        this.refreshIntervalId = window.setInterval(async () => {
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
                try {
                    const refreshResponse = await axios.post<{
                        accessToken: string;
                        refreshToken: string;
                    }>(
                        "https://lk-stud.api.kreosoft.space/api/auth/refresh",
                        { refreshToken }
                    );
                    const { accessToken, refreshToken: newRefreshToken } =
                        refreshResponse.data;
                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", newRefreshToken);
                } catch (error) {
                    console.error("Proactive refresh failed:", error);
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    if (this.refreshIntervalId) {
                        window.clearInterval(this.refreshIntervalId);
                        this.refreshIntervalId = null;
                    }
                }
            }
        }, 45000);
    }

    get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.get<T>(url, config);
    }

    post<T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this.axiosInstance.post<T>(url, data, config);
    }

    put<T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this.axiosInstance.put<T>(url, data, config);
    }

    delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.delete<T>(url, config);
    }

    getBlob(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<Blob>> {
        return this.axiosInstance.get<Blob>(url, {
            ...config,
            responseType: "blob",
        });
    }
}

const baseURL = "https://lk-stud.api.kreosoft.space/api";
const httpClient = new HttpClient(baseURL);

export default httpClient;
