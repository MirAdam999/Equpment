import { useState, useEffect } from 'react'
import { useURL } from '../../context/URL';
import { useToken } from '../../context/Token';
import AddBranch from './AddBranch';

const ManageBranches = () => {
    const { storedURL } = useURL();
    const { storedToken } = useToken();
    const [popUpOpen, setPopUpOpen] = useState(false);
    const [sucsess, setSucsess] = useState(false);
    const [braches, setBranches] = useState([]);
    const [areas, setAreas] = useState([]);

    const openAddBranch = () => {
        setPopUpOpen(true);
    };

    const closeAddBranch = () => {
        setPopUpOpen(false);
    };

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const result = await fetch(`${storedURL}/get_all_branches/`,
                    {
                        method: 'GET',
                        headers: {
                            "Authorization": `Token ${storedToken}`,
                            "Content-Type": "application/json"
                        },
                    });

                const data = await result.json();

                if ('all_branches' in data) {
                    setBranches(data.all_branches);
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

        fetchAreas();
        fetchBranches();
    }, [popUpOpen, sucsess])

    const updateBranch = async (branch) => {
        try {
            const result = await fetch(`${storedURL}/update_branch/${branch.id}/`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Token ${storedToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(branch),
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

    const handleInputChange = (e, branch, field) => {
        const value = e.target.value;
        setBranches((prevBranches) =>
            prevBranches.map((br) =>
                br.id === branch.id ? { ...br, [field]: value } : br
            )
        );
    };

    return (
        <div className='manage-branches'>
            <div>
                <h2>ניהול סניפים</h2>
                <button onClick={openAddBranch}>יצירת סניף חדש +</button>
                {popUpOpen && <AddBranch onClose={closeAddBranch} areas={areas} />}
            </div>
            <div>
                {braches.length === 0 && <div>LOADING</div>}
                {areas.length > 0 && braches.length > 0 &&
                    <div>
                        <table>
                            <thead>
                                <th>מס סניף</th>
                                <th>אזור</th>
                                <th>שם סניף</th>
                                <th>כתובת ומיקוד</th>
                                <th>הזמנה הבאה</th>
                                <th>עדכן</th>
                            </thead>
                            <tbody>
                                {braches.map((branch) => (
                                    <tr>
                                        <td>{branch.id}</td>
                                        <td>
                                            <select
                                                value={branch.area}
                                                onChange={(e) => handleInputChange(e, branch, 'area')}>
                                                {Array.isArray(areas) && areas.map((area) => (
                                                    <option key={area.id} value={area.id}>
                                                        {area.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td><input type="text" value={branch.name} id="name" onChange={(e) => handleInputChange(e, branch, 'name')}></input></td>
                                        <td><input type="text" value={branch.address} id="address" onChange={(e) => handleInputChange(e, branch, 'address')}></input></td>
                                        <td><input type="date" value={branch.next_order} id="next_order" onChange={(e) => handleInputChange(e, branch, 'next_order')}></input></td>
                                        <td><button onClick={() => updateBranch(branch)}>עדכן</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}
            </div>
        </div>
    )
}

export default ManageBranches