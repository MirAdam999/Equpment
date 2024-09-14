import { useState, useEffect } from "react";
import { useCart } from "../../../context/Cart";
import { useURL } from "../../../context/URL";
import { useToken } from "../../../context/Token";
import { useBranch } from "../../../context/BranchData";
import './RunningOrder.css'
import { IoCartOutline } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

const RunningOrder = () => {
    const { storedURL } = useURL()
    const { storedToken } = useToken()
    const { branchID } = useBranch()
    const { cart, removeProduct, clearCart } = useCart()
    const [sucsess, setSucsess] = useState(null)

    useEffect(() => { }, [cart])

    const sendOrder = async () => {

        const details = cart.reduce((acc, item, index) => {
            acc[index + 1] = {
                item: item.id,
                quantity: item.quantity
            };
            return acc;
        }, {});

        try {
            const result = await fetch(`${storedURL}/add_order/`,
                {
                    method: 'POST',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        order: { branch: branchID },
                        details: details
                    })
                });

            const data = await result.json();

            if ('new_order' in data) {
                setSucsess(data.new_order.order.id);
                clearCart();
            } else if ('err' in data) {
                console.error('Error:', data.err);
            } else {
                console.error('Error: unknown');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div className="cart">
            <div className="cart-top">
                <h2>הזמנה נוכחית <IoCartOutline /></h2>
                {cart.length > 0 && <button id='clear-order-btn' onClick={clearCart}>נקה כלל ההזמנה <FaTrash /></button>}
            </div>
            <div className="cart-inner">
                <table className="cart-inner-table">
                    <thead>
                        <th>פריט</th>
                        <th>כמות</th>
                        <th>יח מידה</th>
                        <th>הסרה</th>
                    </thead>
                    <tbody>
                        {cart.map(item => (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.unit_measure}</td>
                                <td id='clear-item'><button onClick={() => removeProduct(item.id)}>X</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {cart.length === 0 && <p id="empty-cart">-אין פריטים בהזמנה-</p>}
            </div>
            <button id="send-order-btn" onClick={() => sendOrder()} disabled={cart.length === 0}>שגר הזמנה <IoSend /></button>
            {sucsess && <div className="popup">
                <div className="popup-inner" id="order-created">
                    <button className="close-btn" onClick={() => setSucsess(false)}>X</button>
                    <p className="sucsess-msg">הזמנה נוצרה בהצלחה</p>
                    <p className="sucsess-msg">מספר הזמנה: {sucsess}</p>
                    <p className="sucsess-msg">ניתן כעת לצפות ולעקוב אחר ההזמנה בתגיית הזמנות</p>
                </div>
            </div>}
        </div>
    )
}

export default RunningOrder