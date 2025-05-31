import {useState} from "react"
import type {RegisterCredentials, RegisterFormValues} from "../../types/authentication"
import api from "../../lib/axios"
import {useAuth} from "../../lib/auth-context"
import {Link, Navigate} from "react-router-dom"
import toast from "react-hot-toast"
import {PiUserCirclePlus} from "react-icons/pi"
import Loader from "../../components/layout/Loader"
import {MdOutlineEmail} from "react-icons/md"
import {TbLock, TbLockCheck, TbUser} from "react-icons/tb"
import {AxiosError} from "axios";

export default function Register() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
        confirmPassword: ""
    } as RegisterFormValues)
    const {token, setToken} = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevFormData => ({...prevFormData, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            if (formData.password !== formData.confirmPassword) {
                toast.error("Passwords don't match!")
                return;
            }
            const response = await api.post('/users/register', {
                email: formData.email,
                password: formData.password,
                username: formData.username
            } as RegisterCredentials);
            if (response?.status === 201) {
                toast.success("Registered successfully!")
                const {token} = response.data.data;
                setToken(token);
            }
        } catch (err) {
            toast.error(err instanceof AxiosError && err?.response?.data?.message)
        } finally {
            setIsLoading(false)
        }
    }

    if (token) {
        return <Navigate to={"/"}/>
    }

    return (
        <div className="mt-8 sm:mt-16 md:mt-20 text-center w-full">
            <h1 className="mb-10 text-4xl sm:text-5xl mx-4 font-bold inline-block border-b-4 border-primary">Create a
                New Account</h1>
            <div
                className="max-w-[400px] mx-4 xs:ml-auto xs:mr-auto flex flex-col items-center bg-white rounded-lg shadow-lg py-2 px-10">
                <PiUserCirclePlus size={100} className="text-gray-500 my-8"/>
                <form onSubmit={handleSubmit} className="text-left">
                    <div className="bg-gray-100 w-full px-3 py-1 mb-2 flex rounded-md items-center text-lg">
                        <label htmlFor="email" className="pr-2 mr-2 border-r border-gray-500">
                            <MdOutlineEmail size={24} className="text-gray-500"/>
                        </label>
                        <input type="email" id="email" name="email" required placeholder="E-mail address"
                               value={formData.email} onChange={handleChange}
                               className="px-2 py-1 focus:outline-0 bg-transparent flex-1"
                        />
                    </div>
                    <div className="bg-gray-100 w-full px-3 py-1 mb-2 flex rounded-md items-center text-lg">
                        <label htmlFor="username" className="pr-2 mr-2 border-r border-gray-500">
                            <TbUser size={24} className="text-gray-500"/>
                        </label>
                        <input type="text" id="username" name="username" required placeholder="Username"
                               value={formData.username} onChange={handleChange}
                               className="px-2 py-1 focus:outline-0 bg-transparent flex-1"
                        />
                    </div>
                    <div className="bg-gray-100 w-full px-3 py-1 mb-2 flex rounded-md items-center text-lg">
                        <label htmlFor="password" className="pr-2 mr-2 border-r border-gray-500">
                            <TbLock size={24} className="text-gray-500"/>
                        </label>
                        <input type="password" id="password" name="password" required placeholder="Password"
                               value={formData.password} onChange={handleChange}
                               className="px-2 py-1 focus:outline-0 bg-transparent flex-1"
                        />
                    </div>
                    <div className="bg-gray-100 w-full px-3 py-1 mb-10 flex rounded-md items-center text-lg">
                        <label htmlFor="confirmPassword" className="pr-2 mr-2 border-r border-gray-500">
                            <TbLockCheck size={24} className="text-gray-500"/>
                        </label>
                        <input type="password" id="confirmPassword" name="confirmPassword" required
                               placeholder="Confirm Password"
                               value={formData.confirmPassword} onChange={handleChange}
                               className="px-2 py-1 focus:outline-0 bg-transparent flex-1"
                        />
                    </div>
                    <div className="flex w-full gap-3">
                        <button
                            className="py-2 flex-1 text-lg rounded-md bg-primary font-bold hover:bg-opacity-80 duration-200 text-white">
                            Register
                        </button>
                        <Loader show={isLoading}/>
                    </div>
                    <p className="mt-4 text-center text-sm">
                        Already registered?&nbsp;
                        <Link to={"/login"} className="font-bold text-primary">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}