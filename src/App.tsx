import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/layout/Layout'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                {/*<Route path="exercises/" element={<Exercises />} />*/}
            </Route>
            {/*<Route element={<CenteredLayout />}>*/}
            {/*    <Route path="login" element={<Login />} />*/}
            {/*    <Route path="register" element={<Register />} />*/}
            {/*    <Route path="*" element={<NotFound />} />*/}
            {/*</Route>*/}
        </Routes>
    )
}

export default App
