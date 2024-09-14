import { useURL } from "../../../context/URL";
import { useToken } from "../../../context/Token";
import { useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";

const AddEqupment = (props) => {
    const cats = props.cats
    const suppliers = props.suppliers
    const { storedURL } = useURL()
    const { storedToken } = useToken()
    const [equpmentData, setEqupmentData] = useState({
        name: '',
        unit_measure: '',
        price: ''
    });
    const [selectedCat, setSelectedCat] = useState(null);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [needsApproval, setNeedsApproval] = useState(false);
    const [added, setAdded] = useState(null)

    const addEqupment = async (e) => {
        e.preventDefault()
        try {
            const result = await fetch(`${storedURL}/add_item_of_equpment/`,
                {
                    method: 'POST',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: equpmentData.name,
                        unit_measure: equpmentData.unit_measure,
                        category: selectedCat,
                        supplier: selectedSupplier,
                        price: equpmentData.price,
                        requres_approval: needsApproval
                    })
                });

            const data = await result.json();

            if ('new_item_of_equpment' in data) {
                setAdded(data.new_item_of_equpment.name)
            } else if ('err' in data) {
                console.error('Error:', data.err);
            } else {
                console.error('Error: unknown');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleCatChange = (event) => {
        setSelectedCat(event.target.value);
    };

    const handleSupplierChange = (event) => {
        setSelectedSupplier(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        setNeedsApproval(event.target.checked);
    };

    const handleInputChange = (e) => {
        setEqupmentData({
            ...equpmentData,
            [e.target.id]: e.target.value,
        });
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <div className="add-item-top">
                    <button onClick={props.onClose} className="close-btn">X</button>
                    <h2>יצירת פריט ציוד חדש</h2>
                </div>
                <div className="add-item-btm">
                    <form onSubmit={addEqupment}>

                        <div>
                            <label htmlFor="name">שם הפריט</label>
                            <input type="text" name="name" id='name' value={equpmentData.name} onChange={handleInputChange} required></input>
                        </div>

                        <div>
                            <label htmlFor="unit_measure">יחידת מידה</label>
                            <input type="text" name="unit_measure" id='unit_measure' value={equpmentData.unit_measure} onChange={handleInputChange} required></input>
                        </div>

                        <div>
                            <label htmlFor="choosen_category">קטגוריית ציוד</label>
                            <select value={selectedCat} onChange={handleCatChange} name="choosen_category">
                                <option value="">-בחר קטגוריית ציוד-</option>
                                {Array.isArray(cats) && cats.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="choosen_supplier">ספק</label>
                            <select value={selectedSupplier} onChange={handleSupplierChange} name="choosen_supplier">
                                <option value="">-בחר ספק-</option>
                                {Array.isArray(suppliers) && suppliers.map((supplier) => (
                                    <option key={supplier.id} value={supplier.id}>
                                        {supplier.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="price">מחיר יחידה בש"ח</label>
                            <input type="number" name="price" id='price' value={equpmentData.price} onChange={handleInputChange} required></input>
                        </div>

                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={needsApproval}
                                    onChange={handleCheckboxChange}
                                />
                                הזמנת פריט זה דורשת אישור מנהל
                            </label>
                        </div>
                        <p id='warning-msg'> <BsExclamationCircle id="warning-icon" /> פרטי ציוד שדורשים אישור מנהל, < br />יצתרכו אישור טרם תוכל לשלוח לספק את ההזמנה</p>
                        <button type="submit">צור פריט חדש</button>

                    </form>

                    {added && <p className="sucsess-msg">פריט ציוד '{added}' נוצר בהצלחה</p>}
                </div>
            </div>
        </div>
    )
}

export default AddEqupment