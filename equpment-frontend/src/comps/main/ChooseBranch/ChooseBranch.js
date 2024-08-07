import { useURL } from "../../context/URL";
import { useBranch } from "../../context/BranchData";
import { useToken } from "../../context/Token";
import { useState, useEffect } from "react";
import './ChooseBranch.css'
import Loading from '../../../Loading/Loading'

const ChooseBranch = () => {
    const { storedURL } = useURL();
    const { storedToken } = useToken();
    const [branches, setBranches] = useState([]);
    const { setCurrentBranchName, setCurrentBranchID, setCurrentNextOrder } = useBranch();
    const [selectedBranch, setSelectedBranch] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`${storedURL}/get_active_branches/`,
                    {
                        method: 'POST',
                        headers: {
                            "Authorization": `Token ${storedToken}`
                        },
                    });

                const data = await result.json();

                if ('active_branches' in data) {
                    setBranches(data.active_branches);
                } else if ('err' in data) {
                    console.error('Error:', data.err);
                } else {
                    console.error('Error: No Branches on unknown');
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSelectChange = (event) => {
        const selectedBranchId = event.target.value;
        const branch = branches.find(branch => branch.id === parseInt(selectedBranchId));
        setSelectedBranch(branch);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCurrentBranchName(selectedBranch.name);
        setCurrentBranchID(selectedBranch.id);
        setCurrentNextOrder(selectedBranch.next_order);
    }

    return (
        <div className="choose_branch-page">
            <h1>בחר סניף</h1>
            {branches.length > 0 && <form onSubmit={handleSubmit}>
                <select value={selectedBranch ? selectedBranch.id : ''} onChange={handleSelectChange}>
                    {Array.isArray(branches) && branches.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                            {branch.name}
                        </option>
                    ))}
                </select><br />
                <button type="submit">בחר</button>
            </form>}
            {branches.length === 0 && <Loading />}
        </div>
    )
}

export default ChooseBranch