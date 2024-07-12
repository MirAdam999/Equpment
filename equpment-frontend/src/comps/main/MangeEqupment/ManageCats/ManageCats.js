import { useURL } from "../../../context/URL";
import { useToken } from "../../../context/Token";
import { useEffect, useState } from "react";
import ApproveDeletionPopUp from "../ApproveDeletionPopUp";
import './MangeCats.css'
import Loading from '../../../../Loading/Loading'
import { BsExclamationCircle } from "react-icons/bs";

const ManageCats = () => {
    const { storedURL } = useURL()
    const { storedToken } = useToken()
    const [cats, setCats] = useState([]);
    const [catNameToAdd, setCatNameToAdd] = useState('');
    const [catNameToUpdate, setCatNameToUpdate] = useState('');
    const [sucsess, setSucsess] = useState(false)
    const [popUpOpen, setPopUpOpen] = useState(null);
    const [rerender, setRerender] = useState(false)

    const openApproveDelete = (cat) => {
        setPopUpOpen(cat);
    };

    const closeApproveDelete = () => {
        setPopUpOpen(null);
        setRerender(true);
    };


    useEffect(() => {
        const fetchCats = async () => {
            try {
                const result = await fetch(`${storedURL}/get_equpment_categories/`,
                    {
                        method: 'GET',
                        headers: {
                            "Authorization": `Token ${storedToken}`
                        },
                    });

                const data = await result.json();

                if ('all_cats' in data) {
                    setCats(data.all_cats);
                    setRerender(false);
                    setSucsess(false);
                } else if ('err' in data) {
                    console.error('Error:', data.err);
                } else {
                    console.error('Error: No data on unknown');
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchCats();
    }, [rerender])

    const createCategory = async (e) => {
        e.preventDefault()
        try {
            const result = await fetch(`${storedURL}/add_equpment_category/`,
                {
                    method: 'POST',
                    headers: {
                        "Authorization": `Token ${storedToken}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: catNameToAdd
                    })
                });

            const data = await result.json();

            if ('new_equpment_category' in data) {
                setRerender(true);
                setCatNameToAdd('')
            } else if ('err' in data) {
                console.error('Error:', data.err);
            } else {
                console.error('Error: unknown');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const updateCategory = async (catId) => {
        try {
            const result = await fetch(`${storedURL}/update_equpment_category/${catId}/`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Token ${storedToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: catNameToUpdate
                })
            });
            const data = await result.json();
            if ('updated' in data) {
                setRerender(true);
                setCatNameToUpdate('');
            } else if ('err' in data) {
                console.error('Error:', data.err);
            } else {
                console.error('Error: Unknown error');
            }
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const deleteCategory = async (catId) => {
        try {
            const result = await fetch(`${storedURL}/delete_equpment_category/${catId}/`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Token ${storedToken}`,
                    "Content-Type": "application/json"
                }
            });
            if (result.status === 204) {
                setSucsess(true);
            } else {
                const data = await result.json();
                if ('err' in data) {
                    console.error('Error:', data.err);
                } else {
                    console.error('Unexpected error:', data);
                }
            }
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleAddInputChange = (e) => {
        setCatNameToAdd(e.target.value);
    };

    const handleInputChange = (e, catId) => {
        const updatedCats = cats.map(cat => {
            if (cat.id === catId) {
                return { ...cat, name: e.target.value };
            }
            return cat;
        });
        setCats(updatedCats);
        setCatNameToUpdate(e.target.value);
    };

    return (
        <div>
            {cats.length === 0 && <div className="manage-cats"><Loading /></div>}
            {cats.length > 0 &&
                <div className="manage-cats">
                    {popUpOpen && <ApproveDeletionPopUp
                        onClose={closeApproveDelete}
                        onDelete={() => deleteCategory(popUpOpen.id)}
                        sucsess={sucsess}
                        question={`מחק קטגוריית ציוד ${popUpOpen.name}?`}
                        action={'מחק'}
                        deletion_msg={`קטגורייה ${popUpOpen.name} נמחקה בהצלחה`} />}

                    <div className="manage-cats-top">
                        <h2>ניהול קטגוריות ציוד</h2>
                    </div>

                    <form onSubmit={createCategory} className="create-cat-form">
                        <label htmlFor="name">יצירת קטגוריה חדשה</label>
                        <div><input value={catNameToAdd} onChange={handleAddInputChange} name='name' type="text" placeholder="הזן שם לקטגויית ציוד"></input>
                            <button type="submit">יצירה</button>
                        </div>
                    </form>

                    <div className='cats'>
                        <span><p>לידעתך: לא ניתן למחוק קטגוריות שיש בהן ציוד פעיל</p><BsExclamationCircle /></span>
                        <table className="cats-table">
                            <thead>
                                <th>מס</th>
                                <th>שם</th>
                                <th>יח' ציוד פעיל בקטגוריה</th>
                                <th>עדכן</th>
                                <th>מחק</th>
                            </thead>
                            <tbody>
                                {cats.map((cat) => (
                                    <tr>
                                        <td>{cat.id}</td>
                                        <td>
                                            <input value={cat.name} onChange={(e) => handleInputChange(e, cat.id)} />
                                        </td>
                                        <td>{cat.objects_in_category}</td>
                                        <td>
                                            <button onClick={() => updateCategory(cat.id)}>עדכון</button>
                                        </td>
                                        <td>
                                            <button disabled={parseInt(cat.objects_in_category) !== 0} id="delete-cat-btn"
                                                onClick={() => openApproveDelete(cat)}>מחק</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>}
        </div>
    )
}

export default ManageCats