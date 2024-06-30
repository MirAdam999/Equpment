import { useCart } from "../../context/Cart"
import { useState } from "react"
import './Equpment.css'

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
        <div>
            <table className="item-of-equpment">
                <thead>
                    <th>פריט</th>
                    <th>יחידת מידה</th>
                    <th>כמות</th>
                    <th>הוסף להזמנה</th>
                </thead>
                <tbody>
                    {equpment.map(item => (
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
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Equpment