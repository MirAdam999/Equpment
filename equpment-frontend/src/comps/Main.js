import { Outlet } from 'react-router-dom';
import Header from './pc_comps/header/Header';
import { useToken } from './context/Token';
import { useEffect } from 'react';

const Main = () => {
    const { storedToken } = useToken();

    useEffect(() => { }, [storedToken])

    return (
        <div>
            {storedToken && <Header />}
            <Outlet />
        </div>
    )
}

export default Main