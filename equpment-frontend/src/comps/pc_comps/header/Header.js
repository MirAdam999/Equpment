import { useToken } from "../../context/Token"
import { useURL } from "../../context/URL";
import { useBranch } from "../../context/BranchData";
import { useNavigate, useLocation } from "react-router-dom";
import './Header.css'
import { RxExit } from "react-icons/rx";
import { GrHomeRounded } from "react-icons/gr";
import { IoCalendarClearOutline } from "react-icons/io5";

const Header = () => {
    const { storedURL } = useURL();
    const { storedToken, isMasterUser, usersName, setToken } = useToken();
    const { branchName, nextOrder } = useBranch();
    const navigate = useNavigate();
    const location = useLocation();

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
                <div className='header-top-r'>
                    <p onClick={logout} id="logout-btn">יציאה <RxExit className="icon" /></p>
                    <p id="welcome-back">ברוכים השבים {usersName}</p>
                </div>
                <div className='header-top-l'>
                    <p><span>{branchName}</span> סניף <GrHomeRounded className="icon" /></p>
                    {branchName !== 'הנהלה' && <p><span>{nextOrder ? nextOrder : "טרם נקבע"}</span>תאריך הזמנה הבאה <IoCalendarClearOutline className="icon" /></p>}
                </div>
            </div>
            <nav>
                {isMasterUser &&
                    <ul className="admin-navbar-ul">
                        <li id="dropdown-button"
                            className={location.pathname === '/managment_orders' ? 'active' : ''
                            }>הזמנות
                            <ul className="dropdown-ul">
                                <li onClick={() => handleNavigation('/managment_orders')} >ניהול הזמנות</li>
                                <li onClick={() => handleNavigation('/requres_attention')}>דורש התייחסות</li>
                                <li onClick={() => handleNavigation('/ship_orders')}>הנפקה לספקים</li>
                            </ul>
                        </li>
                        <li id="dropdown-button"
                            className={location.pathname === '/manage_equpment_categories' ? 'active' : ''
                            }>ציוד
                            <ul className="dropdown-ul">
                                <li onClick={() => handleNavigation('/manage_equpment_categories')}>קטגוריות ציוד</li>
                                <li onClick={() => handleNavigation('/manage_equpment_items')}>פריטי ציוד</li>
                            </ul>
                        </li>
                        <li onClick={() => handleNavigation('/manage_branches')}
                            className={location.pathname === '/manage_branches' ? 'active' : ''}>סניפים</li>
                        <li onClick={() => handleNavigation('/manage_suppliers')}
                            className={location.pathname === '/manage_suppliers' ? 'active' : ''}>ספקים</li>
                        <li onClick={() => handleNavigation('/manage_users')}
                            className={location.pathname === '/manage_users' ? 'active' : ''}>משתמשים</li>
                        <li onClick={() => handleNavigation('/my_profile')}
                            className={location.pathname === '/my_profile' ? 'active' : ''}>אזור אישי</li>
                    </ul>
                }
                {!isMasterUser &&
                    <ul className="user-navbar-ul">
                        <li onClick={() => handleNavigation('/create_order')}
                            className={location.pathname === '/create_order' ? 'active' : ''}>יצירת הזמנה + </li>
                        <li onClick={() => handleNavigation('/branch_orders')}
                            className={location.pathname === '/branch_orders' ? 'active' : ''}>הזמנות</li>
                        <li onClick={() => handleNavigation('/my_profile')}
                            className={location.pathname === '/my_profile' ? 'active' : ''}>אזור אישי</li>
                        <li onClick={() => handleNavigation('/choose_branch')}
                            className={location.pathname === '/choose_branch' ? 'active' : ''}>החלפת סניף</li>
                    </ul>
                }
            </nav>
        </div>
    )
}

export default Header