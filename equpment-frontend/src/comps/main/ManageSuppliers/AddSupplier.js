import { useURL } from '../../context/URL';
import { useToken } from '../../context/Token';
import { useState } from 'react';

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
        <div>
            <div>

                <div>
                    <h2></h2>
                    <button onClick={props.onClose}>X</button>
                </div>

                <div>
                    <form onSubmit={addSupplier} className="add-supplier-form">

                        <div>
                            <label htmlFor="name">שם ספק</label>
                            <input type="text" name="name" id='name' value={supplierData.name} onChange={handleInputChange} required></input>
                        </div>

                        <div>
                            <label htmlFor="contact">איש קשר</label>
                            <input type="text" name="contact" id='contact' value={supplierData.contact} onChange={handleInputChange} required></input>
                        </div>

                        <div><button type="submit">צור ספק חדש</button></div>

                    </form>
                    {added && <div className="sucsess-msg">ספק '{added}' נוצר בהצלחה</div>}
                </div>

            </div>
        </div>
    )
}

export default AddSupplier