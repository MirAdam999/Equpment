import { useURL } from '../../../context/URL';
import { useToken } from '../../../context/Token';
import { useState } from 'react';
import './MangeSuppliers.css'

const AddSupplier = (props) => {
    const { storedURL } = useURL();
    const { storedToken } = useToken();
    const [supplierData, setSupplierData] = useState({
        name: '',
        contact: ''
    });
    const [added, setAdded] = useState(null)

    const addSupplier = async (e) => {
        e.preventDefault()
        try {
            const result = await fetch(`${storedURL}/add_supplier/`,
                {
                    method: 'POST',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: supplierData.name,
                        contact: supplierData.contact,
                    })
                });

            const data = await result.json();

            if ('new_supplier' in data) {
                setAdded(data.new_supplier.name)

            } else if ('err' in data) {
                console.error('Error:', data.err);
            } else {
                console.error('Error: unknown');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleInputChange = (e) => {
        setSupplierData({
            ...supplierData,
            [e.target.id]: e.target.value,
        });
    };

    return (
        <div className='popup'>
            <div className='popup-inner' id='add-supp-popup'>

                <div className='add-supp-top'>
                    <p>יצירת ספק חדש</p>
                    <button className='close-btn' onClick={props.onClose}>X</button>
                </div>

                <div className='add-supp-btm'>
                    <form onSubmit={addSupplier} className="add-supplier-form">

                        <div>
                            <label htmlFor="name">שם ספק</label>
                            <input type="text" name="name" id='name' value={supplierData.name} onChange={handleInputChange} required></input>
                        </div>

                        <div>
                            <label htmlFor="contact">איש קשר</label>
                            <input type="text" name="contact" id='contact' value={supplierData.contact} onChange={handleInputChange} required></input>
                        </div>

                        <button type="submit">צור ספק חדש</button>

                    </form>
                    {added && <p className="sucsess-msg">נוצר בהצלחה {added} ספק </p>}
                </div>

            </div>
        </div>
    )
}

export default AddSupplier