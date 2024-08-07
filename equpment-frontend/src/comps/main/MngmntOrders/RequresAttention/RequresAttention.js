import { useEffect, useState } from "react"
import { useToken } from "../../../context/Token";
import { useURL } from "../../../context/URL";
import OrdersDisplay from "../../OrdersDisplay/OrdersDisplay";
import Loading from '../../../../Loading/Loading'

const RequresAttention = () => {
    const { storedURL } = useURL();
    const { storedToken } = useToken();
    const [orders, setOrders] = useState([]);
    const [notApprovedToShip, setNotApprovedToShip] = useState([]);
    const [awatingSendindToSupplier, setAwatingSendindToSupplier] = useState([]);
    const [refreshFlag, setRefreshFlag] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`${storedURL}/get_requres_attention_orders/`,
                    {
                        method: 'POST',
                        headers: {
                            "Authorization": `Token ${storedToken}`
                        },
                    });

                const data = await result.json();

                if ('requring_attention_orders' in data) {
                    const branchOrders = data.requring_attention_orders;
                    setOrders(branchOrders);

                    setNotApprovedToShip(branchOrders.filter(order => !order.order.all_order_approved_to_ship));
                    setAwatingSendindToSupplier(branchOrders.filter(order => order.order.all_order_approved_to_ship && !order.order.all_order_recived && !order.order.sent_to_supplier));

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
    }, [refreshFlag]);

    if (orders.length > 0) {
        return (
            <div className="branch-orders">
                <h2 className="branch-orders-header">הזמנות דורשות התייחסות</h2>
                <div className="order-display-cat">
                    <h2>ממתין לאישור פריטים</h2>
                    {notApprovedToShip.length > 0 ? <OrdersDisplay orders={notApprovedToShip} setRefreshFlag={setRefreshFlag} refreshFlag={refreshFlag} />
                        : <div className="no-orders">-אין הזמנות-</div>}
                </div>
                <div className="order-display-cat">
                    <h2>ממתין שליחה לספק</h2>
                    {awatingSendindToSupplier.length > 0 ? <OrdersDisplay orders={awatingSendindToSupplier} setRefreshFlag={setRefreshFlag} refreshFlag={refreshFlag} />
                        : <div className="no-orders">-אין הזמנות-</div>}
                </div>
            </div>
        )
    }
    else {
        return (<div className="branch-orders-loading">
            <h2 className="branch-orders-header">הזמנות דורשות התייחסות</h2>
            <Loading />
        </div>)
    }
}

export default RequresAttention