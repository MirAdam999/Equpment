import { useToken } from "../../context/Token";
import { useURL } from "../../context/URL";
import { useBranch } from "../../context/BranchData";
import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css'

const LogIn = () => {
    const { storedURL } = useURL();
    const { setToken, setName, setID, setIsMasterPermission } = useToken();
    const { setCurrentBranchName, setCurrentBranchID, setCurrentNextOrder } = useBranch();
    const [errorMessage, setErrorMessage] = useState('');
    const username = useRef();
    const password = useRef();
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await fetch(`${storedURL}/login/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username.current.value,
                    password: password.current.value
                })
            });

            const data = await result.json();
            if (!result.ok) {
                if (data.err) {
                    console.error('Error from backend:', data.err);
                }
                else if (data.wrong) {
                    setErrorMessage(data.wrong)
                }
            } else {
                const receivedToken = data.token;
                const receivedName = data.user.name;
                const receivedID = data.user.id;
                const recevedMasterPrem = data.user.is_admin;
                const recevedBranchName = data.user.default_branch_name;
                const recevedBranchID = data.user.default_branch_id;
                const recevedNextOrder = data.user.default_branch_next_order;
                setToken(receivedToken);
                setName(receivedName);
                setID(receivedID);
                setIsMasterPermission(recevedMasterPrem);
                setCurrentBranchName(recevedBranchName);
                setCurrentBranchID(recevedBranchID);
                setCurrentNextOrder(recevedNextOrder);

                if (recevedMasterPrem) {
                    handleNavigation('/requres_attention')
                } else {
                    handleNavigation('/branch_orders')
                }

                e.target.reset();
            }

        } catch (error) {
            console.error('Error during fetch:', error);
        }
    }

    return (
        <div className="login-page">
            <div className="login-inner">
                <h1>מערכת ניהול הזמנות ציוד </h1>
                <form onSubmit={handleLogin} className="login-form">
                    <h3>כניסה למערכת</h3>
                    <label htmlFor="username">שם משתמש</label>
                    <input type="text" id="username" ref={username} required /><br />
                    <label htmlFor="password">סיסמה</label>
                    <input type="password" id="password" ref={password} required /><br />

                    <button type="submit">התחבר</button>

                    {errorMessage &&
                        <p className="err-msg">{errorMessage}</p>}
                </form>
            </div>
        </div>
    )
}

export default LogIn