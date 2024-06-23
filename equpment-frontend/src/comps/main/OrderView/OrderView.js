import { useToken } from "../../context/Token"

const OrderView = (props) => {
    const order = props.order.order
    const details = props.order.details
    const { isMasterUser } = useToken();

    return (
        <div className="order-view-wrapper">

            <div className="order-view">
                <button onClick={props.onClose}>X</button>
                <div>
                    <p>מספר הזמנה: {order.id}</p>
                    <p>תאריך הזמנה: {order.datetime}</p>
                    <p>מזמין:{order.users_name}</p>
                    <p>הזמנה נשלחה לספק: {order.sent_to_supplier ? 'כן' : ' לא'}</p>
                </div>
                <table>
                    <thead>
                        <th>id</th>
                        <th>מקט</th>
                        <th>פריט</th>
                        <th>כמות</th>
                        <th>יח מידה</th>
                        <th>מחיר ליח</th>
                        <th>מחיר סהכ</th>
                        <th>ספק</th>
                        <th>אושר</th>
                        <th>התקבל</th>
                    </thead>
                    <tbody>
                        {details.map(detail => (
                            <tr>
                                <td>{detail.id}</td>
                                <td>{detail.item}</td>
                                <td>{detail.detail_name}</td>
                                <td>{detail.quantity}</td>
                                <td>{detail.detail_unit_measure}</td>
                                <td>{detail.detail_price} שח</td>
                                <th>{detail.detail_price_for_order} שח</th>
                                <td>{detail.detail_supplier}</td>
                                <td>{detail.approved_to_ship}</td>
                                <td>{detail.recived}</td>
                            </tr>

                        ))}
                    </tbody>
                </table>
                <p>סה"כ מחיר הזמנה: {order.order_total} שח</p>
            </div>

        </div>
    )

}

export default OrderView