export interface LoginCredentials {
    email: string,
    password: string,
    rememberMe?: boolean,
}

export interface RegisterCredentials {
    email: string;
    username: string;
    password: string;
}

export interface RegisterFormValues extends RegisterCredentials {
    confirmPassword: string;
}
