import { useURL } from '../../../context/URL';
import { useToken } from '../../../context/Token';
import { useState } from 'react';

const AddBranch = (props) => {
    const areas = props.areas
    const { storedURL } = useURL();
    const { storedToken } = useToken();
    const [branchData, setBranchData] = useState({
        name: '',
        area: '',
        address: '',
    });
    const [added, setAdded] = useState(null)

    const addBranch = async (e) => {
        e.preventDefault();
        try {
            const result = await fetch(`${storedURL}/add_branch/`,
                {
                    method: 'POST',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: branchData.name,
                        area: branchData.area,
                        next_order: null,
                        address: branchData.address
                    })
                });

            const data = await result.json();

            if ('new_branch' in data) {
                setAdded(data.new_branch.name)

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
        setBranchData({
            ...branchData,
            [e.target.id]: e.target.value,
        });
    };

    return (
        <div className='popup'>
            <div className='popup-inner' id='add-branches-popup'>

                <div className='add-branches-top'>
                    <p>יצירת סניף חדש</p>
                    <button className='close-btn' onClick={props.onClose}>X</button>
                </div>

                <div className='add-branches-btm'>
                    <form onSubmit={addBranch} className="add-branches-form">

                        <div>
                            <label htmlFor="name">שם סניף</label>
                            <input type="text" name="name" id='name' value={branchData.name} onChange={handleInputChange} required></input>
                        </div>

                        <div>
                            <label htmlFor="address">כתובת ומיקוד</label>
                            <input type="text" name="address" id='address' value={branchData.address} onChange={handleInputChange} required></input>
                        </div>
                        <div>
                            <label htmlFor="area">אזור</label>
                            <select
                                name="area" id='area'
                                onChange={handleInputChange}>
                                {Array.isArray(areas) && areas.map((area) => (
                                    <option key={area.id} value={area.id}>
                                        {area.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button type="submit">צור סניף חדש</button>

                    </form>
                    {added && <p className="sucsess-msg">נוצר בהצלחה {added} סניף </p>}
                </div>

            </div>
        </div>
    )
}

export default AddBranch