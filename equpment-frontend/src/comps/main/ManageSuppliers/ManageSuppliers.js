import { useState, useEffect } from 'react'
import { useURL } from '../../context/URL';
import { useToken } from '../../context/Token';
import AddSupplier from './AddSupplier';

const ManageSuppliers = () => {
    const { storedURL } = useURL();
    const { storedToken } = useToken();
    const [popUpOpen, setPopUpOpen] = useState(false);
    const [sucsess, setSucsess] = useState(false);
    const [suppliers, setSuppliers] = useState([]);

    const openAddSupplier = () => {
        setPopUpOpen(true);
    };

    const closeAddSupplier = () => {
        setPopUpOpen(false);
    };

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const result = await fetch(`${storedURL}/get_all_suppliers/`,
                    {
                        method: 'GET',
                        headers: {
                            "Authorization": `Token ${storedToken}`,
                            "Content-Type": "application/json"
                        },
                    });

                const data = await result.json();

                if ('all_suppliers' in data) {
                    setSuppliers(data.all_suppliers);
                } else if ('err' in data) {
                    console.error('Error:', data.err);
                } else {
                    console.error('Error: unknown');
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchSuppliers();
    }, [popUpOpen, sucsess])

    const updateSupplier = async (supplier) => {
        try {
            const result = await fetch(`${storedURL}/update_supplier/${supplier.id}/`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Token ${storedToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(supplier),
            });
            const data = await result.json();
            if ('updated' in data) {
                setSucsess(true)
            } else if ('err' in data) {
                console.error('Error:', data.err);
            } else {
                console.error('Error: Unknown error');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleInputChange = (e, supplier, field) => {
        const value = e.target.value;
        setSuppliers((prevSuppliers) =>
            prevSuppliers.map((sp) =>
                sp.id === supplier.id ? { ...sp, [field]: value } : sp
            )
        );
    };

    return (
        <div className='manage-suppliers'>

            <div>
                <h2>ניהול ספקים</h2>
                {popUpOpen && <AddSupplier onClose={closeAddSupplier} />}
                <button onClick={openAddSupplier}>יצירת ספק חדש +</button>
            </div>
            {suppliers.length === 0 && <div>LOADING</div>}
            {suppliers.length > 0 &&
                <div>
                    <table>
                        <thead>
                            <th>מס ספק</th>
                            <th>שם ספק</th>
                            <th>איש קשר</th>
                            <th>מספר פרטי הציוד מסופקים ע"י הספק</th>
                            <th>עדכן</th>
                        </thead>
                        <tbody>
                            {suppliers.map((supplier) => (
                                <tr>
                                    <td>{supplier.id}</td>
                                    <td><input type="text" value={supplier.name} id="name" onChange={(e) => handleInputChange(e, supplier, 'name')}></input></td>
                                    <td><input type="text" value={supplier.contact} id="contact" onChange={(e) => handleInputChange(e, supplier, 'contact')}></input></td>
                                    <td>{supplier.items_supplied}</td>
                                    <td><button onClick={() => updateSupplier(supplier)}>עדכן</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>}

        </div>
    )
}

export default ManageSuppliers