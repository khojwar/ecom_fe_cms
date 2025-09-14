import {BrowserRouter, Route, Routes} from 'react-router'
import LoginForm from '../pages/Login';

const RouterConfig = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginForm />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouterConfig;