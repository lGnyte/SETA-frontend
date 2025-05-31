import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/layout/Layout'
import Login from "./pages/User/Login.tsx";
import CenteredLayout from "./components/layout/CenteredLayout.tsx";
import Register from "./pages/User/Register.tsx";
import NotFound from "./pages/NotFound.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                {/*<Route path="exercises/" element={<Exercises />} />*/}
            </Route>
            <Route element={<CenteredLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default App
