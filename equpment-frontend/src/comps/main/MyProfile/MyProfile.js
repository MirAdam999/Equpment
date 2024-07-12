import ChangePass from "./ChangePass"
import ChangeProfile from "./ChangeProfile"
import { useEffect, useState } from "react"
import { useToken } from "../../context/Token";
import { useURL } from "../../context/URL";
import './MyProfile.css'
import Loading from '../../../Loading/Loading';

const MyProfile = () => {
    const { storedURL } = useURL();
    const { storedToken } = useToken();
    const [userData, setUserData] = useState({});
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const result = await fetch(`${storedURL}/get_active_branches/`,
                    {
                        method: 'GET',
                        headers: {
                            "Authorization": `Token ${storedToken}`
                        },
                    });

                const data = await result.json();

                if ('active_branches' in data) {
                    setBranches(data.active_branches);
                    console.log(data.active_branches)
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
        return (
            <div className="loading"> <Loading /></div>);
    }

}

export default MyProfile