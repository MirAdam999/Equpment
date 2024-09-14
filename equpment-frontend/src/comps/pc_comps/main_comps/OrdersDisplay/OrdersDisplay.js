import { useToken } from "../../../context/Token"
import { useState } from "react";
import OrderView from "../OrderView/OrderView";
import './OrdersDisplay.css'

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
                <button className="open-order" onClick={() => openOrder(order)} id={
                    order.order.all_order_recived ? 'done-order' : '' ||
                        (isMasterUser && !order.order.all_order_approved_to_ship) ? 'attention-requred' : ''
                }>
                    <div className="open-order-inner">
                        <div id="order-num"> <p> הזמנה</p><h3> {order.order.id}</h3></div>
                        <div><p>תאריך הזמנה </p><h3 id="order-datetime-preview">{order.order.datetime}</h3></div>
                        <div> <p>מזמין</p><h3>{order.order.users_name}</h3></div>
                        <div> <p>כל הפריטים אושרו </p><p className={order.order.all_order_approved_to_ship ? 'sucsess-msg' : 'err-msg'}>{order.order.all_order_approved_to_ship ? 'כן' : 'לא'}</p></div>
                        <div> <p>הזמנה נשלחה לספק </p><p className={order.order.all_order_sent_to_supplier ? 'sucsess-msg' : 'err-msg'}>{order.order.all_order_sent_to_supplier ? 'כן' : ' לא'}</p></div>
                        <div> <p>כלל ההזמנה סופקה </p><p className={order.order.all_order_recived ? 'sucsess-msg' : 'err-msg'}>{order.order.all_order_recived ? 'כן' : 'לא'}</p></div>
                    </div>
                    {isMasterUser &&
                        <div className="open-order-inner">
                            <div><p>סניף </p><h3>{order.order.branch_name}</h3></div>
                            <div><p>מחוז </p><h3>{order.order.area_name}</h3></div>
                            <div><p>סכום </p><h3 id='order-sum-preview'>ש"ח {order.order.order_total}</h3></div>
                        </div>
                    }
                </button>
            ))}

            {orderIsOpen && <OrderView order={orderIsOpen} onClose={closeOrder} refreshFlag={props.refreshFlag} setRefreshFlag={props.setRefreshFlag} />}

        </div>
    )
}

export default OrdersDisplay