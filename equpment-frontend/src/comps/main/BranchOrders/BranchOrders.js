import { useEffect, useState } from "react"
import { useToken } from "../../context/Token";
import { useURL } from "../../context/URL";
import OrdersDisplay from "../OrdersDisplay/OrdersDisplay";
import { useBranch } from "../../context/BranchData";

const BranchOrders = () => {
    const { storedURL } = useURL();
    const { storedToken } = useToken();
    const { branchID } = useBranch();
    const [orders, setOrders] = useState([]);
    const [notApprovedToShip, setNotApprovedToShip] = useState([]);
    const [approvedToShip, setApprovedToShip] = useState([]);
    const [receivedOrders, setReceivedOrders] = useState([]);
    const [sentToSupplier, setSentToSupplier] = useState([]);

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

                    // Filtering and setting state 
                    setNotApprovedToShip(branchOrders.filter(order => !order.order.all_order_approved_to_ship));
                    setApprovedToShip(branchOrders.filter(order => order.order.all_order_approved_to_ship));
                    setReceivedOrders(branchOrders.filter(order => order.order.all_order_recived));
                    setSentToSupplier(branchOrders.filter(order => order.order.sent_to_supplier));

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
            {notApprovedToShip.length > 0 && <div className="order-display-cat">
                <h2>טרם אושר להספקה</h2>
                <OrdersDisplay orders={notApprovedToShip} />
            </div>}
            {approvedToShip.length > 0 && <div className="order-display-cat">
                <h2>אושר להספקה</h2>
                <OrdersDisplay orders={approvedToShip} />
            </div>}
            {sentToSupplier.length > 0 && <div className="order-display-cat">
                <h2>נשלח לספק</h2>
                <OrdersDisplay orders={sentToSupplier} />
            </div>}
            {receivedOrders.length > 0 && <div className="order-display-cat">
                <h2>סופק לסניף</h2>
                <OrdersDisplay orders={receivedOrders} />
            </div>}
        </div>
    )
}

export default BranchOrders