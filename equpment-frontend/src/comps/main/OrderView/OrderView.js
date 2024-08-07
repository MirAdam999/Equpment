import { useToken } from "../../context/Token"
import { useURL } from "../../context/URL"
import { useState } from "react"
import './OrderView.css'

const OrderView = (props) => {
    const order = props.order.order
    const [details, setDetails] = useState(props.order.details);
    const refreshFlag = props.refreshFlag
    const setRefreshFlag = props.setRefreshFlag
    const [localFlag, setLocalFlag] = useState(false)
    const { isMasterUser, storedToken } = useToken();
    const { storedURL } = useURL();

    const approveDelivery = async (detail_id) => {
        try {
            const result = await fetch(`${storedURL}/approve_delivery/${detail_id}/`,
                {
                    method: 'PUT',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    },
                });

            const data = await result.json();

            if ('approved_delivery' in data) {
                fetchOrder();
                setLocalFlag(true);
            } else if ('err' in data) {
                console.error('Error:', data.err);
            } else {
                console.error('Error: unknown');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const approveItem = async (detail_id) => {
        try {
            const result = await fetch(`${storedURL}/approve_order_detail/${detail_id}/`,
                {
                    method: 'PUT',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    },
                });

            const data = await result.json();

            if ('approved_to_ship' in data) {
                fetchOrder();
                setLocalFlag(true);
            } else if ('err' in data) {
                console.error('Error:', data.err);
            } else {
                console.error('Error: unknown');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const removeItem = async (detail_id) => {
        try {
            const result = await fetch(`${storedURL}/remove_order_detail/${detail_id}/`,
                {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    },
                });

            const data = await result.json();

            if ('detail_deleted' in data) {
                fetchOrder();
                setLocalFlag(true);
            } else if ('err' in data) {
                console.error('Error:', data.err);
            } else {
                console.error('Error: unknown');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    const fetchOrder = async () => {
        try {
            const result = await fetch(`${storedURL}/view_order_by_id/${order.id}/`,
                {
                    method: 'POST',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    },
                });

            const data = await result.json();

            if ('order_and_details' in data) {
                setDetails(data.order_and_details.details)
            } else if ('err' in data) {
                console.error('Error:', data.err);
            } else {
                console.error('Error: unknown');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const closeWindow = () => {
        props.onClose();
        if (localFlag) {
            setRefreshFlag(!refreshFlag)
        }
    }

    return (
        <div id="order-view-wrapper" className="popup">

            <div id="order-view" className="popup-inner">
                <div className="order-view-head" >
                    <div>
                        <button className='close-btn' onClick={closeWindow}>X</button>
                        <p id='order-view-norder-num'>הזמנה מספר <span>{order.id}</span></p>
                    </div>
                    <div>
                        <p>תאריך הזמנה: <span>{order.datetime}</span></p>
                        <p>מזמין: <span>{order.users_name}</span></p>
                    </div>
                </div>
                <table id="order-view-table">
                    <thead>
                        <tr>
                            <th>מקט</th>
                            <th>פריט</th>
                            <th>כמות</th>
                            <th>יח מידה</th>
                            <th>מחיר ליח</th>
                            <th>מחיר סה"כ</th>
                            <th>ספק</th>
                            <th>אושר</th>
                            <th>יצא לספק</th>
                            <th>התקבל</th>
                            {!isMasterUser && !order.all_order_recived && <th>אשר הספקה</th>}
                            {isMasterUser && !order.all_order_approved_to_ship && <th>אשר פריט</th>}
                            {isMasterUser && !order.all_order_approved_to_ship && <th>דחה פריט</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {details.map(detail => (
                            <tr>
                                <td>{detail.item}</td>
                                <th>{detail.detail_name}</th>
                                <td>{detail.quantity}</td>
                                <td>{detail.detail_unit_measure}</td>
                                <td>{detail.detail_price} שח</td>
                                <td>{detail.detail_price_for_order} שח</td>
                                <td>{detail.detail_supplier}</td>
                                <td className={detail.approved_to_ship ? 'sucsess-msg' : ' err-msg'}>{detail.approved_to_ship ? 'אושר להספקה' : 'טרם אושר'}</td>
                                <td className={detail.sent_to_supplier ? 'sucsess-msg' : ' err-msg'}>{detail.sent_to_supplier ? 'נשלח לספק' : 'לא נשלח לספק'}</td>
                                <td className={detail.recived ? 'sucsess-msg' : ' err-msg'}>{detail.recived ? 'התקבל' : 'לא התקבל'}</td>
                                {!isMasterUser && !order.all_order_recived && <td id='approve-delivery'>
                                    {!detail.recived &&
                                        <button id='approve-delivery-btn' onClick={() => approveDelivery(detail.id)}>אשר הגעה לסניף</button>}
                                </td>}
                                {isMasterUser && !order.all_order_approved_to_ship && <td id='approve-delivery'>
                                    {!detail.approved_to_ship &&
                                        <button onClick={() => approveItem(detail.id)} id='approve-delivery-btn' >אשר פריט</button>}
                                </td>}
                                {isMasterUser && !order.all_order_approved_to_ship && <td id='disallow-delivery'>
                                    {!detail.approved_to_ship &&
                                        <button onClick={() => removeItem(detail.id)} id='disallow-delivery-btn'>הסר מהזמנה</button>}
                                </td>}
                            </tr>

                        ))}
                    </tbody>
                </table>
                <p id="total-price">סה"כ מחיר הזמנה: <span>{order.order_total}</span> שח</p>

            </div>

        </div>
    )

}

export default OrderView