import { useCart } from "../../context/Cart"
import { useState } from "react"
import './Equpment.css'
import MiniLoader from "./MiniLoader/MiniLoader"

const Equpment = (props) => {
    const equpment = props.equpment
    const { addProduct } = useCart();
    const [quantities, setQuantities] = useState({});

    const handleQuantityChange = (id, quantity) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: quantity
        }));
    };

    const handleAddProduct = (item) => {
        const quantity = quantities[item.id] || 1;
        addProduct(item, parseInt(quantity));
    };

    return (
        <div className="item-of-equpment-wrapper">
            <table className="item-of-equpment">
                <thead>
                    <tr>
                        <th>פריט</th>
                        <th>יחידת מידה</th>
                        <th>כמות</th>
                        <th>להזמנה</th>
                    </tr>
                </thead>
                {equpment && equpment.length > 0 && equpment[0] !== 'none' &&
                    <tbody>{
                        equpment.map(item => (
                            <tr key={item.id} className="item-of-equpment">
                                <td>{item.name}</td>
                                <td>{item.unit_measure}</td>
                                <td>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={quantities[item.id] || ""}
                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                    />
                                </td>
                                <td><button onClick={() => handleAddProduct(item)} >הוסף</button></td>
                            </tr>
                        ))
                    }
                    </tbody>}
                {!equpment || equpment.length === 0 && <tbody ><tr><td className="td-loader" colSpan={4}><MiniLoader /></td></tr></tbody>}
                {equpment && equpment[0] === 'none' && <tbody><tr><td className="td-loader" colSpan={4}>-אין ציוד בקטגוריה-</td></tr></tbody>}
            </table>
        </div >
    )
}

export default Equpment