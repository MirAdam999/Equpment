import { useURL } from "../../context/URL";
import { useToken } from "../../context/Token";
import { useEffect, useState } from "react";
import './ManageUsers.css'

const AddUser = (props) => {
    const { storedURL } = useURL()
    const { storedToken } = useToken()
    const [branches, setBranches] = useState([]);
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        email: '',
        default_branch: '',
        password: ''
    });
    const [selectedValue, setSelectedValue] = useState(null);
    const [sucsess, setSucsess] = useState(false)
    const [err, setErr] = useState(null)

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const result = await fetch(`${storedURL}/get_all_branches/`,
                    {
                        method: 'POST',
                        headers: {
                            "Authorization": `Token ${storedToken}`
                        },
                    });

                const data = await result.json();

                if ('all_branches' in data) {
                    setBranches(data.all_branches);
                } else if ('err' in data) {
                    console.error('Error:', data.err);
                } else {
                    console.error('Error: No data on unknown');
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchBranches();
    }, []);

    const addUser = async (e) => {
        e.preventDefault()
        try {
            const result = await fetch(`${storedURL}/add_user/`,
                {
                    method: 'POST',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: userData.username,
                        password: userData.password,
                        email: userData.email,
                        name: userData.name,
                        default_branch: selectedValue
                    })
                });

            const data = await result.json();

            if ('new_user' in data) {
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

    const close = () => {
        props.onClose();
        props.search();
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <div className="add-user-top">
                    <button className="close-btn" onClick={close}>X</button>
                    <h2>יצירת משתמש חדש</h2>
                </div>
                <div className="add-user-btm">
                    <form onSubmit={addUser}>
                        <div>
                            <label htmlFor="name">שם פרטי ומשפחה</label>
                            <input type="text" id="name" value={userData.name} onChange={handleInputChange} required></input>
                        </div>
                        <div>
                            <label htmlFor="username">שם משתמש</label>
                            <input type="text" id="username" value={userData.username} onChange={handleInputChange} required></input>
                        </div>
                        <div>
                            <label htmlFor="email">דוא"ל</label>
                            <input type="email" id="email" value={userData.email} onChange={handleInputChange} required></input>
                        </div>
                        <div>
                            <label htmlFor="default_branch">סניף ראשי</label>
                            <select value={selectedValue} onChange={handleSelectChange} id="default_branch">
                                <option value="">-בחר סניף-</option>
                                {Array.isArray(branches) && branches.map((branch) => (
                                    <option key={branch.id} value={branch.id}>
                                        {branch.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="password">סיסמה ראשונית</label>
                            <input type="text" id="password" value={userData.password} onChange={handleInputChange} required />
                        </div>

                        <button type="submit">יצירת משתמש</button>

                    </form>

                    {sucsess && <p className="sucsess-msg">משתמש נוצר בהצלחה</p>}
                    {err && <div className="err-msg">{err}</div>}
                </div>
            </div>
        </div>
    )
}

export default AddUser