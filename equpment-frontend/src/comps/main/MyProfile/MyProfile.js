import ChangePass from "./ChangePass"
import ChangeProfile from "./ChangeProfile"
import { useEffect, useState } from "react"
import { useToken } from "../../context/Token";
import { useURL } from "../../context/URL";
import './MyProfile.css'

const MyProfile = () => {
    const { storedURL } = useURL();
    const { storedToken } = useToken();
    const [userData, setUserData] = useState({});
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const result = await fetch(`${storedURL}/get_all_branches/`,
                    {
                        method: 'GET',
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

        const fetchUserData = async () => {
            try {
                const result = await fetch(`${storedURL}/get_self/`,
                    {
                        method: 'GET',
                        headers: {
                            "Authorization": `Token ${storedToken}`
                        },
                    });

                const data = await result.json();

                if ('me' in data) {
                    setUserData(data.me);
                    setLoading(false);
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
        fetchUserData();

    }, []);

    if (!loading) {
        return (
            <div className="my-profile">
                <ChangePass />
                <ChangeProfile user={userData} branches={branches} />
            </div>
        )
    } else {
        return (<div>LOADING</div>);
    }

}

export default MyProfile