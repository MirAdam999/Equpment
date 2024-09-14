import { useEffect, useState } from "react"
import { useToken } from "../../../context/Token";
import { useURL } from "../../../context/URL";
import OrdersDisplay from "../OrdersDisplay/OrdersDisplay";
import { useBranch } from "../../../context/BranchData";
import Loading from '../../../loading/Loading'
import './BranchOrders.css'

const BranchOrders = () => {
    const { storedURL } = useURL();
    const { storedToken } = useToken();
    const { branchID, branchName } = useBranch();
    const [orders, setOrders] = useState([]);
    const [notApprovedToShip, setNotApprovedToShip] = useState([]);
    const [approvedToShip, setApprovedToShip] = useState([]);
    const [receivedOrders, setReceivedOrders] = useState([]);
    const [sentToSupplier, setSentToSupplier] = useState([]);
    const [refreshFlag, setRefreshFlag] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`${storedURL}/view_orders_by_branch/${branchID}/`,
                    {
                        method: 'GET',
                        headers: {
                            "Authorization": `Token ${storedToken}`
                        },
                    });

                const data = await result.json();

                if ('branch_orders' in data) {
                    const branchOrders = data.branch_orders;
                    setOrders(branchOrders);

                    setNotApprovedToShip(branchOrders.filter(order => !order.order.all_order_approved_to_ship));
                    setApprovedToShip(branchOrders.filter(order => order.order.all_order_approved_to_ship && !order.order.all_order_recived && !order.order.all_order_sent_to_supplier));
                    setReceivedOrders(branchOrders.filter(order => order.order.all_order_recived));
                    setSentToSupplier(branchOrders.filter(order => order.order.all_order_sent_to_supplier && !order.order.all_order_recived));

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
                <h2 className="branch-orders-header">הזמנות של סניף {branchName}</h2>
                <div className="order-display-cat">
                    <h2>טרם אושר להספקה</h2>
                    {notApprovedToShip.length > 0 ? <OrdersDisplay orders={notApprovedToShip} setRefreshFlag={setRefreshFlag} refreshFlag={refreshFlag} />
                        : <div className="no-orders">-אין הזמנות-</div>}
                </div>
                <div className="order-display-cat">
                    <h2>אושר להספקה</h2>
                    {approvedToShip.length > 0 ? <OrdersDisplay orders={approvedToShip} setRefreshFlag={setRefreshFlag} refreshFlag={refreshFlag} />
                        : <div className="no-orders">-אין הזמנות-</div>}
                </div>
                <div className="order-display-cat">
                    <h2>נשלח לספק</h2>
                    {sentToSupplier.length > 0 ? <OrdersDisplay orders={sentToSupplier} setRefreshFlag={setRefreshFlag} refreshFlag={refreshFlag} />
                        : <div className="no-orders">-אין הזמנות-</div>}
                </div>
                <div className="order-display-cat">
                    <h2>סופק לסניף</h2>
                    {receivedOrders.length > 0 ? <OrdersDisplay orders={receivedOrders} setRefreshFlag={setRefreshFlag} refreshFlag={refreshFlag} />
                        : <div className="no-orders">-אין הזמנות-</div>}
                </div>
            </div>
        )
    }
    else {
        return (<div className="branch-orders-loading">
            <h2>הזמנות של סניף {branchName}</h2>
            <Loading />
        </div>)
    }
}

export default BranchOrders