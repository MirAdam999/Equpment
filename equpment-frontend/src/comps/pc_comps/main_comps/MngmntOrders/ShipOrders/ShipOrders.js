import { useURL } from "../../../../context/URL";
import { useToken } from "../../../../context/Token";
import { useEffect, useState } from "react";
import React from 'react';
import Loading from '../../../../loading/Loading'
import OrderForSuppliers from "./OrderForSupplier";
import './ShipOrders.css'

const ShipOrders = () => {
    const { storedURL } = useURL()
    const { storedToken } = useToken()
    const [suppliers, setSuppliers] = useState([]);
    const [braches, setBranches] = useState([]);
    const [areas, setAreas] = useState([]);
    const [unshippedOrders, setUnshippedOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshFlag, setRefreshFlag] = useState(false);
    const [popUp, setPopUp] = useState({});

    const openPopUp = (data) => {
        setPopUp(data)
    }

    const closePopUp = () => {
        setPopUp({});
    }

    const sendPDFRequest = async () => {
        try {
            const result = await fetch(`${storedURL}/get_pdf_for_supplier/`, {
                method: 'POST',
                headers: {
                    "Authorization": `Token ${storedToken}`,
                    "Content-Type": "application/json"
                },
                body: {
                    "details": [103, 104]
                }
            });
            console.log(result)
        } catch (error) {
            console.error('Error getting suppliers:', error);
        }
    }

    useEffect(() => {
        const fetchSuppliers = async () => {
            setLoading(true);
            try {
                const result = await fetch(`${storedURL}/get_active_suppliers/`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    },
                });
                const data = await result.json();
                if ('active_suppliers' in data) {
                    setSuppliers(data.active_suppliers);
                } else if ('err' in data) {
                    console.error('Error:', data.err);
                } else {
                    console.error('Error: Unknown error');
                }
            } catch (error) {
                console.error('Error getting suppliers:', error);
            }
        }

        const fetchBranches = async () => {
            try {
                const result = await fetch(`${storedURL}/get_active_branches/`, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    },
                });
                const data = await result.json();
                if ('active_branches' in data) {
                    setBranches(data.active_branches);
                } else if ('err' in data) {
                    console.error('Error:', data.err);
                } else {
                    console.error('Error: unknown');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        const fetchAreas = async () => {
            try {
                const result = await fetch(`${storedURL}/get_all_areas/`, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    },
                });
                const data = await result.json();
                if ('all_areas' in data) {
                    setAreas(data.all_areas);
                } else if ('err' in data) {
                    console.error('Error:', data.err);
                } else {
                    console.error('Error: unknown');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        const fetchUnshippedOredrs = async () => {
            setLoading(true);
            try {
                const result = await fetch(`${storedURL}/get_unshipped/`, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    },
                });
                const data = await result.json();
                if ('unshipped_orders_by_supplier_then_branch' in data) {
                    setUnshippedOrders(data.unshipped_orders_by_supplier_then_branch);
                } else if ('err' in data) {
                    console.error('Error:', data.err);
                } else {
                    console.error('Error: unknown');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchSuppliers();
        fetchAreas();
        fetchBranches();
        fetchUnshippedOredrs();

    }, [refreshFlag]);


    if (!loading) {
        return (
            <div className="ship-orders">
                <button onClick={sendPDFRequest}>CLICK</button>
                <h2>ניפוק הזמנות לספקים</h2>
                {Object.keys(popUp).length > 0 && <OrderForSuppliers
                    order={popUp.orders}
                    supplier={popUp.supplier}
                    branch={popUp.branch}
                    area={popUp.area}
                    onClose={closePopUp}
                    setRefreshFlag={setRefreshFlag}
                    refreshFlag={refreshFlag} />}
                <table>
                    <thead>
                        <tr>
                            <th>מחוז</th>
                            <th>סניף</th>
                            {suppliers.map((supplier) => (
                                <th key={supplier.id}>{supplier.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {areas.map((area) => {
                            const areaBranches = braches.filter((branch) => branch.area === area.id);
                            return (
                                <React.Fragment key={area.id}>
                                    <tr>
                                        <td className="area-name" rowSpan={areaBranches.length + 1}>{area.name}</td>
                                    </tr>
                                    {areaBranches.map((branch) => (
                                        <tr key={branch.id}>
                                            <td className="branch-name">{branch.name}</td>
                                            {suppliers.map((supplier) => {
                                                const supplierOrders = unshippedOrders[supplier.id] || {};
                                                const orders = supplierOrders[branch.id] || [];

                                                return (
                                                    <td key={`${supplier.id}-${branch.id}`}>
                                                        {orders && orders.length > 0 ? (
                                                            <button className="open-order-for-supp"
                                                                onClick={() => openPopUp({ orders, supplier, branch, area })}>
                                                                צפייה בהזמנה
                                                            </button>
                                                        ) : (
                                                            <p className="no-orders">-אין הזמנות-</p>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

    else if (loading) {
        return (
            <div className="ship-orders">
                <h2>ניפוק הזמנות לספקים</h2>
                <Loading />
            </div>
        )
    }

}

export default ShipOrders