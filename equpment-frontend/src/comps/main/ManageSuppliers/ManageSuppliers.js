import { useState } from 'react'


const ManageSuppliers = () => {
    const [searched, setSearched] = useState(false);
    const [found, setFound] = useState(false);
    const [popUpOpen, setPopUpOpen] = useState(false);

    const openAddUser = () => {
        setPopUpOpen(true);
    };

    const closeAddUser = () => {
        setPopUpOpen(false);
    };

    return (
        <div className='manage-users'>

            <div>
                {popUpOpen && <AddUser onClose={closeAddUser} />}
                <button onClick={openAddUser}>יצירת משתמש +</button>
            </div>

        </div>
    )
}

export default ManageSuppliers