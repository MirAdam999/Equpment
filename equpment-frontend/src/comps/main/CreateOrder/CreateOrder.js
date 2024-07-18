import { useURL } from "../../context/URL";
import { useToken } from "../../context/Token";
import { useState, useEffect } from "react";
import RunningOrder from "./RunningOrder";
import EqupmentSection from "./EqupmntSection";
import './CreateOrder.css'
import Loading from './../../../Loading/Loading'

const CreateOrder = () => {
    const { storedURL } = useURL();
    const { storedToken } = useToken();
    const [loading, setLoading] = useState(true);
    const [equpmentCats, setEqupmentCats] = useState([]);

    useEffect(() => {
        const fetchEqupmentCats = async () => {
            try {
                const result = await fetch(`${storedURL}/get_equpment_categories/`,
                    {
                        method: 'GET',
                        headers: {
                            "Authorization": `Token ${storedToken}`
                        },
                    });

                const data = await result.json();

                if ('all_cats' in data) {
                    setEqupmentCats(data.all_cats);
                } else if ('err' in data) {
                    console.error('Error:', data.err);
                } else {
                    console.error('Error: No cats on unknown');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchEqupmentCats();
    }, [])

    return (
        <div className="create-order">
            <RunningOrder id='running-order' />
            {!loading && equpmentCats.length > 0 && (
                <div className="equpment-cats">
                    <div className="equpment-cats-column">
                        {equpmentCats.filter((_, index) => index % 3 === 0).map(cat => (
                            <EqupmentSection key={cat.id} cat={cat} />
                        ))}
                    </div>
                    <div className="equpment-cats-column">
                        {equpmentCats.filter((_, index) => index % 3 === 1).map(cat => (
                            <EqupmentSection key={cat.id} cat={cat} />
                        ))}
                    </div>
                    <div className="equpment-cats-column">
                        {equpmentCats.filter((_, index) => index % 3 === 2).map(cat => (
                            <EqupmentSection key={cat.id} cat={cat} />
                        ))}
                    </div>
                </div>
            )}
            {loading && <div className="equpment-cats"><Loading /></div>}
        </div>
    )
}

export default CreateOrder