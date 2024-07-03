import { useToken } from "../context/Token"
import { useURL } from "../context/URL";
import { useBranch } from "../context/BranchData";
import { useNavigate } from "react-router-dom";
import './Header.css'

const Header = () => {
    const { storedURL } = useURL();
    const { storedToken, isMasterUser, usersName, setToken } = useToken();
    const { branchName, nextOrder } = useBranch();
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const logout = async () => {
        try {
            const result = await fetch(`${storedURL}/logout/${storedToken}/`,
                {
                    method: 'DELETE',
                });

            if (result.status === 204) {
                handleNavigation('/');
                setToken(null);
            } else {
                const data = await result.json();
                if ('err' in data) {
                    console.error('Error:', data.err);
                } else {
                    console.error('Unexpected error:', data);
                }
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="header">
            <div className='header-top'>
                <h1 onClick={logout} >יציאה</h1>
                <h1>{usersName} ברוכים השבים</h1>
                <h2>סניף: {branchName}</h2>
                {branchName !== 'הנהלה' && <h2>תאריך הזמנה הבאה: {nextOrder ? nextOrder : "טרם נקבע"}</h2>}
            </div>
            <nav>
                {isMasterUser &&
                    <ul className="admin-navbar-ul">
                        <li onClick={() => handleNavigation('/managment_orders')}>הזמנות</li>
                        <li>ציוד
                            <ul className="dropdown-ul">
                                <li onClick={() => handleNavigation('/manage_equpment_categories')}>קטגוריות ציוד</li>
                                <li onClick={() => handleNavigation('/manage_equpment_items')}>פריטי ציוד</li>
                            </ul>
                        </li>
                        <li onClick={() => handleNavigation('/manage_branches')}>סניפים</li>
                        <li onClick={() => handleNavigation('/manage_suppliers')}>ספקים</li>
                        <li onClick={() => handleNavigation('/manage_users')}>משתמשים</li>
                        <li onClick={() => handleNavigation('/my_profile')}>אזור אישי</li>
                    </ul>
                }
                {!isMasterUser &&
                    <ul className="user-navbar-ul">
                        <li onClick={() => handleNavigation('/create_order')}>יצירת הזמנה + </li>
                        <li onClick={() => handleNavigation('/branch_orders')}>הזמנות</li>
                        <li onClick={() => handleNavigation('/my_profile')}>אזור אישי</li>
                        <li onClick={() => handleNavigation('/choose_branch')}>החלפת סניף</li>
                    </ul>
                }
            </nav>
        </div>
    )
}

export default Header