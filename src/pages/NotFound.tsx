import { Link } from "react-router-dom";

export default function NotFound(){
    return (
        <div className="mt-20 text-center w-full px-4">
            <h1 className="text-9xl font-title font-extrabold">404</h1>
            <p className="text-5xl font-bold mb-8">Oops! Page not found.</p>
            <p className="text-2xl mb-8">The page you are looking for might have been removed, or is temporarily unavailable.</p>
            <div className="flex justify-center w-full font-bold xs:text-xl sm:text-2xl">
                <button onClick={() => window.history.back()} className="border-primary border-2 text-primary rounded-md hover:bg-primary hover:bg-opacity-20 duration-200 px-3 xs:px-6 py-3 mr-4">&lt; Go Back</button>
                <Link to={'/'} className="bg-primary rounded-md hover:bg-opacity-80 duration-200 border-2 border-primary px-3 xs:px-6 py-3 text-white">Return Home</Link>
            </div>
        </div>
    )
}
