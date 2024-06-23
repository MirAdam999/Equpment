import { Outlet } from 'react-router-dom';
import Header from '../header/Header'
import { useToken } from "../context/Token"

const Main = () => {
    const { storedToken } = useToken();

    return (
        <div>
            {storedToken && <Header />}
            <Outlet />
        </div>
    )
}

export default Main