import { useState } from "react"
import type {LoginCredentials} from '../../types/authentication'
import api from "../../lib/axios"
import { useAuth } from "../../lib/auth-context"
import { Link, Navigate } from "react-router-dom"
import toast from "react-hot-toast"
import Loader from "../../components/layout/Loader"
import { FaLock, FaRegUserCircle, FaUser } from "react-icons/fa"

export default function Login() {
    const [formData, setFormData] = useState({
        credential: "",
        password: "",
        remember_me: false
    } as LoginCredentials)
    const { token, setToken } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevFormData: LoginCredentials) => {
            if(e.target.name === "remember_me") {
                return { ...prevFormData, [e.target.name]: e.target.checked }
            }
            return { ...prevFormData, [e.target.name]: e.target.value }
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await api.post('/login', formData)
            if (response?.status === 200) {
                const { data } = response
                setToken(data.content)
                toast.success("Logged in successfully!")
            }
        } catch(err) {
            toast.error("Error logging in: " + (err instanceof Error && err.message))
        } finally {
            setIsLoading(false)
        }
    }

    if(token) {
        return <Navigate to={"/"} />
    }

    return (
        <div className="mt-8 sm:mt-16 md:mt-20 text-center w-full">
            <h1 className="mb-10 text-4xl sm:text-5xl mx-4 font-bold inline-block border-b-4 border-primary">Login to Your Account</h1>
            <div className="max-w-[400px] flex flex-col items-center mx-4 xs:mr-auto xs:ml-auto bg-white rounded-lg shadow-lg py-2 px-10">
                <FaRegUserCircle size={92} className="text-gray-500 my-8" />
                <form onSubmit={handleSubmit} className="text-left">
                    <div className="bg-gray-100 w-full px-3 py-1 mb-2 flex rounded-md items-center text-lg">
                        <label htmlFor="credential" className="pr-2 mr-2 border-r border-gray-500">
                            <FaUser size={20} className="text-gray-500" />
                        </label>
                        <input type="text" id="credential" name="credential" required placeholder="E-mail / Username"
                               value={formData.credential} onChange={handleChange}
                               className="px-2 py-1 focus:outline-0 bg-transparent flex-1"
                        />
                    </div>
                    <div className="bg-gray-100 w-full px-3 py-1 mb-2 flex rounded-md items-center text-lg">
                        <label htmlFor="password" className="pr-2 mr-2 border-r border-gray-500">
                            <FaLock size={20} className="text-gray-500" />
                        </label>
                        <input type="password" id="password" name="password" required placeholder="Password"
                               value={formData.password} onChange={handleChange}
                               className="px-2 py-1 focus:outline-0 bg-transparent flex-1"
                        />
                    </div>
                    <label htmlFor="remember_me" className="cursor-pointer flex items-center mb-10">
                        <input type="checkbox" id="remember_me" name="remember_me" checked={formData.remember_me} onChange={handleChange} className="accent-primary" />
                        <span className="ml-2">Remember Me?</span>
                    </label>
                    <div className="flex w-full gap-3">
                        <button className="py-2 flex-1 text-lg rounded-md bg-primary font-bold hover:bg-opacity-80 duration-200 text-white">
                            Login
                        </button>
                        <Loader show={isLoading} />
                    </div>
                    <p className="mt-4 text-center text-sm">
                        Don't have an account?&nbsp;
                        <Link to={"/register"} className="font-bold text-primary">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
