
const API_URL = import.meta.env.VITE_API_URL;

interface RegisterData {
    userName: string;
    userEmail: string;
    password: string;
}

interface LoginData {
  userEmail: string;
  password: string;
}

export interface UserResponse {
  userId: number;
  userName: string;
  userEmail: string;
}

interface ApiError {
    message?: string;
}

function obterCsrfToken(): string | null {
    const cookie = document.cookie.split(";").find((item) => item.startsWith("XSRF-TOKEN="));

    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
}

async function obterNovoCsrfToken(): Promise<string> {
    const response = await fetch(`${API_URL}/auth/csrf`, {
        method:'GET',
        credentials: 'include',

    });

    if(!response.ok) {
        throw new Error("Não foi possível obter o token de segurança.");
    }

    const token = obterCsrfToken();

    if(!token) {
        throw new Error("Token CSRF não encontrado.");
    }

    return token;
}


export async function userRegister(data: RegisterData): Promise<void> {
    const csrfToken = await obterNovoCsrfToken();

    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers:{
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": csrfToken,
        },

        body: JSON.stringify(data),

    });

    if(!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({}));

        throw new Error(
            errorData.message || "Não foi possível realizar o cadastro."
        );
    }
}


export async function loginUser(dados: LoginData): Promise<UserResponse> {
    const csrfToken = await obterNovoCsrfToken();

    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify(dados),
    });

    if (!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({}));

        throw new Error(
        errorData.message || "Não foi possível realizar o login."
        );
    }

    const user: UserResponse = await response.json();

    return user;
}