import { useEffect, useState } from "react"
import { useToken } from "../../context/Token";
import { useURL } from "../../context/URL";
import OrdersDisplay from "../OrdersDisplay/OrdersDisplay";

const ManagmentOrders = () => {
    const { storedURL } = useURL();
    const { storedToken } = useToken();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`${storedURL}/get_all_orders/`,
                    {
                        method: 'GET',
                        headers: {
                            "Authorization": `Token ${storedToken}`
                        },
                    });

                const data = await result.json();

                if ('all_orders' in data) {
                    setOrders(data.all_orders);
                } else if ('err' in data) {
                    console.error('Error:', data.err);
                } else {
                    console.error('Error: No orders on unknown');
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <OrdersDisplay orders={orders} />
        </div>
    )
}

export default ManagmentOrders