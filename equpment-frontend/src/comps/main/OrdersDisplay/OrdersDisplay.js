import { useToken } from "../../context/Token"
import { useState } from "react";
import OrderView from "../OrderView/OrderView";

const OrdersDisplay = (props) => {

    const orders = props.orders
    const { isMasterUser } = useToken();
    const [orderIsOpen, setOrderIsOpen] = useState(false);

    function openOrder(order) {
        setOrderIsOpen(order)
    };

    function closeOrder() {
        setOrderIsOpen(false)
    };

    return (
        <div className="orders-display">
            {orders.map(order => (
                <button className="open-order" onClick={() => openOrder(order)}>
                    <div>
                        <p>מספר הזמנה: {order.order.id}</p>
                        <p>תאריך הזמנה: {order.order.datetime}</p>
                        <p>מזמין:{order.order.users_name}</p>
                        <p>כל הפריטים אושרו: {order.order.all_order_approved_to_ship ? 'כן' : 'לא'}</p>
                        <p>הזמנה נשלחה לספק: {order.order.sent_to_supplier ? 'כן' : ' לא'}</p>
                        <p>כלל ההזמנה סופקה: {order.order.all_order_recived ? 'כן' : 'לא'}</p>
                    </div>
                    {isMasterUser &&
                        <div>
                            <p>סניף: {order.order.branch_name}</p>
                            <p>מחוז: {order.order.area_name}</p>
                        </div>
                    }
                </button>
            ))}

            {orderIsOpen && <OrderView order={orderIsOpen} onClose={closeOrder} />}

        </div>
    )
}

export default OrdersDisplay