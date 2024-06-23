import { useToken } from "../context/Token"
import { useBranch } from "../context/BranchData";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './Header.css'

const Header = () => {
    const { isMasterUser, usersName } = useToken();
    const { branchName, nextOrder } = useBranch();
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="header">
            <div className='header-top'>
                <h1 onClick={() => handleNavigation('/')} >יציאה</h1>
                <h1>{usersName} ברוכים השבים</h1>
                <h2>סניף: {branchName}</h2>
                <h2>תאריך הזמנה הבאה: {nextOrder ? nextOrder : "טרם נקבע"}</h2>
            </div>
            <nav>
                {isMasterUser &&
                    <ul className="admin-navbar-ul">
                        <li onClick={() => handleNavigation('/managment_orders')}>הזמנות</li>
                        <li>ציוד</li>
                        <li>סניפים</li>
                        <li>ספקים</li>
                        <li>משתמשים</li>
                        <li>אזור אישי</li>
                    </ul>
                }
                {!isMasterUser &&
                    <ul className="user-navbar-ul">
                        <li>יצירת הזמנה + </li>
                        <li onClick={() => handleNavigation('/branch_orders')}>הזמנות</li>
                        <li>אזור אישי</li>
                        <li onClick={() => handleNavigation('/choose_branch')}>החלפת סניף</li>
                    </ul>
                }
            </nav>
        </div>
    )
}

export default Header