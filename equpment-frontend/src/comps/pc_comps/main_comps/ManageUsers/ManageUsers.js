import { useState } from 'react'
import { useURL } from "../../../context/URL";
import { useToken } from "../../../context/Token";
import AddUser from './AddUser';
import UpdatePopUp from './UpdatePopUp';
import './ManageUsers.css'
import Loading from '../../../loading/Loading'

const ManageUsers = () => {
    const { storedURL } = useURL()
    const { storedToken, usersID } = useToken()
    const [userType, setUserType] = useState('all');
    const [userStatus, setUserStatus] = useState('all');
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [found, setFound] = useState([]);
    const [popUpOpen, setPopUpOpen] = useState(false);
    const [updatePopUpOpen, setUpdatePopUpOpen] = useState([]);

    const openAddUser = () => {
        setPopUpOpen(true);
    };

    const closeAddUser = () => {
        setPopUpOpen(false);
    };

    const openUpdate = (user, action) => {
        setUpdatePopUpOpen([user, action]);
    };

    const closeUpdate = () => {
        setUpdatePopUpOpen([]);
    };

    const searchUser = async (e, preventDefault) => {
        if (preventDefault) {
            e.preventDefault();
        }
        setFound([])
        setSearched(true);
        setLoading(true);
        try {
            const result = await fetch(`${storedURL}/get_filtered_users/?user_type=${userType}&user_status=${userStatus}`,
                {
                    method: 'GET',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    }
                });

            const data = await result.json();

            if ('filtered_users' in data) {
                setFound(data.filtered_users);

            } else if ('err' in data) {
                console.error('Error:', data.err);
            } else {
                console.error('Error: unknown');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            setLoading(false);
        }
    }

    const makeAdmin = async (user) => {
        try {
            const result = await fetch(`${storedURL}/make_admin/${user.id}/`,
                {
                    method: 'PUT',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    }
                });

            const data = await result.json();

            if ('made_admin' in data) {
                openUpdate(user, 'קיבל הרשאות מנהל');
                searchUser();

            } else if ('err' in data) {
                console.error('Error:', data.err);
            } else {
                console.error('Error: unknown');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const revokeAdmin = async (user) => {
        try {
            const result = await fetch(`${storedURL}/revoke_admin/${user.id}/`,
                {
                    method: 'PUT',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    }
                });

            const data = await result.json();

            if ('revoked_admin' in data) {
                openUpdate(user, 'הוסרו הרשאות מנהל');
                searchUser();

            } else if ('err' in data) {
                console.error('Error:', data.err);
            } else {
                console.error('Error: unknown');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const activateUser = async (user) => {
        try {
            const result = await fetch(`${storedURL}/activate_user/${user.id}/`,
                {
                    method: 'PUT',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    }
                });

            const data = await result.json();

            if ('user_activated' in data) {
                openUpdate(user, 'הפך חזרה לפעיל');
                searchUser();

            } else if ('err' in data) {
                console.error('Error:', data.err);
            } else {
                console.error('Error: unknown');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const deactivateUser = async (user) => {
        try {
            const result = await fetch(`${storedURL}/disactivate_user/${user.id}/`,
                {
                    method: 'PUT',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    }
                });

            const data = await result.json();

            if ('user_disactivated' in data) {
                openUpdate(user, 'נהפך ללא פעיל');
                searchUser();

            } else if ('err' in data) {
                console.error('Error:', data.err);
            } else {
                console.error('Error: unknown');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    return (
        <div className='manage-users'>

            <h2>ניהול משתמשים</h2>

            {popUpOpen && <AddUser onClose={closeAddUser} search={searchUser} />}
            <div className='manage-users-top'>

                <button onClick={openAddUser} id='open-add-user'>יצירת משתמש +</button>

                <div className='manage-users-form-wrapper'>

                    <h3>הצגת משתמשים</h3>
                    <form className='manage-users-form'>

                        <div>
                            <label htmlFor="user-type">סוג משתמש</label>
                            <select id="user-type" value={userType} onChange={(e) => setUserType(e.target.value)}>
                                <option value="all">הצג הכל</option>
                                <option value="0">רגיל</option>
                                <option value="1">מנהל</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="user-status">סטטוס משתמש</label>
                            <select id="user-status" value={userStatus} onChange={(e) => setUserStatus(e.target.value)}>
                                <option value="all">הצג הכל</option>
                                <option value="1">פעיל</option>
                                <option value="0">לא פעיל</option>
                            </select>
                        </div>
                        <div><button type="submit" onClick={(e) => searchUser(e, true)}>הצג</button></div>
                    </form>

                </div>
            </div>

            <div className='manage-users-table-wrapper'>
                {loading && <div><Loading /></div>}
                {searched && found.length > 0 &&
                    <div>
                        <table className='users-found-table'>
                            <thead>
                                <th>מס' משתמש</th>
                                <th>שם</th>
                                <th>דוא"ל</th>
                                <th>סניף</th>
                                <th>סוג</th>
                                <th>סטטוס</th>
                                <th>פתיחה/סגירה הרשאות מנהל</th>
                                <th>הפך לפעיל/לא פעיל</th>
                            </thead>
                            <tbody>
                                {found.map((user) => (
                                    <tr>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.branch_name}</td>
                                        <td className={user.is_superuser === true ? 'admin-user' : ''}>{user.is_superuser === true ? 'מנהל' : 'רגיל'}</td>
                                        <td className={user.is_active === true ? 'active-user' : 'nonactive-user'}>{user.is_active === true ? 'פעיל' : 'לא פעיל'}</td>
                                        <td>{user.is_superuser === true ?
                                            <button onClick={() => revokeAdmin(user)} className='revoke-admin-user'
                                                disabled={user.id === usersID}>סגירת הרשות מנהל</button> :
                                            <button onClick={() => makeAdmin(user)} className='make-admin-user'
                                                disabled={user.is_active === false}>פתח הרשאות מנהל</button>}</td>

                                        <td>{user.is_active === true ?
                                            <button onClick={() => deactivateUser(user)} className='disable-user'
                                                disabled={user.id === usersID}>הפך ללא פעיל</button> :
                                            <button onClick={() => activateUser(user)}
                                                className='enable-user'>הפעל משתמש</button>}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}

                {searched && found.length === 0 && !loading && <div>לא נמצאו משתמשים העונים לדרישות החיפוש</div>}
            </div>

            {updatePopUpOpen.length > 0 && <UpdatePopUp user={updatePopUpOpen[0]} action={updatePopUpOpen[1]} onClose={closeUpdate} />}

        </div>
    )
}

export default ManageUsers