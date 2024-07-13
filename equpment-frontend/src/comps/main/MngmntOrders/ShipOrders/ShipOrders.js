import { useURL } from "../../../context/URL";
import { useToken } from "../../../context/Token";
import { useEffect, useState } from "react";
import Loading from '../../../../Loading/Loading'
import OrderForSuppliers from "./OrderForSupplier";
import './ShipOrders.css'

const ShipOrders = () => {
    const { storedURL } = useURL()
    const { storedToken } = useToken()
    const [suppliers, setSuppliers] = useState([]);
    const [braches, setBranches] = useState([]);
    const [areas, setAreas] = useState([]);
    const [unshippedOrders, setUnshippedOrders] = useState([]);

    useEffect(() => {
        const fetchSuppliers = async () => {
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
                const result = await fetch(`${storedURL}/get_active_branches/`,
                    {
                        method: 'GET',
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
                const result = await fetch(`${storedURL}/get_all_areas/`,
                    {
                        method: 'GET',
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
            try {
                const result = await fetch(`${storedURL}/get_unshipped/`,
                    {
                        method: 'GET',
                        headers: {
                            "Authorization": `Token ${storedToken}`,
                            "Content-Type": "application/json"
                        },
                    });

                const data = await result.json();

                if ('unshipped_orders' in data) {
                    setUnshippedOrders(data.unshipped_orders);
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
        fetchAreas();
        fetchBranches();
        fetchUnshippedOredrs();
    }, [])

    if (unshippedOrders.length > 0) {
        return (
            <div className="ship-orders">
                <h2>ניפוק הזמנות לספקים</h2>
                <table>
                    <thead>
                        <th>מחוז</th>
                        <th>סניף</th>
                        {suppliers.map((supplier) => (
                            <th>{supplier.name}</th>
                        ))}
                    </thead>
                    <tbody>
                        <tr>
                            <td>הנפק</td>
                            <td>הזמנה לספק</td>
                            {suppliers.map((supplier) => (
                                <td><button>הנפק קבצים</button></td>
                            ))}
                        </tr>
                        {areas.map((area) => (
                            <tr>
                                <td>{area.name}</td>
                                <td> {braches.filter((branch) => branch.area === area.id).map((filteredBranch) => (
                                    <tr>{filteredBranch.name}</tr>
                                ))}
                                </td>
                                {suppliers.map((supplier) => (
                                    <td>
                                        {braches.filter((branch) => branch.area === area.id).map((filteredBranch) => (
                                            <tr>{supplier.name} order for{filteredBranch.name}</tr>
                                        ))}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    else {
        return (
            <div className="ship-orders">
                <h2>ניפוק הזמנות לספקים</h2>
                <Loading />
            </div>
        )
    }

}

export default ShipOrders