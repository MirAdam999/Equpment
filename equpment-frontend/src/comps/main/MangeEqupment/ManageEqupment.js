
import { useURL } from "../../context/URL";
import { useToken } from "../../context/Token";
import { useEffect, useState } from "react";
import ApproveDeletionPopUp from "./ApproveDeletionPopUp";
import AddEqupment from "./AddEqupment";
import './ManageEqupment.css'

const ManageEqupment = () => {
    //update 
    const { storedURL } = useURL()
    const { storedToken } = useToken()
    const [wantedCategory, setWantedCategory] = useState('all');
    const [wantedSupplier, setWantedSupplier] = useState('all');
    const [activityStatus, setActivityStatus] = useState('all');
    const [equpment, setEqupment] = useState([]);
    const [cats, setCats] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [popUpOpen, setPopUpOpen] = useState(null);
    const [addPopUpOpen, setAddPopUpOpen] = useState(false);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    const openApproveDelete = (item) => {
        setPopUpOpen(item);
    };

    const closeApproveDelete = () => {
        setPopUpOpen(null);
        searchEqupment();
    };

    const openAdd = () => {
        setAddPopUpOpen(true);
    };

    const closeAdd = () => {
        setAddPopUpOpen(false);
        searchEqupment();
    };

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const result = await fetch(`${storedURL}/get_equpment_categories/`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    },
                });
                const data = await result.json();
                if ('all_cats' in data) {
                    setCats(data.all_cats);

                } else if ('err' in data) {
                    console.error('Error:', data.err);
                } else {
                    console.error('Error: Unknown error');
                }
            } catch (error) {
                console.error('Error getting categories:', error);
            }
        }

        const fetchSuppliers = async () => {
            try {
                const result = await fetch(`${storedURL}/get_all_suppliers/`, {
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
                    console.error('Error: Unknown error');
                }
            } catch (error) {
                console.error('Error getting suppliers:', error);
            }
        }

        fetchCats();
        fetchSuppliers();
    }, [])

    const searchEqupment = async (e, preventDefault) => {
        if (preventDefault) {
            e.preventDefault();
        }
        setSearched(true);
        setLoading(true);
        setEqupment([]);
        try {
            const result = await fetch(`${storedURL}/get_filtered_equpment/?equpment_cat=${wantedCategory}&equpment_supplier=${wantedSupplier}&equpment_status=${activityStatus}`,
                {
                    method: 'GET',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    }
                });

            const data = await result.json();

            if ('filtered_equpment' in data) {
                setEqupment(data.filtered_equpment);

            } else if ('err' in data) {
                console.error('Error:', data.err);
            } else {
                console.error('Error: unknown');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    const activateEqupment = async (item) => {
        try {
            const result = await fetch(`${storedURL}/activate_equpment/${item.id}/`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Token ${storedToken}`,
                    "Content-Type": "application/json"
                },
            });
            const data = await result.json();
            if ('equpment_activated' in data) {
                item.status = 'פעיל'
                openApproveDelete(item);

            } else if ('err' in data) {
                console.error('Error:', data.err);
            } else {
                console.error('Error: Unknown error');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const deactivateEqupment = async (item) => {
        try {
            const result = await fetch(`${storedURL}/deactivate_equpment/${item.id}/`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Token ${storedToken}`,
                    "Content-Type": "application/json"
                },
            });
            const data = await result.json();
            if ('equpment_deactivated' in data) {
                item.status = 'לא פעיל'
                openApproveDelete(item);

            } else if ('err' in data) {
                console.error('Error:', data.err);
            } else {
                console.error('Error: Unknown error');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const updateEqupment = async (item) => {
        try {
            const result = await fetch(`${storedURL}/update_item_of_equpment/${item.id}/`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Token ${storedToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item),
            });
            const data = await result.json();
            if ('updated' in data) {
                searchEqupment();
            } else if ('err' in data) {
                console.error('Error:', data.err);
            } else {
                console.error('Error: Unknown error');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleInputChange = (e, item, field) => {
        const value = e.target.value;
        setEqupment((prevEqupment) =>
            prevEqupment.map((eq) =>
                eq.id === item.id ? { ...eq, [field]: value } : eq
            )
        );
    };

    return (
        <div className="manage-equpment">

            <h2>ניהול פריטי ציוד</h2>
            <button onClick={openAdd}>יצירת פריט ציוד +</button>
            {addPopUpOpen && <AddEqupment onClose={closeAdd} cats={cats} suppliers={suppliers} />}

            <div className="searchbar-equpment">

                <form >
                    <div>
                        <label htmlFor="wanted-cat">קטגוריית ציוד</label>
                        <select id="wanted-cat" value={wantedCategory} onChange={(e) => setWantedCategory(e.target.value)}>
                            <option value="all">הצג הכל</option>
                            {Array.isArray(cats) && cats.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="wanted-supplier">ספק</label>
                        <select id="wanted-supplier" value={wantedSupplier} onChange={(e) => setWantedSupplier(e.target.value)}>
                            <option value="all">הצג הכל</option>
                            {Array.isArray(suppliers) && suppliers.map((supplier) => (
                                <option key={supplier.id} value={supplier.id}>
                                    {supplier.name}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="activity-status">קטגוריית ציוד</label>
                        <select id="activity-status" value={activityStatus} onChange={(e) => setActivityStatus(e.target.value)}>
                            <option value="all">הצג הכל</option>
                            <option value="0">ציוד לא פעיל</option>
                            <option value="1">ציוד פעיל</option>
                        </select>

                    </div>

                    <div><button type="submit" onClick={(e) => searchEqupment(e, true)}>הצג</button></div>
                </form>

            </div>

            {searched &&
                <div className="equpment-found">
                    {loading && <div>LOADING</div>}
                    {!loading && equpment.length > 0 &&
                        <div>
                            {popUpOpen && <ApproveDeletionPopUp onClose={closeApproveDelete} deletion_msg={`פריט ציוד '${popUpOpen.name}' הפך ל${popUpOpen.status}`} sucsess={true} />}

                            <table className="equpment-table">
                                <thead>
                                    <th>מס' פריט</th>
                                    <th>שם פריט</th>
                                    <th>יח מידה</th>
                                    <th>מחיר ליחידה בשח</th>
                                    <th>קטגורייה</th>
                                    <th>ספק</th>
                                    <th>דורש איור מנהל להזמנה</th>
                                    <th>פעיל</th>
                                    <th>עדכן פריט</th>
                                    <th>הפך פריט לפעיל/לא פעיל</th>
                                </thead>
                                <tbody>
                                    {equpment.map((item) =>
                                    (<tr>
                                        <td>{item.id}</td>
                                        <td><input type="text" value={item.name} id="name" onChange={(e) => handleInputChange(e, item, 'name')}></input></td>
                                        <td><input type="text" value={item.unit_measure} id="unit_measure" onChange={(e) => handleInputChange(e, item, 'unit_measure')}></input></td>
                                        <td><input type="number" value={item.price} id="price" onChange={(e) => handleInputChange(e, item, 'price')}></input></td>

                                        <td>
                                            <select
                                                value={item.category}
                                                onChange={(e) => handleInputChange(e, item, 'category')}>
                                                {Array.isArray(cats) && cats.map((cat) => (
                                                    <option key={cat.id} value={cat.id}>
                                                        {cat.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                value={item.supplier}
                                                onChange={(e) => handleInputChange(e, item, 'supplier')}>
                                                {Array.isArray(suppliers) && suppliers.map((supplier) => (
                                                    <option key={supplier.id} value={supplier.id}>
                                                        {supplier.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>

                                        <td>
                                            <select value={item.requres_approval} onChange={(e) => handleInputChange(e, item, 'requres_approval')}>
                                                <option value={false}>
                                                    לא נדרש אישור
                                                </option>
                                                <option value={true}>
                                                    נדרש אישור
                                                </option>
                                            </select>
                                        </td>

                                        <td>{item.active === true ? 'פעיל' : 'לא פעיל'}</td>

                                        <td><button onClick={() => updateEqupment(item)}>עדכן</button></td>

                                        <td><button onClick={item.active === true ? () => deactivateEqupment(item) : () => activateEqupment(item)}>
                                            {item.active === true ? 'הפך ללא פעיל' : 'הפך לפעיל'}</button></td>
                                    </tr>))}

                                </tbody>
                            </table>

                        </div>}

                    {!loading && equpment.length === 0 && <div> לא נמצאו פרטי ציוד העונים לדרישות החיפוש</div>}
                </div>}
        </div >
    )
}

export default ManageEqupment