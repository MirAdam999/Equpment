import { useState, useEffect } from "react";
import { useCart } from "../../context/Cart";
import { useURL } from "../../context/URL";
import { useToken } from "../../context/Token";
import { useBranch } from "../../context/BranchData";
import './RunningOrder.css'

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
            <h2>הזמנה נוכחית</h2>
            <table className="cart-inner">
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
                            <td><button onClick={() => removeProduct(item.id)}>הסר</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => sendOrder()}>שגר הזמנה</button>
            {sucsess && <div>הזמנה נוצרה בהצלחהת מספר הזמנה:{sucsess} ניתן כעת לצפות בהמנה ב"הזמנות"</div>}
        </div>
    )
}

export default RunningOrder