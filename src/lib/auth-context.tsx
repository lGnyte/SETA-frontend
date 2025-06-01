import axios from "axios";

import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import api from "./axios";
import toast from "react-hot-toast";
import PageLoaderSpinner from "../components/layout/PageLoaderSpinner";
import type {UserType} from '../types/user';

interface AuthContextType {
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void;
    userId: number | null;
    username: string | null;
    email: string | null;
    balance: number;
}

type AuthProviderProps = {
    children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken_] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState<UserType>({
        userId: null,
        username: null,
        email: null
    });
    const [balance, setBalance] = useState(0);

    const setToken = (newToken: string) => {
        setToken_(newToken);
    };

    const logout = () => {
        setToken_(null);
        toast.success("You signed out.")
    }

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem('token', token);
            (async () => {
                try {
                    const response = await api.get("/users/me", {
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    });
                    const balanceResponse = await api.get("/wallets", {
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    })
                    if (response.status === 200 && response.data.success &&
                    balanceResponse.status === 200) {
                        const { id, email, username } = response.data.data;
                        setUser({
                            userId: id,
                            email,
                            username
                        });
                        const {amount} = balanceResponse.data;
                        console.log(amount);
                        setBalance(amount);
                    } else {
                        setToken_(null);
                    }
                } catch (err) {
                    console.error(err);
                    setToken_(null);
                    toast.error("Could not retreive user data.")
                }
            })();
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token');
            setUser({ userId: 0, username: "", email: "" })
        }
    }, [token]);



    if (user.userId === null) {
        return (
            <PageLoaderSpinner />
        )
    }

    return (
    <AuthContext.Provider value={{ token, setToken, logout, userId: user.userId, username: user.username, email: user.email, balance: balance }}>
        {children}
    </AuthContext.Provider>
)
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;