import { useState } from "react";
import { useURL } from "../../../context/URL";
import { useToken } from "../../../context/Token";
import './MyProfile.css'

const ChangeProfile = (props) => {
    const user = props.user
    const branches = props.branches
    const [userData, setUserData] = useState({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        default_branch: user.default_branch,
        password: ''
    });
    const [selectedValue, setSelectedValue] = useState(user.default_branch);
    const { storedURL } = useURL()
    const { storedToken } = useToken()
    const [sucsess, setSucsess] = useState(false)
    const [err, setErr] = useState(null)

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const result = await fetch(`${storedURL}/update_profile/`,
                {
                    method: 'PUT',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        password: userData.password,
                        username: userData.username,
                        email: userData.email,
                        name: userData.name,
                        default_branch: selectedValue
                    })
                });

            const data = await result.json();

            if ('updated' in data) {
                setSucsess(true);
            } else if ('wrong' in data) {
                setErr(data.wrong)
            } else if ('err' in data) {
                console.error('Error:', data.err);
            } else {
                console.error('Error: unknown');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.id]: e.target.value,
        });
    };

    return (
        <div className='change-profile'>
            <h2>עדכון נתוני משתמש</h2>
            <form onSubmit={updateUser} className='change-profile-form'>
                <div>
                    <label htmlFor="id">מספר משתמש</label><br />
                    <input type="tex" id="id" value={userData.id} disabled></input><br />
                </div>
                <div>
                    <label htmlFor="name">שם פרטי ומשפחה</label><br />
                    <input type="text" id="name" value={userData.name} onChange={handleInputChange} required></input><br />
                </div>
                <div>
                    <label htmlFor="username">שם משתמש</label><br />
                    <input type="text" id="username" value={userData.username} onChange={handleInputChange} required></input><br />
                </div>
                <div>
                    <label htmlFor="email">דוא"ל</label><br />
                    <input type="email" id="email" value={userData.email} onChange={handleInputChange} required></input><br />
                </div>
                <div>
                    <label htmlFor="default_branch">סניף ראשי</label><br />
                    <select value={selectedValue} onChange={handleSelectChange} id="default_branch">
                        <option value="">-בחר סניף-</option>
                        {Array.isArray(branches) && branches.map((branch) => (
                            <option key={branch.id} value={branch.id}>
                                {branch.name}
                            </option>
                        ))}
                    </select><br />
                </div>
                <div>
                    <label htmlFor="password" id='input-pass-for-update-label'>לעדכון נתוני המשתמש, אנא הזן סיסמה</label><br />
                    <input type="password" id="password" value={userData.password} placeholder="הזן סיסמה"
                        required onChange={handleInputChange} /><br />
                </div>
                <button type="submit" className="submit-button">עדכן נתוני משתמש</button>
            </form>
            {sucsess && <div className="sucsess-msg">נתונים עודכנו בהצלחה</div>}
            {err && <div className="err-msg">{err}</div>}
        </div>
    )
}

export default ChangeProfile