import './MyProfile.css'
import { useState, useEffect } from "react";
import { useURL } from "../../context/URL";
import { useToken } from "../../context/Token";

const ChangePass = () => {
    const [userData, setUserData] = useState({
        old_password: '',
        new_password: '',
        repeat_pass: ''
    });
    const { storedURL } = useURL()
    const { storedToken } = useToken()
    const [sucsess, setSucsess] = useState(false)
    const [err, setErr] = useState(null)

    useEffect(() => {
        let successTimeout, errorTimeout;

        if (sucsess) {
            successTimeout = setTimeout(() => {
                setSucsess(false);
            }, 10000);
        }

        if (err) {
            errorTimeout = setTimeout(() => {
                setErr(false);
            }, 10000);
        }

        return () => {
            clearTimeout(successTimeout);
            clearTimeout(errorTimeout);
        };
    }, [sucsess, err]);

    const updatePass = async (e) => {
        e.preventDefault();

        if (userData.new_password !== userData.repeat_pass) {
            setErr('סיסמאות לא תואמות');
            return;
        }

        try {
            const result = await fetch(`${storedURL}/update_password/`,
                {
                    method: 'PUT',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        old_password: userData.old_password,
                        new_password: userData.new_password
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


    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.id]: e.target.value,
        });
    };

    return (
        <div>
            <h2>שינוי סיסמה</h2>
            <form onSubmit={updatePass}>
                <label htmlFor="old_password">סיסמה ישנה</label><br />
                <input type="password" id="old_password" value={userData.old_password} placeholder='הזן סימה ישנה'
                    required onChange={handleInputChange} /><br />

                <label htmlFor="new_password">סיסמה חדשה</label><br />
                <input type="password" id="new_password" value={userData.new_password} placeholder='הזן סיסמה חדשה'
                    required onChange={handleInputChange} /><br />

                <label htmlFor="repeat_pass">הזן סיסמה חדשה שנית</label><br />
                <input type="password" id="repeat_pass" value={userData.repeat_pass} placeholder='הזן סיסמה חדשה שנית'
                    required onChange={handleInputChange} /><br />

                <button type="submit">שנה סיסמה</button>
            </form>
            {sucsess && <div className="sucsess-msg">סיסמה עודכנה בהצלחה</div>}
            {err && !sucsess && <div className="err-msg">{err}</div>}
        </div>
    )
}

export default ChangePass