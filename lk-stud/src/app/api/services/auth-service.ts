import httpClient from "./http-client";
import { LoginRequest, LoginResult, RefreshRequest, TokenPair } from '../models/Auth/index';

const AuthUrl:string = '/Auth';

export async function login(request: LoginRequest): Promise<LoginResult> {
    const response = await httpClient.post<LoginResult>(AuthUrl+'/login', request);
    const { accessToken, refreshToken } = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return response.data;
}

export const refresh = (data: RefreshRequest): Promise<TokenPair> => {
    return httpClient.post<TokenPair>(AuthUrl+'/refresh', data).then(res => res.data);
}

export async function logout() { 
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
}