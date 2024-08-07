import { useEffect, useState } from "react"
import { useToken } from "../../context/Token";
import { useURL } from "../../context/URL";
import OrdersDisplay from "../OrdersDisplay/OrdersDisplay";
import './MngmntOrders.css'
import Loading from '../../../Loading/Loading'

const ManagmentOrders = () => {
    const { storedURL } = useURL();
    const { storedToken } = useToken();
    const [orders, setOrders] = useState([]);
    const [areas, setAreas] = useState([]);
    const [branches, setBranches] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useState({
        id: null,
        branch: 'all',
        area: 'all',
        start_date: null,
        end_date: null,
        sent_to_supplier: 'all',
        received: 'all',
        approved_to_ship: 'all',
        supplier: 'all',
    });

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const result = await fetch(`${storedURL}/get_all_areas/`,
                    {
                        method: 'POST',
                        headers: {
                            "Authorization": `Token ${storedToken}`
                        },
                    });

                const data = await result.json();

                if ('all_areas' in data) {
                    setAreas(data.all_areas);
                } else if ('err' in data) {
                    console.error('Error:', data.err);
                } else {
                    console.error('Error: No areas on unknown');
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchBranches = async () => {
            try {
                const result = await fetch(`${storedURL}/get_all_branches/`,
                    {
                        method: 'POST',
                        headers: {
                            "Authorization": `Token ${storedToken}`
                        },
                    });

                const data = await result.json();

                if ('all_branches' in data) {
                    setBranches(data.all_branches);
                } else if ('err' in data) {
                    console.error('Error:', data.err);
                } else {
                    console.error('Error: No branches on unknown');
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchSuppliers = async () => {
            try {
                const result = await fetch(`${storedURL}/get_all_suppliers/`, {
                    method: 'POST',
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

        fetchAreas();
        fetchBranches();
        fetchSuppliers();
        setLoading(false);
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setSearchParams(prevSearchParams => ({
            ...prevSearchParams,
            [id]: value
        }));
    };

    const searchOrders = async (e) => {
        e.preventDefault();
        setOrders([])
        setSearched(true);
        setLoading(true);
        try {
            console.log(searchParams)
            const result = await fetch(`${storedURL}/get_filtered_orders/?id=${searchParams.id ? searchParams.id : 'all'}&branch=${searchParams.branch ? searchParams.branch : 'all'}&area=${searchParams.area ? searchParams.area : 'all'}&start_date=${searchParams.start_date ? searchParams.start_date : ''}&end_date=${searchParams.end_date ? searchParams.end_date : ''}&sent_to_supplier=${searchParams.sent_to_supplier ? searchParams.sent_to_supplier : 'all'}&received=${searchParams.received ? searchParams.received : 'all'}&approved_to_ship=${searchParams.approved_to_ship ? searchParams.approved_to_ship : 'all'}&supplier=${searchParams.supplier ? searchParams.supplier : 'all'}`,
                {
                    method: 'POST',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    }
                });

            const data = await result.json();

            if ('filtered_orders' in data) {
                setOrders(data.filtered_orders);

            } else if ('err' in data) {
                console.error('Error:', data.err);
            } else {
                console.error('Error: unknown');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="manage-orders">
            <h2>ניהול הזמנות</h2>

            <div className='manage-orders-form-wrapper'>
                <h3>הצגת הזמנות ציוד</h3>

                <form onSubmit={searchOrders} className="manage-orders-form">
                    <div className="manage-orders-form-row">
                        <div>
                            <label htmlFor="id">מספר הזמנה</label>
                            <input type="number" id="id" min='1' value={searchParams.id} onChange={handleInputChange}></input>
                        </div>
                        <div>
                            <label htmlFor="area">אזור</label>
                            <select id="area" value={searchParams.area} onChange={handleInputChange}>
                                <option value="all">הצג הכל</option>
                                {Array.isArray(areas) && areas.map((area) => (
                                    <option key={area.id} value={area.id}>
                                        {area.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="branch">סניף</label>
                            <select id="branch" value={searchParams.branch} onChange={handleInputChange}>
                                <option value="all">הצג הכל</option>
                                {Array.isArray(branches) && branches.map((branch) => (
                                    <option key={branch.id} value={branch.id}>
                                        {branch.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div className="manage-orders-form-row">
                        <div>
                            <label htmlFor="start_date">מתאריך</label>
                            <input type="date" id="start_date" value={searchParams.start_date} onChange={handleInputChange}></input>
                        </div>

                        <div>
                            <label htmlFor="end_date">עד תאריך</label>
                            <input type="date" id="end_date" value={searchParams.end_date} onChange={handleInputChange}></input>
                        </div>
                    </div>

                    <div className="manage-orders-form-row">
                        <div>
                            <label htmlFor="approved_to_ship"> אושרה להספקה</label>
                            <select id="approved_to_ship" value={searchParams.approved_to_ship} onChange={handleInputChange}>
                                <option value="all">הצג הכל</option>
                                <option value="1">כלל ההזמנה אושרה</option>
                                <option value="0">לא אושרה</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="sent_to_supplier"> נשלחה לספק</label>
                            <select id="sent_to_supplier" value={searchParams.sent_to_supplier} onChange={handleInputChange}>
                                <option value="all">הצג הכל</option>
                                <option value="1">הכל נשלח</option>
                                <option value="0">לא הכל נשלח</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="received"> התקבלה</label>
                            <select id="received" value={searchParams.received} onChange={handleInputChange}>
                                <option value="all">הצג הכל</option>
                                <option value="1">כלל הפריטים התקבלו</option>
                                <option value="0">לא כל הפריטים התקבלו</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="supplier">ספק</label>
                            <select id="supplier" value={searchParams.supplier} onChange={handleInputChange}>
                                <option value="all">הצג הכל</option>
                                {Array.isArray(suppliers) && suppliers.map((supplier) => (
                                    <option key={supplier.id} value={supplier.id}>
                                        {supplier.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div className="manage-orders-form-row"><button type="submit">הצג</button></div>

                </form>

            </div >
            {searched &&
                <div>
                    {loading && <div><Loading /></div>}
                    {!loading && orders.length > 0 &&
                        <OrdersDisplay orders={orders} />}
                    {!loading && orders.length === 0 &&
                        <p>לא נמצאו הזמנות העונות לדרישות החיפוש</p>}
                </div >}
        </div >
    )
}

export default ManagmentOrders