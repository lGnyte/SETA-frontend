export interface LoginCredentials {
    credential: string,
    password: string,
    remember_me: boolean,
}

export interface RegisterCredentials {
    email: string;
    username: string;
    password: string;
}

export interface RegisterFormValues extends RegisterCredentials {
    confirmPassword: string;
}
